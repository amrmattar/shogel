import React, { useContext, useEffect, useState } from "react";
import { Button, ButtonGroup, Dialog } from "@mui/material";
import { LabelContext } from "../LabelDataContext/labelDataContext";
import { Col, Form, Row } from "react-bootstrap";
import "../NewStyle.scss";
import { NavLink, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import ButtonShare from "../../../shared/Button/Button.shared";
import { RegisterServices } from "../../../core/services/AuthServices/Method_RegisterData/Method_RegisterData.core";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "../../../core/redux/reducers/Messages/Messages.core";
const RegisterClientView = (props) => {
  const value = useContext(LabelContext);
  const getClientData = value.labelInfo.clientView;
  const hideIcon = getClientData.password.length > 0;
  const validation =
    getClientData.username.length > 3 &&
    getClientData.email.length > 7 &&
    getClientData.password.length >= 8;
  const dispatch = useDispatch();
  //TODO Data from Reducers
  const navigate = useNavigate();

  const messages = useSelector((state) => state.messages);
  const [showPassword, setShowPassword] = useState(false);
  const [nextLoading, setNextLoadiing] = useState(false);
  const getNext = (e) => {
    e.preventDefault();
    setNextLoadiing(true);
    // const data = {
    //   username: value.labelInfo.clientView.username,
    //   email: value.labelInfo.clientView.email,
    // };
    // RegisterServices.POST_RegisterData(data)
    //   .then((res) => {
    //     setNextLoadiing(false);
    //   })
    //   .catch((err) => {
    //     dispatch(
    //       getMessages({
    //         messages: err.response.data.message,
    //         messageType: "error",
    //         messageClick: true,
    //       })
    //     );
    //     if (
    //       err.response.data.message.email ||
    //       err.response.data.message.username
    //     ) {
    //       setNextLoadiing(false);
    //     } else {
    //       setNextLoadiing(false);
    //       value.jumpPage(4);
    //     }
    //   });
    value.jumpPage(5);
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
    <Dialog
      aria-labelledby="simple-dialog-title1"
      open={open ? open : false}
      onClose={handleClose}
    >
      <form
        onSubmit={(e) => getNext(e)}
        className="container px-0 my-4 d-flex flex-column gap-4"
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
                required
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
        <div className="d-flex align-items-center justify-content-around gap-4">
          <div className="">
            <ButtonShare
              type={!validation}
              loading={nextLoading}
              innerText={"التـــالى"}
              btnClasses={"cLT-secondary-bg br14"}
              textClasses={"py-3 px-5 cLT-white-text fLT-Regular-sB"}
            />
          </div>
          <div className="">
            <ButtonShare
              onClick={() => getBack()}
              innerText={"رجــــوع"}
              btnClasses={"cLT-secondary-bg br14"}
              textClasses={"py-3 px-5 cLT-white-text fLT-Regular-sB"}
            />
          </div>
        </div>
      </form>
      {/* <form onSubmit={(e) => getNext(e)} className='container px-0 my-4 d-flex flex-column gap-4' dir="rtl">
        <Form.Group as={Col}  controlId="formGridUserName" className='px-0'>
        <Form.Label className='fLT-Regular-sB cLT-support2-text mb-3'> اسم المستخدم <span className='cLT-danger-text'>*</span> </Form.Label>
        <Form.Control value={getClientData.username.replace(/[^A-Za-z0-9]/ig, "")} name="username" onChange={value.setDataDetails('username')}
          className='uLT-bd-f-platinum-sA uLT-f-radius-sB cLT-main-text fLT-Regular-sB p-3' type='text' placeholder="اسم المستخدم"
          
          maxLength={15}
          minLength={3}
          />
       {messages?.messages?.username && <p className='mb-0 fLT-Regular-sA cLT-danger-text pt-2 px-2'>{messages?.messages?.username}</p>}
      </Form.Group>
      <div className="d-flex gap-3 ps-0 ps-md-3 pe-0 mx-0 flex-column flex-md-row">
  
        <Form.Group as={Col} sm={12} md={6} controlId="formGridEmail" className='px-0  '>
          <Form.Label className='fLT-Regular-sB cLT-support2-text mb-3'>البريد الإلكتروني <span className='cLT-danger-text'>*</span></Form.Label>
          <Form.Control name="email" required className='uLT-bd-f-platinum-sA uLT-f-radius-sB cLT-main-text fLT-Regular-sB p-3' type="email" placeholder="البريد الإلكتروني"
            onChange={value.setDataDetails('email')}
            pattern="[-a-zA-Z0-9~!$%^&amp;*_=+}{'?]+(\.[-a-zA-Z0-9~!$%^&amp;*_=+}{'?]+)*@([a-zA-Z0-9_][-a-zA-Z0-9_]*(\.[-a-zA-Z0-9_]+)*\.([cC][oO][mM]))(:[0-9]{1,5})?"
            value={getClientData.email}
          />
           {messages?.messages?.email && <p className='mb-0 fLT-Regular-sA cLT-danger-text pt-2 px-2'>{messages?.messages?.email}</p>}
        </Form.Group>
        <Form.Group as={Col} sm={12} md={6} controlId="formGridPassword" className='position-relative px-0' >
          <Form.Label className='fLT-Regular-sB cLT-support2-text mb-3'>كلمة المرور <span className='cLT-danger-text'>*</span></Form.Label>
          <Form.Control name="password"
            onChange={value.setDataDetails('password')}
            value={getClientData.password}
            required={true}
            className='uLT-bd-f-platinum-sA uLT-f-radius-sB p-3 position-relative' type={showPassword ? "text" : "password"} placeholder="كلمة المرور" />
          {hideIcon &&
            <IconButton style={{ position: 'absolute', top: '50px', left: '8px' }} onClick={() => setShowPassword((prevState) => !prevState)}>{showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />} </IconButton>
          }
        </Form.Group>
      </div>
      <div className="d-flex align-items-center justify-content-between gap-4">
        <div className="">
          <ButtonShare type={!validation} loading={nextLoading} innerText={'التـــالى'} btnClasses={'three cLT-secondary-bg'} textClasses={'py-1 px-4 cLT-white-text fLT-Regular-sB'} />
        </div>
        <div className="">
          <ButtonShare onClick={() => getBack()} innerText={'رجــــوع'} btnClasses={'three cLT-secondary-bg'} textClasses={'py-1 px-4 cLT-white-text fLT-Regular-sB'} />
        </div>
      </div>
    </form> */}
    </Dialog>
  );
};
export default RegisterClientView;
