import React from "react";

import cls from "./StepComponent/Stepper.module.scss";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";

const PhoneNavbar = ({ steps, activeStep }) => {
  const widthRatio = ((activeStep - 2) / steps) * 100;

  return (
    <div className="mb-4 d-md-none">
      <div
        style={{
          backgroundColor: "white",
          padding: "1rem",
          height: "5rem",
          borderTop: "6px solid #6B79B9",
        }}
      >
        <Typography variant="h6" noWrap component="div">
          {/* Main Logo [Shoghl] */}
          <NavLink
            style={{ height: 35 }}
            to="/"
            className="imLT-main-logo ms-auto d-block col uLT-img-position-contain"
            aria-label="main-logo"
          />
        </Typography>
      </div>

      {/* Line Process Width */}
      <div
        style={{
          width: `${
            activeStep > 2 ? (widthRatio <= 100 ? widthRatio : 0) : 0
          }%`,
        }}
        className={cls.Stepper}
      />
    </div>
  );
};

export default PhoneNavbar;
