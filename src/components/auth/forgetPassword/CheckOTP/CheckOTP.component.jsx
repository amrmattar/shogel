import React, { useState } from "react";
import OtpInput from "react-otp-input-rc-17";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "../../../../core/redux/reducers/Messages/Messages.core";
import { getOTPValue } from "../../../../core/redux/reducers/MobileOTP/MobileOTP.core";
import { checkOTPValidation } from "../../../../core/services/AuthServices/ForgetPasswordServices/CheckOtpCore/CheckOTP.core";
import { MobileServices } from "../../../../core/services/AuthServices/Method_MobileValidation/Method_MobileValidation.core";
import { Button } from "@mui/material";
import ButtonShare from "../../../../shared/Button/Button.shared";
import "./CheckOTP.component.scss";
import ReSendOTPComponent from "./ReSendOTP.component";

const CheckOTPComponent = ({ nextFn }) => {
  const [getMobile] = useSelector((state) => [state.mobileOTP]);
  const dispatch = useDispatch();
  const [code, setCode] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const handleChange = (code) => {
    setCode(code);
  };
  const resendOtpCode = () => {
    dispatch(
      getMessages({
        messages: "Resending code",
        messageType: "warning",
        messageClick: true,
      })
    );
    MobileServices._POST_ResendOTP()
      .then((res) => {
        dispatch(
          getMessages({
            messages: res.data.message,
            messageType: "success",
            messageClick: true,
          })
        );
      })
      .catch((err) => {
        dispatch(
          getMessages({
            messages: err.response.data.message,
            messageType: "error",
            messageClick: true,
          })
        );
      });
  };
  const mobileOTP = (e) => {
    e.preventDefault();
    dispatch(getOTPValue(code));
    const data = {
      code: code,
      mobile: getMobile.mobile,
    };
    setIsloading(true);
    checkOTPValidation
      ._POST_CheckOTPValid(data)
      .then((res) => {
        dispatch(
          getMessages({
            messages: res.data.message,
            messageType: "success",
            messageClick: true,
          })
        );
        if (res.data.status === 1) {
          localStorage.setItem("userID", res.data.data.id);
          setIsloading(false);
          const otpTimeOut = setTimeout(() => {
            nextFn();
          }, 300);
          return () => clearTimeout(otpTimeOut);
        }
      })
      .catch((err) => {
        dispatch(
          getMessages({
            messages: err.response.data.message,
            messageType: "error",
            messageClick: true,
          })
        );
        if (err.response.status === 400) {
          setIsloading(false);
        } else {
          setIsloading(false);
        }
      });
  };

  return (
    <div className="d-flex justify-content-center ">
      <div className="LT-checkOTP-holder gap-3 ">
        <div className="LT-otp">
          <OtpInput
            hasErrored={true}
            numInputs={4}
            value={code}
            onChange={handleChange}
          />
        </div>
        <div className="d-flex align-items-center justify-content-between gap-2 gap-sm-3 LT-resend-otp flex~-wrap ">
          <p className="m-0 fLT-Bold-sm-sA cLT-main-text">لم يصلك الرمز ؟ </p>
          {/* <Button className='px-0' onClick={() => resendOtpCode()} >
                        <p className='uLT-list-style fLT-Bold-sm-sA cLT-secondary-text '>اعادة الإرســــال</p>
                    </Button> */}
          <ReSendOTPComponent />
        </div>
        <div className="w-100">
          <ButtonShare
            type={code.length !== 4 ? true : false}
            loading={isLoading}
            onClick={mobileOTP}
            innerText={"التحــقق"}
            btnClasses={"three cLT-secondary-bg"}
            textClasses={"py-2 cLT-white-text fLT-Regular-sB"}
          />
        </div>
      </div>
    </div>
  );
};
export default CheckOTPComponent;
