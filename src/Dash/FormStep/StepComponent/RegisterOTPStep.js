import { Button, ButtonGroup, TextField } from "@mui/material";
import Swal from 'sweetalert2'
import OtpInput from 'react-otp-input-rc-17';
import React, { Fragment, useContext, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { LabelContext } from "../LabelDataContext/labelDataContext";
import "../NewStyle.scss";
import ButtonShare from "../../../shared/Button/Button.shared";
import { useSelector } from "react-redux";
import { MobileServices } from "../../../core/services/AuthServices/Method_MobileValidation/Method_MobileValidation.core";
import ReSendOTPComponent from "../../../components/auth/forgetPassword/CheckOTP/ReSendOTP.component";
import { getMessages } from "../../../core/redux/reducers/Messages/Messages.core";
const RegisterOTPStep = (props) => {
  const value = useContext(LabelContext);
  const dispatch = useDispatch()
  const [isLoading, setIsloading] = useState(false);
  const [getMobileNumber] = useSelector((state) => [state.mobileOTP ]);
  const mobileNumber = {
    mobile: getMobileNumber?.mobile?.split("+").join("")
  }

  const [code, setCode] = useState("");
  const handleChange = (code) => setCode(code);


  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
  }, []);
  const handleBeforeUnload = (e) => {
    e.preventDefault();
    e.returnValue = '';
  };

  const handlePrevBtn = (e) => {
    e.preventDefault()
    Swal.fire({
      html: `التغييرات التي قمت بها قد لا يتم حفظها `,
      icon: 'warning',
      iconHtml: '!',
      allowOutsideClick: false,
      confirmButtonText: 'نعم',
      cancelButtonText: 'لا',
      showCancelButton: true,
      showCloseButton: true,
      allowEscapeKey: true,
      width: '50%',
    }).then(res => {
      if (res.isConfirmed) {
        value.prevPage()
      }
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setIsloading(true)
    dispatch(getMessages({ messages: 'جــارى إرسال طلبك', messageType: 'warning', messageClick: true }))
    const data = {
      code: code,
      mobile: getMobileNumber?.mobile?.split("+").join("")
    }
    MobileServices._POST_MobileOTP(data)
      .then(res => {
        dispatch(getMessages({ messages: res.data.message, messageType: 'success', messageClick: true }))
        setIsloading(false)
        const nextStepTimeOut = setTimeout(() => {
          value.jumpPage(2)
        }, 1200);

      })
      .catch(err => {
        dispatch(getMessages({ messages: err.response.data.message.code, messageType: 'error', messageClick: true }))
        setIsloading(false)
      })

  }


  return (
    <div className="d-flex justify-content-center" dir="rtl">
      <form onSubmit={(e) => handleSubmit(e)} className='LT-RegisterOTP-holder gap-3 '>
        <div className='LT-otp-input'>
          <OtpInput
            shouldAutoFocus={true}
            key={'otp'}
            numInputs={4}
            value={code}
            onChange={handleChange}
          />
        </div>
        <div className="LT-reSend-code d-flex align-items-center justify-content-start gap-3 three" >
          <p className='m-0 fLT-Bold-sm-sA cLT-main-text'>لم يصلك الرمز ؟ </p>
          <ReSendOTPComponent mobileNumber={mobileNumber?.mobile} />
        </div>
        <div className="LT-otp-button d-flex justify-content-center align-items-center gap-3">
          <div className="w-100">
            <ButtonShare loading={isLoading} innerText={'التحــقق'} btnClasses={'three cLT-secondary-bg'} textClasses={'py-2 cLT-white-text fLT-Regular-sB'} />
          </div>
          <div className="w-100">
            <ButtonShare onClick={(e) => handlePrevBtn(e)} innerText={'رجــــوع'} btnClasses={'three cLT-secondary-bg'} textClasses={'py-2 cLT-white-text fLT-Regular-sB'} />
          </div>
        </div>
      </form>
    </div>

  );
};
export default RegisterOTPStep;
