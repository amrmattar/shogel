/* eslint-disable eqeqeq */
import React, { useContext, useEffect, useState } from "react";
import { Dialog } from "@mui/material";
import { LabelContext } from "../LabelDataContext/labelDataContext";
import { Col, Form, Row } from "react-bootstrap";
import "../NewStyle.scss";
import { useNavigate } from "react-router-dom";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { API } from "../../../enviroment/enviroment/enviroment";
import ButtonShare from "../../../shared/Button/Button.shared";
import { useSelector } from "react-redux";
import { IconButton } from "@material-ui/core";
import { toast } from "react-toastify";
import { useRef } from "react";

import { RegisterServices } from "../../../core/services/AuthServices/Method_RegisterData/Method_RegisterData.core.jsx";

const RegisterClientView = () => {
  const [showPassword, setShowPassword] = useState(false);
  const value = useContext(LabelContext);
  const getClientData = value.labelInfo.clientView;
  let v1 =
    getClientData.username.length > 3 &&
    getClientData.fullName.length > 3 &&
    getClientData.email.length > 7 &&
    getClientData.password.length >= 8;
  let v2 =
    getClientData.username.length > 3 && getClientData.password.length >= 8;
  const validation = v1;

  const navigate = useNavigate();

  const messages = useSelector((state) => state.messages);
  const getNext = (e) => {
    e.preventDefault();

    value.jumpPage(4);
  };

  const getBack = (e) => {
    e.preventDefault();
    value.prevPage();
  };
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    navigate("/");
  };

  const [emailValid, setEmailValid] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [nameValid, setNameValid] = useState(false);
  const [nameError, setNameError] = useState("");
  const [passError, setPassError] = useState("");

  const checkEmail = async () => {
    try {
      await API.get(`/auth/check/email?email=${getClientData.email}`);

      setEmailValid(true);
      setEmailError("");
    } catch (e) {
      setEmailValid(false);
      setEmailError("الأيميل مستخدم من قبل");
    }
  };

  const checkUserName = async () => {
    try {
      await API.get(`/auth/check/username?username=${getClientData.username}`);
      setNameValid(true);
      setNameError("");
    } catch (e) {
      setNameValid(false);
      setNameError("الأسم مستخدم من قبل");
    }
  };

  const timerRef = useRef();
  useEffect(() => {
    if (validation) {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        checkUserName();
        checkEmail();
      }, 300);
    }
  }, [validation, getClientData]);

  return (
    <div className="DialogSim2 handelCardSize">
      <form
        onSubmit={(e) => getNext(e)}
        className="container px-0 my-4 d-flex flex-column"
        dir="rtl"
        style={{ maxWidth: "30rem" }}
      >
        <div className="LT-login-holder">
          <div className="imLT-main-logo uLT-img-contain one img"> </div>
          <Row className="mb-4 gap-3 two row w-100-in-phone">
            <Form.Group>
              <Form.Label className="fLT-Regular-sB cLT-support2-text mb-3 ">
                اسم الفرد بالكامل
                <span className="cLT-danger-text">*</span>
              </Form.Label>

              <Form.Control
                autoComplete="off"
                maxLength={25}
                minLength={3}
                className="uLT-bd-f-platinum-sA inpBG inp border"
                type="text"
                value={getClientData.fullName}
                onChange={value.setDataDetails("fullName")}
                placeholder="الاسم الاول والاخير"
              />
              {/* {messages?.messages?.username && (
                <p className="mb-0 fLT-Regular-sA cLT-danger-text pt-2 px-2">
                {messages?.messages?.username}
                </p>
                )} */}
            </Form.Group>
            <Form.Group>
              <Form.Label className="fLT-Regular-sB cLT-support2-text mb-3 ">
                اسم المستخدم<span className="cLT-danger-text">*</span>
              </Form.Label>
              <Form.Control
                autoComplete="off"
                maxLength={15}
                minLength={3}
                className="uLT-bd-f-platinum-sA inpBG inp"
                type="text"
                value={getClientData.username.replace(/[^A-Za-z0-9]/gi, "")}
                name="username"
                onChange={value.setDataDetails("username")}
                placeholder="الاسم (يجب ان تكون 4 خانات علي الاقل)"
              />
              {nameError.length > 0 && (
                <p className="mb-0 fLT-Regular-sA cLT-danger-text pt-2 px-2">
                  {nameError}
                </p>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label className="fLT-Regular-sB cLT-support2-text mb-3 ">
                البريد الالكتروني <span className="cLT-danger-text">*</span>
              </Form.Label>
              <Form.Control
                name="email"
                className="uLT-bd-f-platinum-sA inpBG inp"
                type="email"
                placeholder="البريد الإلكتروني"
                onChange={value.setDataDetails("email")}
                pattern="[-a-zA-Z0-9~!$%^&amp;*_=+}{'?]+(\.[-a-zA-Z0-9~!$%^&amp;*_=+}{'?]+)*@([a-zA-Z0-9_][-a-zA-Z0-9_]*(\.[-a-zA-Z0-9_]+)*\.([cCnN][oOeE][mMtT]))(:[0-9]{1,5})?"
                value={getClientData.email}
              />
              {emailError.length > 0 && (
                <p className="mb-0 fLT-Regular-sA cLT-danger-text pt-2 px-2">
                  {emailError}
                </p>
              )}
            </Form.Group>
            <Form.Group as={Col} className={"position-relative"}>
              <Form.Label className="fLT-Regular-sB cLT-support2-text mb-3">
                كلمة المرور
                <span className="cLT-danger-text">*</span>
              </Form.Label>
              <Form.Control
                autoComplete="off"
                minLength={8}
                onChange={value.setDataDetails("password")}
                name="password"
                className="uLT-bd-f-platinum-sA inpBG inp"
                value={getClientData.password}
                type={showPassword ? "text" : "password"}
                placeholder="كلمة المرور (يجب ان تكون 8 خانات علي الاقل)"
              />
              <IconButton
                style={{ position: "absolute", bottom: "0", left: "18px" }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <VisibilityOffOutlinedIcon />
                ) : (
                  <VisibilityOutlinedIcon />
                )}{" "}
              </IconButton>
            </Form.Group>
            {/* {getClientData.password.length < 8 && (
              <p className="mb-0 fLT-Regular-sA cLT-danger-text pt-2 px-2">
                {"كلمة المرور يجب ان تكون 8 خانات علي الاقل"}
              </p>
            )} */}

            <div className="w-100-in-phone p-0 d-flex align-items-center justify-content-around gap-2 mb-3">
              <div>
                <ButtonShare
                  type={!validation || !nameValid || !emailValid}
                  innerText={"التـــالى"}
                  btnClasses={"cLT-secondary-bg br14"}
                  textClasses={"py-1 px-5 cLT-white-text fLT-Regular-sB"}
                />
              </div>
              <div>
                <ButtonShare
                  smBtn
                  onClick={getBack}
                  innerText={"رجــــوع"}
                  btnClasses={"three cLT-secondary-bg"}
                  textClasses={"py-1 px-3 px-md-5 rounded-5"}
                />
              </div>
            </div>
          </Row>
        </div>
      </form>
    </div>
  );
};
export default RegisterClientView;
