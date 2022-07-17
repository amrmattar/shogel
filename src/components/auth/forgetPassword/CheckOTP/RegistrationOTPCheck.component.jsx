import React, { Fragment, useEffect, useRef, useState } from 'react'
import ButtonShare from '../../../../shared/Button/Button.shared'
import OtpInput from 'react-otp-input-rc-17';
import { Button } from '@mui/material';
import { MobileServices } from '../../../../core/services/AuthServices/Method_MobileValidation/Method_MobileValidation.core';
import './RegistrationOTPCheckComponent.scss'
import ReSendOTPComponent from './ReSendOTP.component';
import { useSelector } from 'react-redux';
const RegistrationOTPCheckComponent = () => {
    const [isLoading, setIsloading] = useState(false);
    const [messages, getMobileNumber] = useSelector((state) => [
        state.messages,
        state.mobileOTP
    ]);
    const [code, setCode] = useState("");
    const handleChange = (code) => setCode(code);

    const resendOtpCode = () => {
        MobileServices._POST_ResendOTP().then(res => { return res })
    }
    const first = useRef()

    // TODO Function Set Maxlength To Mobile Input
    useEffect(() => {
        const mobileOtp = document.getElementById(first.current?._reactInternals?.key)
    }, [])
    return (
        <div className="d-flex justify-content-center">
            <div className='LT-RegisterOTP-holder gap-3 '>
                <div className="imLT-main-logo uLT-img-contain my-3 LT-registerOtp-image" > </div>
                <div className="LT-otp-input">
                    <OtpInput
                        shouldAutoFocus={true}
                        key={'otp'}
                        ref={first}
                        numInputs={4}
                        value={code}
                        onChange={handleChange}
                    />
                </div>
                <div className="LT-reSend-code d-flex align-items-center justify-content-start gap-3 three" >
                    <p className='m-0 fLT-Bold-sm-sA cLT-main-text'>لم يصلك الرمز ؟ </p>
                    <ReSendOTPComponent   />
                </div>
                    <div className="LT-otp-button">
                        <ButtonShare loading={isLoading} innerText={'التحــقق'} btnClasses={'three cLT-secondary-bg'} textClasses={'py-2 cLT-white-text fLT-Regular-sB'} />
                    </div>
            </div>
        </div>
    )
}

export default RegistrationOTPCheckComponent