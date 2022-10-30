import React, { useCallback, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "../../../../core/redux/reducers/Messages/Messages.core";
import { changePassword } from "../../../../core/services/AuthServices/ForgetPasswordServices/ChangePasswordCore/ChangePassword.core";
import ButtonShare from "../../../../shared/Button/Button.shared";
import AuthComponent from "../../Auth.component";

const ChangePasswordComponent = () => {
  const [getMobile] = useSelector((state) => [state.mobileOTP]);
  const [messages] = useSelector((state) => [state.messages]);
  const dispatch = useDispatch();
  //TODO Get Form Input Value
  const [formLoading, setFormLoading] = useState(false);
  const [formInput, setFormInput] = useState({
    password: "",
    confirmPassword: "",
  });
  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormInput((formInput) => ({ ...formInput, [name]: value }));
    },
    [setFormInput]
  );

  const [nextClick, setNextClick] = useState(false);
  const handleSendForm = () => {
    setFormLoading(true);
    const formdata = {
      mobile: getMobile.mobile,
      password: formInput.password,
      password_confirmation: formInput.confirmPassword,
    };
    changePassword
      ._POST_ChangePassword(formdata)
      .then((res) => {
        dispatch(
          getMessages({
            messages: res.data.message,
            messageType: "success",
            messageClick: true,
          })
        );
        setFormLoading(false);
        setNextClick(!nextClick);
      })
      .catch((err) => {
        dispatch(
          getMessages([
            {
              messages: err.response.data.message.password,
              messageType: "error",
              messageClick: true,
            },
          ])
        );
        setFormLoading(false);
      });
  };
  return (
    <div className="container px-5 d-flex justify-content-center ">
      <Row className=" d-flex align-items-center gap-3 mb-3">
        {/* Job Title & Nationality [Holder] */}
        {/* Password Title */}
        <Form.Group
          as={Col}
          md={12}
          controlId="formGridPassword"
          className="position-relative"
        >
          {/* Password Title [Label] */}
          <Form.Label className="fLT-Regular-sB cLT-support2-text mb-3">
            كلمة المرور <span className="cLT-danger-text">*</span>
          </Form.Label>
          {/* Password Title [Input] */}
          <Form.Control
            value={formInput.password}
            name="password"
            onChange={(e) => handleInputChange(e)}
            className="uLT-bd-f-platinum-sA uLT-f-radius-sB"
            type="password"
            placeholder="0000"
          />
        </Form.Group>
        <Form.Group
          as={Col}
          md={12}
          controlId="formGridConfirmPassword"
          className="position-relative"
        >
          {/* Password Title [Label] */}
          <Form.Label className="fLT-Regular-sB cLT-support2-text mb-3">
            {" "}
            إعــاده كلمه المرور<span className="cLT-danger-text">*</span>
          </Form.Label>
          {/* Password Title [Input] */}
          <Form.Control
            value={formInput.confirmPassword}
            name="confirmPassword"
            onChange={(e) => handleInputChange(e)}
            className="uLT-bd-f-platinum-sA uLT-f-radius-sB"
            type="password"
            placeholder="0000"
          />
          <p className="text-nowrap mb-0 fLT-Regular-sA cLT-danger-text pt-2 px-2">
            {messages[0]?.messages[0]}
          </p>
        </Form.Group>
        <div className="w-100  ">
          <ButtonShare
            loading={formLoading}
            onClick={handleSendForm}
            innerText={"تغييــــر كلمه المرور"}
            type={
              formInput?.password?.length >= 8 &&
              formInput?.confirmPassword?.length >= 8
                ? ""
                : "disable"
            }
            btnClasses={" cLT-secondary-bg"}
            textClasses={"py-2 cLT-white-text fLT-Regular-sB"}
          />
        </div>
      </Row>
      <div className="d-none">
        <AuthComponent clickMe={nextClick} clickStatus={nextClick} />
      </div>
    </div>
  );
};

export default ChangePasswordComponent;
