import React, { useCallback, useEffect, useState } from 'react'
import { Dialog, Button } from '@mui/material'
import UserFeedBackShared from '../../../../shared/UserFeedBack/UserFeedBack.shared'
import { useDispatch, useSelector } from 'react-redux'
import MobileComponent from '../../../../components/auth/mobile/MobileComponent/Mobile.component'
import { getMobileNumber } from '../../../../core/redux/reducers/MobileOTP/MobileOTP.core'
import { MobileServices } from '../../../../core/services/AuthServices/Method_MobileValidation/Method_MobileValidation.core'
import { getMessages } from '../../../../core/redux/reducers/Messages/Messages.core'

const MobilePage = ({ open, setLoginOpen, setSignupOpen, setMobileOpen, setMobileOTPOpen }) => {
    const [messages] = useSelector((state) => [
        state.messages,
    ]);
    const dispatch = useDispatch()
    const switchLoggin = () => {
        setLoginOpen(true)
        setMobileOTPOpen(false)
        setSignupOpen(false)
        setMobileOpen(false)
    }
    const handleClose = () => {
        setMobileOTPOpen(false)
        setLoginOpen(false)
        setSignupOpen(false)
        setMobileOpen(false)
    };
    // Set Send Button Status To Disable Or Not 
    const [mobileType, setMobileType] = useState(true)
    // TODO GET Mobile Number From Child Component
    const [mobileForm, setMobileForm] = useState({ mobile: '' })
    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setMobileForm(mobileForm => ({ ...mobileForm, [name]: value }))
    }, [setMobileForm])
    // TODO Check Mobile Validation Before Post
    const activeMobileSend = useCallback(
        () => { mobileForm.mobile.split(" ").join("").length <= 12 ? setMobileType(true) : setMobileType(false) },
        [mobileForm, setMobileType],
    )
    useEffect(() => {
        const mobileTimeOut = setTimeout(() => {
            activeMobileSend()
        }, 200);
        return () => clearTimeout(mobileTimeOut)
    }, [activeMobileSend, setMobileForm])

    const [isLoading, setIsLoading] = useState(false)
    // TODO Post Mobile Number To API
    const formSubmit = useCallback((e) => {
        setIsLoading(true)
        dispatch(getMobileNumber(mobileForm?.mobile.split(" ").join("")))
        MobileServices._POST_MobileNumber({ mobile: mobileForm?.mobile.split(" ").join("") }).then(res => {
            dispatch(getMessages({ messages: res.data.message, messageType: 'success', messageClick: true }))
            if (res.data.data.length === 0) {
                setMobileOTPOpen(true)
                setSignupOpen(false)
                setIsLoading(false)
                setMobileOpen(false)
            } else {
                setSignupOpen(true)
                setMobileOpen(false)
                setIsLoading(false)

            }
        }).catch(err => {
            dispatch(getMessages({ messages: err.response.data.message, messageType: 'error', messageClick: true }))
            if (messages.messageType === 'error') {
                setMobileOTPOpen(false)
                setMobileOpen(true)
                setIsLoading(false)
            }
            setIsLoading(false)
        })

    }, [dispatch, mobileForm, messages, setMobileOTPOpen, setSignupOpen, setMobileOpen])
    function handleKeyPress(e) {
        e.preventDefault()
        if (e.key === 'Enter') {
            formSubmit()
        }
    }
    return (
        <div>
            <UserFeedBackShared message={messages.messages} type={messages?.messageType} clickMe={messages?.messageClick} />
            <Dialog aria-labelledby="simple-dialog-title1" open={open ? open : false} onClose={handleClose} >
                <div  >
                    <MobileComponent handleClick={(e) => formSubmit(e)} mobileType={mobileType} onChange={(e) => handleChange(e)} buttonLoading={isLoading} iclick={(e) => handleKeyPress(e)} />
                </div>
                {/* Route To Login Form  [Button] */}
                <div className="d-flex align-items-center justify-content-center py-3 gap-1" >
                    <p className='m-0 fLT-Bold-sm-sA cLT-main-text'> لديك حساب </p>
                    <Button onClick={switchLoggin} className='px-0' >
                        <p className='uLT-list-style fLT-Bold-sm-sA cLT-secondary-text '>تسجيل الدخول</p>
                    </Button>
                </div>
            </Dialog>
        </div>
    )
}

export default React.memo(MobilePage)