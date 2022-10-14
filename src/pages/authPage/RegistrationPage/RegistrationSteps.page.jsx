import React from "react";
import { useSelector } from "react-redux";
import { Steps, useSteps } from "react-step-builder";
import CheckMobileComponent from "../../../components/auth/forgetPassword/CheckMobile/CheckMobile.component";
import RegistrationMobileComponent from "../../../components/auth/forgetPassword/CheckMobile/RegistrationMobile.component";
import CheckOTPComponent from "../../../components/auth/forgetPassword/CheckOTP/CheckOTP.component";
import RegistrationOTPCheckComponent from "../../../components/auth/forgetPassword/CheckOTP/RegistrationOTPCheck.component";
import ReSendOTPComponent from "../../../components/auth/forgetPassword/CheckOTP/ReSendOTP.component";
import RegistrationCycelComponent from "../../../components/auth/Register/RegistrationCycel.component";
import UserFeedBackShared from "../../../shared/UserFeedBack/UserFeedBack.shared";
import Home from "../../Home/Home.page";

const RegistrationStepsPage = () => {
  const [messages] = useSelector((state) => [state.messages]);
  const { next } = useSteps();

  return (
    <div>
      <UserFeedBackShared
        message={messages.messages}
        type={messages?.messageType}
        clickMe={messages?.messageClick}
      />
      <Steps>
        <div className="">
          <RegistrationMobileComponent nextFn={next} />
        </div>
        <div className="">
          <RegistrationOTPCheckComponent />
        </div>
        <div className="">
          <RegistrationCycelComponent />
        </div>
      </Steps>
    </div>
  );
};

export default RegistrationStepsPage;
