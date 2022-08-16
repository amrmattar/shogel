import React, { useContext, useState } from "react";
import { Dialog } from "@mui/material";
import { LabelContext } from "../LabelDataContext/labelDataContext";
import { Form, Row } from "react-bootstrap";
import "../NewStyle.scss";
import { useNavigate } from "react-router-dom";
import ButtonShare from "../../../shared/Button/Button.shared";
import { useDispatch } from "react-redux";
import UploadProfileImg from "../common/UploadProfileImage";

const DersciptionPage = () => {
  const [open, setOpen] = useState(true);
  const value = useContext(LabelContext);
  const getClientData = value.labelInfo.clientView;
  const validation = getClientData.fullName.length > 3;
  const dispatch = useDispatch();
  //TODO Data from Reducers
  const navigate = useNavigate();
  const [nextLoading, setNextLoadiing] = useState(false);
  const getNext = (e) => {
    e.preventDefault();
    setNextLoadiing(true);
    value.jumpPage(value?.accountType?.userKind !== "client" ? 7 : 8);
  };
  const getBack = () => {
    value.jumpPage(value?.accountType?.userKind !== "client" ? 5 : 3);
  };
  const handleClose = () => {
    setOpen(false);
    navigate("/");
  };
  const [openImage, setOpenImage] = useState(true);
  const imgHandler = (e) => {
    value.setImg({ prop: "img", e: e });
  };
  return (
    <div>
      <Dialog
        aria-labelledby="simple-dialog-title1"
        open={open ? open : false}
        // onClose={handleClose}
      >
        <form
          // onSubmit={(e) => getNext(e)}
          className="container px-0 my-4 d-flex flex-column gap-4"
          dir="rtl"
          style={{ width: "30rem" }}
        >
          <div>
            <UploadProfileImg
              open={openImage}
              // reset={reset}
              // def={defimg}
              onClose={() => setOpenImage(false)}
              // upload={setimage}
              upload={imgHandler}
            />
          </div>
          <div style={{ paddingTop: "0" }} className="LT-login-holder">
            <div
              style={{ textAlign: "center" }}
              className=" LT-account-logo d-flex flex-column "
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
                  // value={getClientData.fullName}
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
                  الوصف المختصر
                </Form.Label>
                <Form.Control
                  name="email"
                  required
                  className="uLT-bd-f-platinum-sA inpBG inp"
                  type="text"
                  placeholder="وصف مختصر"
                  onChange={value.setDataDetails("description")}

                  // value={getClientData.shortDesc}
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
                  onChange={value.setDataDetails("info")}

                  // value={getClientData.brief}
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
