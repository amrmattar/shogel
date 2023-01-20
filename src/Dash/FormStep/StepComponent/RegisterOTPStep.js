import { Button, ButtonGroup, Dialog, TextField } from "@mui/material";
import Swal from "sweetalert2";
import OtpInput from "react-otp-input-rc-17";
import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import { LabelContext } from "../LabelDataContext/labelDataContext";
import "../NewStyle.scss";
import ButtonShare from "../../../shared/Button/Button.shared";
import { useSelector } from "react-redux";
import { MobileServices } from "../../../core/services/AuthServices/Method_MobileValidation/Method_MobileValidation.core";
import ReSendOTPComponent from "../../../components/auth/forgetPassword/CheckOTP/ReSendOTP.component";
import { getMessages } from "../../../core/redux/reducers/Messages/Messages.core";
import { NavLink, useNavigate } from "react-router-dom";
const RegisterOTPStep = (props) => {
  const value = useContext(LabelContext);
  const dispatch = useDispatch();
  const [isLoading, setIsloading] = useState(false);
  const [getMobileNumber] = useSelector((state) => [state.mobileOTP]);
  const navigate = useNavigate();

  const mobileNumber = {
    mobile: getMobileNumber?.mobile?.split("+").join(""),
  };

  const [code, setCode] = useState("");
  const handleChange = (code) => setCode(code);

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
  }, []);
  const handleBeforeUnload = (e) => {
    e.preventDefault();
    e.returnValue = "";
  };

  const handlePrevBtn = (e) => {
    e.preventDefault();
    Swal.fire({
      html: `التغييرات التي قمت بها قد لا يتم حفظها `,
      icon: "warning",
      iconHtml: "!",
      allowOutsideClick: false,
      confirmButtonText: "نعم",
      cancelButtonText: "لا",
      showCancelButton: true,
      showCloseButton: true,
      allowEscapeKey: true,
      width: "50%",
    }).then((res) => {
      if (res.isConfirmed) {
        value.prevPage();
      }
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsloading(true);
    dispatch(
      getMessages({
        messages: "جــارى إرسال طلبك",
        messageType: "warning",
        messageClick: true,
      })
    );
    const data = {
      code: code,
      mobile: getMobileNumber?.mobile?.split("+").join(""),
    };
    MobileServices._POST_MobileOTP(data)
      .then((res) => {
        dispatch(
          getMessages({
            messages: res.data.message,
            messageType: "success",
            messageClick: true,
          })
        );
        setIsloading(false);
        const nextStepTimeOut = setTimeout(() => {
          value.jumpPage(2);
        }, 1200);
      })
      .catch((err) => {
        const errors = err.response?.data?.message;

        dispatch(
          getMessages({
            messages: errors[Object.keys(errors)[0]],
            messageType: "error",
            messageClick: true,
          })
        );
        setIsloading(false);
      });
  };
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
    navigate("/");
  };

  return (
    <div className="DialogSim">
      <div
        className="LT-login-holder"
        style={
          {
            // width: "30rem",
          }
        }
      >
        <div
          style={{
            width: "8rem",
            alignSelf: "center",
            margin: "1rem auto 2rem auto",
          }}
          className="imLT-main-logo uLT-img-contain one img"
        />
      </div>
      <p className="regiTitle">رمز التحقق</p>
      <div className="d-flex justify-content-center" dir="rtl">
        <form className="LT-RegisterOTP-holder gap-3 ">
          <div className="LT-otp-input">
            <OtpInput
              shouldAutoFocus={true}
              key={"otp"}
              numInputs={4}
              value={code}
              onChange={handleChange}
              placeholder={"____"}
            />
          </div>
          <div className="LT-reSend-code d-flex align-items-center justify-content-start gap-3 three">
            <p className="m-0 fLT-Bold-sm-sA cLT-main-text">لم يصلك الرمز ؟ </p>
            <ReSendOTPComponent mobileNumber={mobileNumber?.mobile} />
          </div>
        </form>
      </div>
      <div className="LT-otp-button px-4 d-flex justify-content-center align-items-center gap-3">
        <ButtonShare
          onClick={(e) => handleSubmit(e)}
          loading={isLoading}
          innerText={"التالي"}
          btnClasses={"cLT-secondary-bg br14"}
          textClasses={"py-2 cLT-white-text fLT-Regular-sB"}
        />
      </div>
      <div
        className="d-md-flex align-items-cente justify-content-center py-3 mt-3 gap-1 bT"
        style={{
          paddingBottom: "3rem",
          width: "85%",
          alignSelf: "center",
          margin: "auto",
        }}
      >
        <p className="m-0 fLT-Bold-sm-sA cLT-main-text"> لديك حساب بالفعل ؟</p>
        {/* <Button onClick={switchSignup} className='px-0'
                            <p className='uLT-list-style fLT-Bold-sm-sA cLT-secondary-text '>إنشاء حساب جديد</p>
                          </Button> */}
        <NavLink
          to={"/login"}
          onClick={handleClose}
          className="uLT-list-style fLT-Bold-sm-sA cLT-secondary-text"
        >
          تسجيل الدخول
        </NavLink>
      </div>
    </div>
  );
};
export default RegisterOTPStep;
