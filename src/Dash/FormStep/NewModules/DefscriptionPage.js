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
    value.jumpPage(value?.accountType?.userKind == "client" ? 5 : 6);
  };
  const getBack = (e) => {
    e.preventDefault();
    value.prevPage();
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
    <div className="DialogSim2">
      <form
        // onSubmit={(e) => getNext(e)}
        className="container px-0 my-4 d-flex flex-column"
        dir="rtl"
        style={{ width: "30rem" }}
      >
        <div>
          <UploadProfileImg
            open={openImage}
            // reset={reset}
            def={getClientData.img}
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
              {value?.accountType?.userKind !== "company" ? (
                <Form.Label className="fLT-Regular-sB cLT-support2-text mb-3 ">
                  اسم الفرد بالكامل
                  <span className="cLT-danger-text">*</span>
                </Form.Label>
              ) : (
                <Form.Label className="fLT-Regular-sB cLT-support2-text mb-3 ">
                  اسم الشركة بالكامل
                  <span className="cLT-danger-text">*</span>
                </Form.Label>
              )}
              <Form.Control
                autoComplete="off"
                maxLength={15}
                minLength={3}
                className="uLT-bd-f-platinum-sA inpBG inp"
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
                الوصف المختصر
              </Form.Label>
              <Form.Control
                name="email"
                className="uLT-bd-f-platinum-sA inpBG inp"
                type="text"
                placeholder="مطور ويب | خبير صيانه"
                value={getClientData.description}
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
                className="uLT-bd-f-platinum-sA inpBG inp"
                type="text"
                as="textarea"
                placeholder=" اكتب نبذة"
                value={getClientData.info}
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
        <div
          style={{ direction: "ltr" }}
          className="d-flex align-items-center justify-content-around gap-4 mb-3"
        >
          <div className="">
            <ButtonShare
              onClick={getNext}
              type={!validation}
              loading={nextLoading}
              innerText={"التـــالى"}
              btnClasses={"cLT-secondary-bg br14"}
              textClasses={" py-1  px-5 cLT-white-text fLT-Regular-sB"}
            />
          </div>
          <div className="">
            <ButtonShare
              onClick={getBack}
              innerText={"رجــــوع"}
              btnClasses={"cLT-secondary-bg br14"}
              textClasses={" py-1  px-5 cLT-white-text fLT-Regular-sB"}
            />
          </div>
        </div>
      </form>
    </div>
  );
};
export default DersciptionPage;
