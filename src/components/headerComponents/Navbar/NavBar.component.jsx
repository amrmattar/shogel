import "./Navbar.component.scss";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
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

const Navbar = () => {
  const [user, activeUserId, userUpdateAvatar] = useSelector((state) => [
    state.authentication,
    state.userData.id,
    state.userFullData.state,
  ]);
  const [userID, setuserID] = useState("");

  const dispatch = useDispatch();
  const refe = useRef();
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

  return (
    <AppBar
      position="static"
      dir="rtl"
      sx={{ background: "none", boxShadow: "none" }}
    >
      <Container maxWidth="100%" className="LT-nav-container">
        <Toolbar disableGutters className="LT-navbar-sm-holder">
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
            <Menu
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
            </Menu>

            <div className="d-md-none">
              <NavLink
                style={{
                  width: 170,
                  height: 50,
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
              <>
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
                        <span
                          className="bg-warning rounded-circle position-absolute top-0 end-0 me-2 mt-2"
                          style={{ width: 8, height: 8 }}
                        />
                        <img width={20} src="/icons/Notification.svg" alt="" />
                      </IconButton>
                    </div>
                  </Box>
                </Link>
              </>
            )}

            {user.loggedIn ? (
              <div className="d-flex align-items-center gap-3">
                <Tooltip title={userID?.username ? userID?.username : false}>
                  <IconButton
                    onClick={handleOpenUserMenu}
                    sx={{ p: 0 }}
                    className="position-relative"
                  >
                    {/* <Avatar alt="Remy Sharp" src={userID.avatar} /> */}
                    {userID?.avatar ? (
                      <img
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
            ) : (
              <div className="LT-nav-login-button d-flex justify-content-end align-items-left">
                <div className="uLT-f-radius-sB w-25-in-phone">
                  <AuthComponent />
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
                        : "cLT-main-text fLT-Regular-sC  nav-link"
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
