import { Button, ButtonGroup } from "@mui/material";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { getMobileNumber } from "../../../core/redux/reducers/MobileOTP/MobileOTP.core";
import { getMessages } from "../../../core/redux/reducers/Messages/Messages.core";
import { MobileServices } from "../../../core/services/AuthServices/Method_MobileValidation/Method_MobileValidation.core";
import { Form, Row } from 'react-bootstrap'
import ReactPhoneInput from 'react-phone-input-2'
import ButtonShare from "../../../shared/Button/Button.shared";
import { LabelContext } from "../LabelDataContext/labelDataContext";
import UserFeedBackShared from "../../../shared/UserFeedBack/UserFeedBack.shared";

const RegisterMobileStep = () => {
  const value = useContext(LabelContext);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [messages] = useSelector((state) => [state.messages]);
  // TODO Function Set Maxlength To Mobile Input
  useEffect(() => {
    const attrTimeOut = setTimeout(() => {
      const mobileInput = document.getElementById('mobileNumber')
      mobileInput.focus()
      mobileInput.setAttribute("maxLength", 14)
    }, 400);
    return () => clearTimeout(attrTimeOut)
  }, [])

  const ConvertToArabicNumbers = (num) => {
    const arabicNumbers = '\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669';
   return new String(num).replace(/[0123456789]/g, (d)=>{return arabicNumbers[d]});
  }
  
  const [arabicNumber, setArabicNumber] = useState({
    number: 0,
    converted: ConvertToArabicNumbers('')
  })

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
    () => { mobileForm.mobile.split(" ").join("").length <= 11 ? setMobileType(true) : setMobileType(false) },
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
  const handleMobileSubmit = useCallback((e) => {
    dispatch(getMessages({ messages:'جــارى ارسال رقم الجوال', messageType: 'warning', messageClick: true }))
    setIsLoading(true)
    // dispatch(getMobileNumber(ConvertToArabicNumbers(mobileForm?.mobile.split(" ").join(""))))
    dispatch(getMobileNumber(mobileForm?.mobile.split(" ").join("")))
    MobileServices._POST_MobileNumber({ mobile: mobileForm?.mobile.split(" ").join("") }).then(res => {
      dispatch(getMessages({ messages: res.data.message, messageType: 'success', messageClick: true }))
      setIsLoading(false)
      const nextStepTimeOut = setTimeout(() => {
        value.jumpPage(1)
      }, 1200);
      return () => clearTimeout(nextStepTimeOut)
    }).catch(err => {
      dispatch(getMessages({ messages: err.response.data.message, messageType: 'error', messageClick: true }))
      setIsLoading(false)
    })

  }, [dispatch, mobileForm, messages])

  // TODO POST Mobile Number TO Check
  function handleEnterKey(e) {
    e.preventDefault()
    if (e.key === 'Enter') {
      handleMobileSubmit()
    }
  }
  return (
    <>
    <UserFeedBackShared message={messages.messages} type={messages?.messageType} clickMe={messages?.messageClick} />
    <div className="d-flex justify-content-center">
      <div className='LT-check-mobile-holder'>
        <Row className="gap-3 two">
          {/* Mobile Number */}
          <Form.Group md="12" controlId="formGridMobile" className=' '>
            <Form.Label className='fLT-Regular-sB cLT-support2-text mb-3'>رقم الجوال</Form.Label>
            <div dir='ltr' onChange={handleChange} >
              <ReactPhoneInput inputClass="fLT-Regular-sB" onEnterKeyPress={(e) => handleEnterKey(e)} inputProps={{ name: 'mobile', id: 'mobileNumber' }}
                countryCodeEditable={false}
                placeholder='0000' country={'sa'} onlyCountries={['sa']}
                masks={{ sa: '.........' }}
              />
            </div>
          </Form.Group>
          <p className='mb-0 fLT-Regular-sA text-end cLT-support2-text'> برجاء إدخال رقم الجوال لإرسال رمز التأكيد</p>
        </Row>
        <div className="three" dir="">
          <ButtonShare onClick={handleMobileSubmit} loading={isLoading} innerText={'ارســــــال'} btnClasses={'three cLT-secondary-bg'} textClasses={'py-2 cLT-white-text fLT-Regular-sB'}
            type={mobileType} />
        </div>
      </div>
    </div>
    </>
  )
}
export default RegisterMobileStep;
