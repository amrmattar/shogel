import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import LoginPage from "../../pages/authPage/LoginPage/LoginPage.pages";
import MobilePage from "../../pages/authPage/mobilePage/Mobile/Mobile.page";
import MobileOTPPage from "../../pages/authPage/mobilePage/MobileOTP/MobileOTP.page";
// import RegistrationPage from '../../pages/authPage/RegistrationPage/RegistrationPage.pages'
import SwearingShared from "../../shared/Swearing/Swearing.shared";

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
    <div className="">
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
