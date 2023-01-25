import "./Navbar.component.scss";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthComponent from "../../auth/Auth.component";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import { useDispatch, useSelector } from "react-redux";
import { getAuthentication } from "../../../core/redux/reducers/Authentication/AuthenticationReducer.core";
import { userProfile } from "../../../core/services/userProfile/FreelancerProfile/FreelancerProfile.core";
import { getUserLoginData } from "../../../core/redux/reducers/UserLoginData/UserLoginData.core";
import { authAction } from "../../../core/services/AuthServices/AuthActions/AuthActions.core";

import { Link } from "react-router-dom";
import { getUserDataReducer } from "../../../core/redux/reducers/UserDataReducer/UserDataReducer.core";
import MopileUserSettings from "../../auth/MopileUserSettings";
import MopileNavigate from "./MopileNavigate";
import LoginComponent from "../../auth/Login/Login.component";
import { Dialog } from "@mui/material";
import { LoginServices } from "../../../core/services/AuthServices/Method_LoginData/Method_LoginData.core";
import { getMessages } from "../../../core/redux/reducers/Messages/Messages.core";
import { getRoleUser } from "../../../core/redux/reducers/Role/RoleReducer.core";
import { Form } from "react-bootstrap";

const Navbar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [loginCheck, setLoginCheck] = useState(false);

  const [user, activeUserId, userUpdateAvatar] = useSelector((state) => [
    state.authentication,
    state.userData.id,
    state.userFullData.state,
  ]);

  const [stateLoginData, messages] = useSelector((state) => [
    state.login,
    state.messages,
  ]);

  const [userID, setuserID] = useState("");

  const dispatch = useDispatch();
  const refe = useRef();
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const pages = [
    {
      name: "الرئيسية",
      route: `/`,
    },
    // {
    //   name: "شات",
    //   route: `/chat`,
    // },
    {
      name: "الاعلانات",
      route: `advertising/page=${1}`,
    },
    {
      name: "الطلبات",
      route: `orders/page=${1}`,
    },
    {
      name: "المشتغلين",
      route: `employed/page=${1}`,
    },
  ];

  const settings = [
    {
      id: 1,
      name: "إدارة حسابي",
      routeTo: `account_management/my-edit-account/${activeUserId}`,
    },
    {
      id: 2,
      name: "تسجيل خروج",
      routeTo: "/",
    },
  ];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event?.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (e) => {
    if (e.target.innerHTML === "تسجيل خروج") {
      const FBToken = localStorage.getItem("FCM");
      authAction._POST_Logout({ device_token: FBToken });
      dispatch(getAuthentication(false));
      // dispatch(getRoleUser(false))
      setAnchorElNav(null);
      setAnchorElUser(null);
    } else {
      setAnchorElNav(null);
      setAnchorElUser(null);
    }
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  //  Get User Login Data
  const userLoginData = useMemo(() => {
    if (user.loggedIn) {
      return userProfile
        ._GET_ProfileByToken(localStorage.getItem("userTK"))
        .then((res) => {
          dispatch(
            getUserLoginData({
              id: res?.data?.data?.id,
              category: res.data.data?.category,
              permission: res?.data?.data.role?.permission,
              avatar: res?.data?.data?.avatar,
            })
          );
          setuserID(res.data.data);
          dispatch(getUserDataReducer(res.data.data));
        });
    }
  }, [dispatch, user.loggedIn]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!userID) {
        return userLoginData;
      }
    }, 1200);
    return () => clearTimeout(timeout);
  }, [userID, userLoginData]);

  const formSubmit = async (e) => {
    e.preventDefault();
    setLoginCheck(true);
    const dataWithToken = {
      ...stateLoginData,
    };

    LoginServices._POST_LoginData(dataWithToken)
      .then((res) => {
        if (res?.data?.status === 1) {
          setLoginCheck(false);
          dispatch(
            getMessages({
              messages: res?.data?.message,
              messageType: "success",
              messageClick: true,
            })
          );
          localStorage.setItem("UI", res?.data?.data?.id);
          const data = {
            avatar: res?.data?.data?.avatar,
            id: res?.data?.data?.id,
            username: res?.data?.data?.username,
            profileValidation: res?.data?.data?.profile_validation,
            userRole: res?.data?.data?.role,
          };

          dispatch(getUserLoginData(data));
          const userToken = res?.data?.data.token;
          localStorage.setItem("userTK", JSON.stringify(userToken));
          dispatch(getAuthentication(true));
          localStorage.setItem("usID", res?.data?.data?.id);
          localStorage.setItem("userRL", res?.data?.data?.role?.id);
          localStorage.setItem("valid", res?.data?.data?.profile_validation);
          dispatch(getRoleUser(true));
          if (res?.data?.data?.role.id == 3 || res?.data?.data?.role?.id == 4) {
            const routTimeOut = setTimeout(() => {
              navigate(`/account_management/my-edit-account/${data?.id}`);
              setIsLoginOpen(false);
            }, 800);

            return () => clearTimeout(routTimeOut);
          }
        } else {
          setLoginCheck(false);
        }
      })
      .catch((err) => {
        setLoginCheck(false);
        if (stateLoginData?.email !== "" && stateLoginData?.password !== "") {
          dispatch(
            getMessages({
              messages: err?.response?.data?.message,
              messageType: "error",
              messageClick: true,
            })
          );
        } else if (stateLoginData?.password === "") {
          dispatch(
            getMessages({
              messages: err.response.data.message.password[0],
              messageType: "error",
              messageClick: true,
            })
          );
        } else if (stateLoginData?.email === "") {
          dispatch(
            getMessages({
              messages: err?.response?.data?.message,
              messageType: "error",
              messageClick: true,
            })
          );
        } else {
          dispatch(
            getMessages({
              messages: err?.response?.data?.message,
              messageType: "error",
              messageClick: true,
            })
          );
        }
      });
  };

  return (
    <AppBar
      position="static"
      dir="rtl"
      sx={{ background: "none", boxShadow: "none" }}
    >
      <Container maxWidth="100%" className="LT-nav-container">
        <Toolbar
          disableGutters
          className="LT-navbar-sm-holder justify-content-between d-flex"
        >
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              display: { xs: "none", md: "flex" },
              width: "116px",
              height: "40px",
            }}
          >
            {/* Main Logo [Shoghl] */}
            <NavLink
              to="/"
              className="imLT-main-logo  uLT-img-position-contain col mx-0 px-0"
              aria-label="main-logo"
            />
          </Typography>
          <Box
            sx={{
              display: {
                xs: "flex",
                md: "none",
                color: "#02385A",
              },
            }}
            className="LT-nav-indicator nav-small-screen-75"
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="#menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon
                sx={{ width: 40, height: 40 }}
                className="main-bg-color px-2 py-1 rounded-3 text-light"
              />
            </IconButton>

            <MopileNavigate
              userID={userID}
              pages={pages}
              isOpen={anchorElNav}
              setIsOpen={setAnchorElNav}
            />

            {/* <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page, ix) => (
                <NavLink
                  key={ix}
                  onClick={handleCloseNavMenu}
                  className={(navData) =>
                    navData.isActive
                      ? "fLT-Bold-sA  nav-link cLT-main-text"
                      : "  fLT-Regular-sC nav-link cLT-main-text"
                  }
                  to={page.route}
                >
                  {page.name}
                </NavLink>
              ))}
            </Menu> */}

            <div className="d-md-none">
              <NavLink
                style={{
                  width: 145,
                  height: 50,
                  padding: "0 !important",
                  margin: "0 !important",
                }}
                to="/"
                className="imLT-main-logo me-4 d-block uLT-img-position-contain col mx-0 px-0"
                aria-label="main-logo"
              />
            </div>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {pages.map((page, ix) => (
              <NavLink
                key={ix}
                onClick={handleCloseNavMenu}
                className={(navData) =>
                  navData.isActive
                    ? "fLT-Bold-sA nav-link cLT-main-text"
                    : "cLT-main-text fLT-Regular-sC  nav-link"
                }
                to={page.route}
              >
                {page.name}
              </NavLink>
            ))}
          </Box>

          <Box
            className="align-items-center"
            sx={{ flexGrow: 0, display: "flex", justifyContent: "end" }}
          >
            {user.loggedIn && (
              <article className="d-none d-md-flex">
                <Link to="/chat">
                  <Box>
                    <div
                      style={{ width: 45, height: 45 }}
                      className="bg-hover-light ms-2 btn bg-light border d-flex justify-content-center align-items-center border-2 rounded-4"
                    >
                      <IconButton>
                        <img width={20} src="/icons/comment.svg" alt="" />
                      </IconButton>
                    </div>
                  </Box>
                </Link>

                <Link
                  to={`/account_management/my-notification/${activeUserId}`}
                >
                  <Box>
                    <div
                      style={{ width: 45, height: 45 }}
                      className="bg-hover-light ms-3 btn bg-light border d-flex justify-content-center align-items-center border-2 rounded-4"
                    >
                      <IconButton className="position-relative">
                        {/* <span
                          className="bg-warning rounded-circle position-absolute top-0 end-0 me-2 mt-2"
                          style={{ width: 8, height: 8 }}
                        /> */}
                        <img width={20} src="/icons/Notification.svg" alt="" />
                      </IconButton>
                    </div>
                  </Box>
                </Link>
              </article>
            )}

            {user.loggedIn ? (
              <>
                <div className="d-flex align-items-center gap-3 d-none d-md-block">
                  <Tooltip title={userID?.username ? userID?.username : false}>
                    <IconButton
                      onClick={handleOpenUserMenu}
                      sx={{ p: 0 }}
                      className="position-relative"
                    >
                      {/* <Avatar alt="Remy Sharp" src={userID.avatar} /> */}
                      {userID?.avatar ? (
                        <img
                          className="ms-md-3"
                          alt=""
                          src={
                            localStorage.getItem("avatar")
                              ? localStorage.getItem("avatar")
                              : userID?.avatar
                          }
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                          }}
                        />
                      ) : (
                        <div className="LT-avatar-wire-frame"></div>
                      )}
                      <div
                        style={{
                          position: "absolute",
                          top: "0",
                          right: "-10px",
                        }}
                      >
                        {userID?.available === 1 ? (
                          <div className="uLT-status-online"></div>
                        ) : (
                          <div className="uLT-status-offline"></div>
                        )}
                      </div>
                    </IconButton>
                  </Tooltip>

                  {(userID?.role?.id == 3) | (userID?.role?.id == 4) && (
                    <NavLink
                      to="/advertising-price"
                      className="btn cLT-main-bg py-2 px-0 uLT-f-radius-sB"
                    >
                      <p className="mb-0 px-4 cLT-white-text fLT-Regular-sC">
                        اضف اعلان
                      </p>
                    </NavLink>
                  )}
                </div>

                <MopileUserSettings
                  avatar={userID?.avatar}
                  isLogin
                  activeUserId={activeUserId}
                />
              </>
            ) : (
              <div className="LT-nav-login-button d-flex justify-content-end align-items-left">
                <div className="uLT-f-radius-sB w-25-in-phone w-100">
                  <AuthComponent onClick={() => setIsLoginOpen(true)} />

                  <Dialog
                    aria-labelledby="simple-dialog-title1"
                    open={isLoginOpen}
                    onClose={() => setIsLoginOpen(false)}
                  >
                    <Form onSubmit={(e) => formSubmit(e)}>
                      <LoginComponent
                        loginCheck={loginCheck}
                        forgetPassword={() => setIsLoginOpen(false)}
                      />
                      <div
                        className="d-flex align-items-center justify-content-center py-3 gap-1"
                        style={{ paddingBottom: "3rem" }}
                      >
                        <p className="m-0 fLT-Bold-sm-sA cLT-main-text">
                          {" "}
                          ليس لديك حساب{" "}
                        </p>
                        {/* <Button onClick={switchSignup} className='px-0'>
                            <p className='uLT-list-style fLT-Bold-sm-sA cLT-secondary-text '>إنشاء حساب جديد</p>
                        </Button> */}
                        <NavLink
                          to={"/register"}
                          onClick={() => setIsLoginOpen(false)}
                          className="uLT-list-style fLT-Bold-sm-sA cLT-secondary-text"
                        >
                          إنشاء حساب جديد
                        </NavLink>
                      </div>
                    </Form>
                  </Dialog>
                </div>
              </div>
            )}

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => {
                return (
                  <NavLink
                    ref={refe}
                    onClick={(e) => handleCloseNavMenu(e)}
                    to={setting.routeTo}
                    key={setting.id}
                    className={(navData) =>
                      navData.isActive
                        ? "fLT-Bold-sA nav-link cLT-main-text"
                        : "cLT-main-text fLT-Regular-sC nav-link"
                    }
                  >
                    {setting?.name}
                  </NavLink>
                );
              })}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default React.memo(Navbar);
