import cls from "./Stepper.module.scss";
import { NavLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
const StepperComp = ({ activeStep, steps }) => {
  const widthRatio = ((activeStep - 2) / steps) * 100;
  return (
    <div>
      <div
        style={{
          backgroundColor: "white",
          padding: "1rem",
          height: "5rem",
          borderTop: "6px solid #6B79B9",
        }}
      >
        <Typography
          variant="h6"
          noWrap
          component="div"
          style={{ marginLeft: "auto", marginRight: "15rem" }}
          sx={{
            display: { xs: "none", md: "flex" },
            width: "116px",
            height: "47px",
          }}
        >
          {/* Main Logo [Shoghl] */}
          <NavLink
            to="/"
            className="imLT-main-logo  uLT-img-position-contain col"
            aria-label="main-logo"
          ></NavLink>
        </Typography>
      </div>
      <div
        style={{
          width: `${
            activeStep > 2 ? (widthRatio <= 100 ? widthRatio : 0) : 0
          }%`,
        }}
        className={cls.Stepper}
      ></div>
    </div>
  );
};
export default StepperComp;
