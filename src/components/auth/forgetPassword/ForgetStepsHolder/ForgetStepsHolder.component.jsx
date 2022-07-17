import React from 'react'
import { useSelector } from 'react-redux';
import { Steps, useSteps } from 'react-step-builder'
import UserFeedBackShared from '../../../../shared/UserFeedBack/UserFeedBack.shared'
import CheckMobileComponent from '../CheckMobile/CheckMobile.component';
import CheckOTPComponent from '../CheckOTP/CheckOTP.component';
import ChangePasswordComponent from '../PasswordChange/ChangePassword.component';
// import ChangePasswordComponent from '../ChangePassword/ChangePassword.component'
const ForgetStepsHolder = () => {
    const [messages] = useSelector((state) => [state.messages]);
    const { next } = useSteps();
    return (
        <div>
            <UserFeedBackShared message={messages.messages} type={messages?.messageType} clickMe={messages?.messageClick} />
            <Steps >
                <div className="">
                    <CheckMobileComponent nextFn={next} />
                </div>
                <div className="">
                    <CheckOTPComponent nextFn={next} />
                </div>
                <div className="">
                    <ChangePasswordComponent />
                </div>
            </Steps>
        </div>
    )
}

export default ForgetStepsHolder