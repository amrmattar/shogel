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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
const IdPage = () => {
  const [open, setOpen] = useState(true);
  const value = useContext(LabelContext);
  const getClientData = value.labelInfo.clientView;
  const hideIcon = getClientData.password.length > 0;
  const validation = getClientData.username.length > 3;
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
    value.jumpPage(8);
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
              <p className="regiTitle"> معلومات الفرد </p>
            </div>

            <Row className="mb-4 gap-3 two row">
              <Form.Group>
                <Form.Label className="fLT-Regular-sB cLT-support2-text mb-3 ">
                  الجنسية<span className="cLT-danger-text">*</span>
                </Form.Label>
                <Form.Control
                  autoComplete="off"
                  maxLength={15}
                  minLength={3}
                  className="uLT-bd-f-platinum-sA inpBG inp"
                  type="text"
                  onChange={value.setDataDetails("username")}
                  placeholder=" سعودي"
                />
                {/* {messages?.messages?.username && (
                  <p className="mb-0 fLT-Regular-sA cLT-danger-text pt-2 px-2">
                    {messages?.messages?.username}
                  </p>
                )} */}
              </Form.Group>
              <Form.Group>
                <Form.Label className="fLT-Regular-sB cLT-support2-text mb-3 ">
                  رقم الهوية
                </Form.Label>
                <Form.Control
                  name="id"
                  required
                  className="uLT-bd-f-platinum-sA inpBG inp"
                  type="number"
                  placeholder="ادخل رقم الهوية "
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
                  صور الاعمال والشهادات
                </Form.Label>
                <Form.Control
                  name="description"
                  required
                  className="uLT-bd-f-platinum-sA inpBG inp"
                  type="text"
                  placeholder="  "
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
            <FormControl>
              <FormLabel
                style={{
                  color: "black",
                  fontSize: "1.4rem",
                  margin: "0 1rem 0 0",
                }}
                id="demo-row-radio-buttons-group-label"
              >
                النوع
              </FormLabel>
              <RadioGroup
                defaultValue="ذكر"
                style={{ gap: "5rem" }}
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="ذكر"
                  control={<Radio style={{ color: "#1EAAAD" }} />}
                  label="ذكر"
                />
                <FormControlLabel
                  value="انثي"
                  control={<Radio style={{ color: "#1EAAAD" }} />}
                  label="انثي"
                />
              </RadioGroup>
            </FormControl>
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
export default IdPage;
