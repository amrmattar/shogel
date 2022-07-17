import React, { useCallback, useEffect, useState } from 'react'
import './CheckMobile.component.scss'
import { Form, Row } from 'react-bootstrap'
import ButtonShare from '../../../../shared/Button/Button.shared'
import ReactPhoneInput from 'react-phone-input-2'
import { useDispatch } from 'react-redux'
import { getMobileNumber } from '../../../../core/redux/reducers/MobileOTP/MobileOTP.core'
import { checkMobileValidation } from '../../../../core/services/AuthServices/ForgetPasswordServices/CheckMobileCore/CheckMobile.core'
import { getMessages } from '../../../../core/redux/reducers/Messages/Messages.core'

const CheckMobileComponent = ({ nextFn }) => {
    // TODO Function Set Maxlength To Mobile Input
    useEffect(() => {
        const attrTimeOut = setTimeout(() => {
            const giveInputAtrr = document.getElementById('forgetMobile')
            giveInputAtrr.setAttribute("maxLength", 15)
        }, 400);
        return () => clearTimeout(attrTimeOut)
    }, [])
    //TODO Selector To Get Messages
    const dispatch = useDispatch()
    // TODO GET Mobile Number From Child Component
    const [mobileForm, setMobileForm] = useState({ mobile: '' })
    const handleMobileData = useCallback((e) => {
        const { name, value } = e.target;
        setMobileForm(mobileForm => ({ ...mobileForm, [name]: value }))
    }, [setMobileForm])

    // TODO Check Mobile Validation Before Post
    const [mobileType, setMobileType] = useState(true)
    const [mobileLoading, setMobileLoading] = useState(false)
    const splitNumber = mobileForm.mobile.split(" ").join("")
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

    // TODO POST Mobile Number TO Check
    const CheckMobileSubmit = useCallback((e) => {
        e.preventDefault()
        setMobileLoading(true)
        dispatch(getMobileNumber(parseInt(splitNumber.split("+")[1])))
        checkMobileValidation._POST_CheckMobileValid({ mobile: parseInt(splitNumber.split("+")[1]) }).then(res => {
            setMobileLoading(false)
            dispatch(getMessages({ messages: res.data.message, messageType: 'success', messageClick: true }))
            const forgetTimeOut = setTimeout(() => {
                nextFn()
            }, 300);
            return () => clearTimeout(forgetTimeOut)
        }).catch(err => {
            setMobileLoading(false)
            dispatch(getMessages({ messages: err.response.data.message, messageType: 'error', messageClick: true }))
        })
    }, [dispatch, splitNumber, nextFn])
    return (
        <div className='d-flex justify-content-center'>
            <div className="LT-check-mobile-holder">
            {/* Mobile Number Holder */}
            <Row className="gap-3 two mb-3">
                {/* Mobile Number */}
                <Form.Group md="12" controlId="formGridMobile" className=' '>
                    <Form.Label className='fLT-Regular-sB cLT-support2-text mb-3'>رقم الجوال</Form.Label>
                    <div dir='ltr' onChange={handleMobileData}  >
                        <ReactPhoneInput inputProps={{ name: 'mobile', id: 'forgetMobile' }}
                            countryCodeEditable={false}
                            placeholder='0000' country={'sa'} onlyCountries={['sa']}
                            masks={{ sa: ' .........' }}
                        />
                    </div>
                </Form.Group>
                <p className='mb-0 fLT-Regular-sA cLT-support2-text'>برجاء إدخال رقم الجوال لإرسال رمز التـــأكيد </p>
            </Row>
            <div className="w-100">
                <ButtonShare loading={mobileLoading} onClick={CheckMobileSubmit} type={mobileType} innerText={'ارســــــال'} btnClasses={'three cLT-secondary-bg'} textClasses={'py-2 cLT-white-text fLT-Regular-sB'}
                />
            </div>
            </div>
        </div>
    )
}

export default CheckMobileComponent