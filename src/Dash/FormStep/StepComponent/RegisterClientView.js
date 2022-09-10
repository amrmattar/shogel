import React, { useContext, useState } from "react";
import { Dialog } from "@mui/material";
import { LabelContext } from "../LabelDataContext/labelDataContext";
import { Col, Form, Row } from "react-bootstrap";
import "../NewStyle.scss";
import { useNavigate } from "react-router-dom";
import ButtonShare from "../../../shared/Button/Button.shared";
import { useSelector } from "react-redux";
const RegisterClientView = () => {
  const value = useContext(LabelContext);
  const getClientData = value.labelInfo.clientView;
  let v1 =
    getClientData.username.length > 3 &&
    getClientData.email.length > 7 &&
    getClientData.password.length >= 8;
  let v2 =
    getClientData.username.length > 3 && getClientData.password.length >= 8;
  const validation = v1;

  const navigate = useNavigate();

  const messages = useSelector((state) => state.messages);
  const [nextLoading, setNextLoadiing] = useState(false);
  const getNext = (e) => {
    e.preventDefault();
    setNextLoadiing(true);
    value.jumpPage(4);
  };
  const getBack = () => {
    value.prevPage();
  };
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    navigate("/");
  };
  return (
    <div className="DialogSim2">
      <form
        onSubmit={(e) => getNext(e)}
        className="container px-0 my-4 d-flex flex-column"
        dir="rtl"
        style={{ width: "30rem" }}
      >
        <div className="LT-login-holder">
          <div className="imLT-main-logo uLT-img-contain one img"> </div>
          <Row className="mb-4 gap-3 two row">
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
                placeholder="الاسم"
              />
              {messages?.messages?.username && (
                <p className="mb-0 fLT-Regular-sA cLT-danger-text pt-2 px-2">
                  {messages?.messages?.username}
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
                pattern="[-a-zA-Z0-9~!$%^&amp;*_=+}{'?]+(\.[-a-zA-Z0-9~!$%^&amp;*_=+}{'?]+)*@([a-zA-Z0-9_][-a-zA-Z0-9_]*(\.[-a-zA-Z0-9_]+)*\.([cC][oO][mM]))(:[0-9]{1,5})?"
                value={getClientData.email}
              />
              {messages?.messages?.username && (
                <p className="mb-0 fLT-Regular-sA cLT-danger-text pt-2 px-2">
                  {messages?.messages?.username}
                </p>
              )}
            </Form.Group>
            <Form.Group
              as={Col}
              controlId="formGridPassword"
              className={"position-relative"}
            >
              <Form.Label className="fLT-Regular-sB cLT-support2-text mb-3">
                كلمة المرور<span className="cLT-danger-text">*</span>
              </Form.Label>
              <Form.Control
                autoComplete="off"
                minLength={8}
                onChange={value.setDataDetails("password")}
                value={getClientData.password}
                required={true}
                name="password"
                className="uLT-bd-f-platinum-sA inpBG inp"
                type={"password"}
                placeholder="كلمة المرور"
              />
            </Form.Group>
          </Row>
        </div>
        <div className="d-flex align-items-center justify-content-around gap-4 mb-3">
          <div className="">
            <ButtonShare
              onClick={() => getBack()}
              innerText={"رجــــوع"}
              btnClasses={"cLT-secondary-bg br14"}
              textClasses={" py-1  px-5 cLT-white-text fLT-Regular-sB"}
            />
          </div>
          <div className="">
            <ButtonShare
              type={!validation}
              loading={nextLoading}
              innerText={"التـــالى"}
              btnClasses={"cLT-secondary-bg br14"}
              textClasses={" py-1  px-5 cLT-white-text fLT-Regular-sB"}
            />
          </div>
        </div>
      </form>
    </div>
  );
};
export default RegisterClientView;
