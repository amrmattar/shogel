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

const DersciptionPage = () => {
  const [open, setOpen] = useState(true);
  const value = useContext(LabelContext);
  const getClientData = value.labelInfo.clientView;
  const hideIcon = getClientData.password.length > 0;
  const validation =
    getClientData.username.length > 3
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
    value.jumpPage(7);
  };
  const getBack = () => {
    value.prevPage();
  };
  const handleClose = () => {
    setOpen(false);
    navigate("/");
  };
  return (
    <div>
      <Dialog
        aria-labelledby="simple-dialog-title1"
        open={open ? open : false}
        onClose={handleClose}
      >
        <form
          // onSubmit={(e) => getNext(e)}
          className="container px-0 my-4 d-flex flex-column gap-4"
          dir="rtl"
          style={{ width: "30rem" }}
        >
          <div className="LT-login-holder">
            <div
              style={{ textAlign: "center" }}
              className=" LT-account-logo d-flex flex-column p-3"
            >
              <p className="regiTitle">الاسم بالكامل </p>
              <p className="mt-3 fLT-Regular-sB cLT-main-text">
                {" "}
                من فضلك استخدم اسمك الحقيقي
              </p>
            </div>

            <Row className="mb-4 gap-3 two row">
              <Form.Group>
                <Form.Label className="fLT-Regular-sB cLT-support2-text mb-3 ">
                  اسم الفرد<span className="cLT-danger-text">*</span>
                </Form.Label>
                <Form.Control
                  autoComplete="off"
                  maxLength={15}
                  minLength={3}
                  className="uLT-bd-f-platinum-sA inpBG inp"
                  type="text"
                  onChange={value.setDataDetails("username")}
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
                  الوصف المختصر
                </Form.Label>
                <Form.Control
                  name="email"
                  required
                  className="uLT-bd-f-platinum-sA inpBG inp"
                  type="text"
                  placeholder="وصف مختصر"
                  //   onChange={value.setDataDetails("email")}

                  //   value={getClientData.email}
                />
                {/* {messages?.messages?.username && (
                  <p className="mb-0 fLT-Regular-sA cLT-danger-text pt-2 px-2">
                    {messages?.messages?.username}
                  </p>
                )} */}
              </Form.Group>
              <Form.Group>
                <Form.Label className="fLT-Regular-sB cLT-support2-text mb-3 ">
                  نبذة عني
                </Form.Label>
                <Form.Control
                  name="description"
                  required
                  className="uLT-bd-f-platinum-sA inpBG inp"
                  type="text"
                  placeholder=" اكتب نبذة"
                  //   onChange={value.setDataDetails("email")}

                  //   value={getClientData.email}
                />
                {/* {messages?.messages?.username && (
                  <p className="mb-0 fLT-Regular-sA cLT-danger-text pt-2 px-2">
                    {messages?.messages?.username}
                  </p>
                )} */}
              </Form.Group>
            </Row>
          </div>
          <div className="d-flex align-items-center justify-content-around gap-4">
            <div className="">
              <ButtonShare
                onClick={getNext}
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
      </Dialog>
    </div>
  );
};
export default DersciptionPage;
