import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import LoginPage from "../../pages/authPage/LoginPage/LoginPage.pages";
import MobilePage from "../../pages/authPage/mobilePage/Mobile/Mobile.page";
import MobileOTPPage from "../../pages/authPage/mobilePage/MobileOTP/MobileOTP.page";
// import RegistrationPage from '../../pages/authPage/RegistrationPage/RegistrationPage.pages'
import SwearingShared from "../../shared/Swearing/Swearing.shared";
import { NavLink } from "react-router-dom";
import { Box, IconButton } from "@mui/material";

const AuthComponent = ({ clickMe, clickStatus }) => {
  const elementRef = useRef();
  const navigate = useNavigate();
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileOTPOpen, setMobileOTPOpen] = useState(false);
  const [swearing, setSwearing] = useState(false);
  const location = useLocation();

  const handleLogin = () => {
    setLoginOpen(true);
    setMobileOpen(false);
    setMobileOTPOpen(false);
    setSignupOpen(false);
    setSwearing(false);
  };

  const anys = useCallback(() => {
    clickMe && elementRef.current.click();
    clickStatus === true && setLoginOpen(true);
    // clickMe && clickStatus(false)
  }, [clickMe, clickStatus, elementRef]);

  useEffect(() => {
    anys();
  }, [anys]);
  useEffect(() => {
    location.pathname == "/login" && setLoginOpen(true);
  }, [location]);

  return (
    <div>
      <div className="lg-screen d-none d-md-block">
        <button
          ref={elementRef}
          onClick={() => navigate("/register")}
          type="button"
          style={{
            border: "0",
            height: "40px",
            width: "130px",
            borderRadius: "9px",
            margin: "0 0 0 1rem",
            backgroundColor: "#1EAAAD",
          }}
        >
          <p className="mb-0  px-4 cLT-white-text fLT-Regular-sC">كن مشتغل </p>
        </button>
        <button
          ref={elementRef}
          onClick={() => handleLogin()}
          type="button"
          className=" uLT-f-radius-sB"
          style={{
            height: "40px",
            border: "0",
            color: "#1EAAAD",
            backgroundColor: "#fff",
          }}
        >
          <p className="mb-0  px-2  fLT-Regular-sC">تسجيل الدخول</p>
        </button>
      </div>

      <div className="d-md-none">
        <IconButton className="d-flex justify-content-center align-items-center">
          <div
            className="icon px-2 d-flex justify-content-center align-items-center py-1 rounded-3 main-bg-lighter"
            style={{ width: 40, height: 40, cursor: "pointer" }}
          >
            <img className="w-100 h-100" src="/icons/user (3).svg" alt="" />
          </div>
        </IconButton>
      </div>

      {loginOpen && (
        <LoginPage
          open={loginOpen}
          setLoginOpen={setLoginOpen}
          setSignupOpen={setSignupOpen}
          setMobileOpen={setMobileOpen}
        />
      )}

      {mobileOpen && (
        <MobilePage
          open={mobileOpen}
          setLoginOpen={setLoginOpen}
          setSignupOpen={setSignupOpen}
          setMobileOpen={setMobileOpen}
          setMobileOTPOpen={setMobileOTPOpen}
        />
      )}

      {mobileOTPOpen && (
        <MobileOTPPage
          open={mobileOTPOpen}
          setLoginOpen={setLoginOpen}
          setSignupOpen={setSignupOpen}
          setMobileOTPOpen={setMobileOTPOpen}
          setMobileOpen={setMobileOpen}
        />
      )}

      {/* {signupOpen && <RegistrationPage open={signupOpen} setLoginOpen={setLoginOpen} setSignupOpen={setSignupOpen} setMobileOTPOpen={setMobileOTPOpen} setMobileOpen={setMobileOpen} setSwearing={setSwearing} />} */}

      {swearing && (
        <SwearingShared
          open={swearing}
          setSwearing={setSwearing}
          setLoginOpen={setLoginOpen}
          setSignupOpen={setSignupOpen}
          setMobileOTPOpen={setMobileOTPOpen}
          setMobileOpen={setMobileOpen}
        />
      )}
    </div>
  );
};

export default AuthComponent;
