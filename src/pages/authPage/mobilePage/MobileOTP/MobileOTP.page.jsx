import { Button, Dialog } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import OTPMobileComponent from '../../../../components/auth/mobile/OTPMobileComponent/OTPMobile.component'
import UserFeedBackShared from '../../../../shared/UserFeedBack/UserFeedBack.shared';
import { useDispatch } from 'react-redux'
import { getOTPValue } from '../../../../core/redux/reducers/MobileOTP/MobileOTP.core';
import { authAction } from '../../../../core/services/AuthServices/AuthActions/AuthActions.core';
import { MobileServices } from '../../../../core/services/AuthServices/Method_MobileValidation/Method_MobileValidation.core';
import { getMessages } from '../../../../core/redux/reducers/Messages/Messages.core';

const MobileOTPPage = ({ open, setLoginOpen, setSignupOpen, setMobileOTPOpen, setMobileOpen }) => {
    const [messages, getMobileNumber] = useSelector((state) => [
        state.messages,
        state.mobileOTP
    ]);

    const dispatch = useDispatch()
    const switchLoggin = () => {
        setLoginOpen(true)
        setMobileOpen(false)
        setMobileOTPOpen(false)
        setSignupOpen(false)
    }
    const handleClose = () => {
        setLoginOpen(false)
        setMobileOTPOpen(false)
        setMobileOpen(false)
        setSignupOpen(false)
    };
    const [isLoading, setIsloading] = useState(false);
    const [code, setCode] = useState("");
    const handleChange = (code) => setCode(code);

    const formSubmit = (e) => {
        e.preventDefault()
        // dispatch(getOTPValue(code))
        const data = {
            code: code,
            mobile: getMobileNumber.mobile.split("+").join("")
        }
        setIsloading(true)
        MobileServices._POST_MobileOTP(data)
            .then(res => {
                dispatch(getMessages({ messages: res.data.message, messageType: 'success', messageClick: true }))
                if (res.data.status === 1) {
                    setSignupOpen(true)
                    setLoginOpen(false)
                    setMobileOTPOpen(false)
                    setMobileOpen(false)
                    setIsloading(false)
                }
            })
            .catch(err => {
                dispatch(getMessages({ messages: err.response.data.message.code, messageType: 'error', messageClick: true }))
                if (err.response.status === 400) {
                    setSignupOpen(false)
                    setIsloading(false)
                } else {
                    setIsloading(false)
                }
            })
    }
    return (
        <div>
            <UserFeedBackShared message={messages.messages} type={messages?.messageType} clickMe={messages?.messageClick} />
            <Dialog aria-labelledby="simple-dialog-title1 " open={open ? open : false} onClose={handleClose} >
                <Form onSubmit={(e) => formSubmit(e)}  >
                    <OTPMobileComponent onChange={handleChange} inputValue={code} buttonLoading={isLoading} />
                </Form>
                {/* Route To Login Form  [Button] */}
                <div className="d-flex align-items-center justify-content-center mt-3 gap-1" style={{ paddingBottom: '3rem' }}>
                    <p className='m-0 fLT-Bold-sm-sA cLT-main-text'> لديك حساب </p>
                    <Button onClick={switchLoggin} className='px-0' >
                        <p className='uLT-list-style fLT-Bold-sm-sA cLT-secondary-text '>تسجيل الدخول</p>
                    </Button>
                </div>
            </Dialog>
        </div>
    )
}

export default MobileOTPPage