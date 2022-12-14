import React, { useEffect, useRef } from "react";
import ButtonShare from "../../../../shared/Button/Button.shared";
import OtpInput from "react-otp-input-rc-17";
import { Button } from "@mui/material";
import "./OTPMobile.component.scss";
import { MobileServices } from "../../../../core/services/AuthServices/Method_MobileValidation/Method_MobileValidation.core";
const OTPMobileComponent = ({ inputValue, onChange, buttonLoading }) => {
  const resendOtpCode = () => {
    MobileServices._POST_ResendOTP().then((res) => {
      return res;
    });
  };
  const first = useRef();

  // TODO Function Set Maxlength To Mobile Input
  useEffect(() => {
    const mobileOtp = document.getElementById(
      first.current?._reactInternals?.key
    );
  }, []);

  return (
    <div className="container p-0">
      <div className="LT-mobileOTP-holder gap-3 ">
        <div className="imLT-main-logo uLT-img-contain my-3 LT-otp-image">
          {" "}
        </div>
        <div className="two">
          <OtpInput
            shouldAutoFocus={true}
            key={"otp"}
            ref={first}
            numInputs={4}
            value={inputValue}
            onChange={onChange}
          />
        </div>
        <div className="d-flex align-items-center justify-content-start gap-3 three">
          <p className="m-0 fLT-Bold-sm-sA cLT-main-text">لم يصلك الرمز ؟ </p>
          <Button className="px-0" onClick={() => resendOtpCode()}>
            <p className="uLT-list-style fLT-Bold-sm-sA cLT-secondary-text ">
              اعادة الإرســــال
            </p>
          </Button>
        </div>
        <div className="w-100">
          <ButtonShare
            loading={buttonLoading}
            innerText={"التحــقق"}
            btnClasses={"three cLT-secondary-bg"}
            textClasses={"py-2 cLT-white-text fLT-Regular-sB"}
          />
        </div>
      </div>
    </div>
  );
};

export default OTPMobileComponent;
