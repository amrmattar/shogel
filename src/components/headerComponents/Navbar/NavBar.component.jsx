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
import { getUserDataReducer } from "../../../core/redux/reducers/UserDataReducer/UserDataReducer.core";

const Navbar = () => {
  const [user, activeUserId, userUpdateAvatar] = useSelector((state) => [
    state.authentication,
    state.userData.id,
    state.userFullData.state,
  ]);
  const [userID, setuserID] = useState("");

  console.log("userID", userID);

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
    //   name: "chat",
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
            ></NavLink>
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none", color: "#02385A" },
            }}
            className="LT-nav-indicator"
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="#menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
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
          <Box sx={{ flexGrow: 0, display: "flex", justifyContent: "end" }}>
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
                      style={{ position: "absolute", top: "0", right: "-10px" }}
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
                <div className="uLT-f-radius-sB">
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
