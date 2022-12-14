import React, { useCallback, useEffect, useState } from "react";
import { Form, Row } from "react-bootstrap";
import ReactPhoneInput from "react-phone-input-2";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "../../../../core/redux/reducers/Messages/Messages.core";
import { getMobileNumber } from "../../../../core/redux/reducers/MobileOTP/MobileOTP.core";
import { MobileServices } from "../../../../core/services/AuthServices/Method_MobileValidation/Method_MobileValidation.core";
import ButtonShare from "../../../../shared/Button/Button.shared";
import { useNavigate } from "react-router-dom";

const RegistrationMobileComponent = ({ nextFn }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [messages] = useSelector((state) => [state.messages]);
  // TODO Function Set Maxlength To Mobile Input
  useEffect(() => {
    const attrTimeOut = setTimeout(() => {
      const mobileInput = document.getElementById("mobileNumber");
      mobileInput.focus();
      mobileInput.setAttribute("maxLength", 14);
    }, 400);
    return () => clearTimeout(attrTimeOut);
  }, []);

  // Set Send Button Status To Disable Or Not
  const [mobileType, setMobileType] = useState(true);
  // TODO GET Mobile Number From Child Component
  const [mobileForm, setMobileForm] = useState({ mobile: "" });
  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setMobileForm((mobileForm) => ({ ...mobileForm, [name]: value }));
    },
    [setMobileForm]
  );
  // TODO Check Mobile Validation Before Post
  const activeMobileSend = useCallback(() => {
    mobileForm.mobile.split(" ").join("").length <= 12
      ? setMobileType(true)
      : setMobileType(false);
  }, [mobileForm, setMobileType]);
  useEffect(() => {
    const mobileTimeOut = setTimeout(() => {
      activeMobileSend();
    }, 200);
    return () => clearTimeout(mobileTimeOut);
  }, [activeMobileSend, setMobileForm]);

  const [isLoading, setIsLoading] = useState(false);
  // TODO Post Mobile Number To API
  const handleMobileSubmit = useCallback(
    (e) => {
      setIsLoading(true);
      dispatch(getMobileNumber(mobileForm?.mobile.split(" ").join("")));
      MobileServices._POST_MobileNumber({
        mobile: mobileForm?.mobile.split(" ").join(""),
      })
        .then((res) => {
          dispatch(
            getMessages({
              messages: res.data.message,
              messageType: "success",
              messageClick: true,
            })
          );
          setIsLoading(false);
          nextFn();
        })
        .catch((err) => {
          dispatch(
            getMessages({
              messages: err.response.data.message,
              messageType: "error",
              messageClick: true,
            })
          );
          setIsLoading(false);
        });
    },
    [dispatch, mobileForm, messages, nextFn]
  );

  // TODO POST Mobile Number TO Check
  function handleEnterKey(e) {
    e.preventDefault();
    if (e.key === "Enter") {
      handleMobileSubmit();
    }
  }
  return (
    <div className="d-flex justify-content-center">
      <div className="LT-check-mobile-holder">
        <div className="imLT-main-logo uLT-img-contain my-3 w-100 one"> </div>
        <Row className="gap-3 two">
          {/* Mobile Number */}
          <Form.Group md="12" controlId="formGridMobile" className=" ">
            <Form.Label className="fLT-Regular-sB cLT-support2-text mb-3">
              رقم الجوال
            </Form.Label>
            <div dir="ltr" onChange={handleChange}>
              <ReactPhoneInput
                onEnterKeyPress={(e) => handleEnterKey(e)}
                inputProps={{ name: "mobile", id: "mobileNumber" }}
                countryCodeEditable={false}
                placeholder="0000"
                country={"sa"}
                onlyCountries={["sa"]}
                masks={{ sa: "........." }}
              />
            </div>
          </Form.Group>
          <p className="mb-0 fLT-Regular-sA cLT-support2-text">
            برجاء إدخال رقم الجوال لإرسال رمز التأكيد
          </p>
        </Row>
        <div className="three">
          <ButtonShare
            onClick={handleMobileSubmit}
            loading={isLoading}
            innerText={"ارســــــال"}
            btnClasses={"three cLT-secondary-bg"}
            textClasses={"py-2 cLT-white-text fLT-Regular-sB"}
            type={mobileType}
          />
        </div>
      </div>
    </div>
  );
};

export default RegistrationMobileComponent;
