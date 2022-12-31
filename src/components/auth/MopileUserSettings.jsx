import { IconButton, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAuthentication } from "../../core/redux/reducers/Authentication/AuthenticationReducer.core";
import { authAction } from "../../core/services/AuthServices/AuthActions/AuthActions.core";

const MopileUserSettings = ({ isLogin, onClick, activeUserId, avatar }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    const FBToken = localStorage.getItem("FCM");
    authAction._POST_Logout({ device_token: FBToken });
    dispatch(getAuthentication(false));
    navigate("/");
  };

  return (
    <div className="d-md-none">
      {isLogin ? (
        <>
          <IconButton
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            className="d-flex justify-content-center align-items-center"
          >
            {avatar ? (
              <div
                className="icon px-2 d-flex justify-content-center align-items-center py-1 rounded-3 main-bg-lighter"
                style={{ width: 40, height: 40, cursor: "pointer" }}
              >
                <img
                  className="w-100 h-100"
                  src={avatar || "/icons/user (3).svg"}
                  alt=""
                />
              </div>
            ) : (
              <div
                className="icon px-2 d-flex justify-content-center align-items-center py-1 rounded-3 main-bg-lighter"
                style={{ width: 40, height: 40, cursor: "pointer" }}
              >
                <img
                  className="w-100 h-100"
                  src={"/icons/user (3).svg"}
                  alt=""
                />
              </div>
            )}
          </IconButton>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>
              <Link
                className="text-decoration-none text-dark"
                to={`/account_management/my-edit-account/${activeUserId}`}
              >
                <p className="m-0 small">حسابي</p>
              </Link>
            </MenuItem>

            <MenuItem
              onClick={() => {
                handleClose();
                logout();
              }}
            >
              <p className="m-0 small">تسحيل الخروج</p>
            </MenuItem>
          </Menu>
        </>
      ) : (
        <IconButton
          onClick={onClick}
          className="d-flex justify-content-center align-items-center"
        >
          <div
            className="icon px-2 d-flex justify-content-center align-items-center py-1 rounded-3 main-bg-lighter"
            style={{ width: 40, height: 40, cursor: "pointer" }}
          >
            <img className="w-100 h-100" src="/icons/user (3).svg" alt="" />
          </div>
        </IconButton>
      )}
    </div>
  );
};

export default MopileUserSettings;
