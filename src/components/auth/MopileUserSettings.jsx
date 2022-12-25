import { IconButton } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const MopileUserSettings = ({ isLogin, onClick, activeUserId }) => {
  return (
    <div className="d-md-none">
      {isLogin ? (
        <Link to={`/account_management/my-edit-account/${activeUserId}`}>
          <IconButton className="d-flex justify-content-center align-items-center">
            <div
              className="icon px-2 d-flex justify-content-center align-items-center py-1 rounded-3 main-bg-lighter"
              style={{ width: 40, height: 40, cursor: "pointer" }}
            >
              <img className="w-100 h-100" src="/icons/user (3).svg" alt="" />
            </div>
          </IconButton>
        </Link>
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
