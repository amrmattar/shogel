/* eslint-disable eqeqeq */
import React, { useContext, useState } from "react";
import { Dialog } from "@mui/material";
import { LabelContext } from "../LabelDataContext/labelDataContext";
import { Form, Row } from "react-bootstrap";
import "../NewStyle.scss";
import { useNavigate } from "react-router-dom";
import ButtonShare from "../../../shared/Button/Button.shared";
import { useDispatch } from "react-redux";
import UploadProfileImg from "../common/UploadProfileImage";

import { RegisterServices } from "../../../core/services/AuthServices/Method_RegisterData/Method_RegisterData.core";
import { toast } from "react-toastify";
import { DriveEtaOutlined } from "@mui/icons-material";

const DersciptionPage = () => {
  const [open, setOpen] = useState(true);
  const value = useContext(LabelContext);
  const getClientData = value.labelInfo.clientView;

  const validation = () => {
    return (
      getClientData.fullName.length >= 3 &&
      getClientData.info.length >= 10 &&
      getClientData.info.length <= 10000 &&
      getClientData.description.length <= 35
    );
  };

  const dispatch = useDispatch();

  // TODO Data from Reducers
  const navigate = useNavigate();
  const [openImage, setOpenImage] = useState(true);
  const [isAboutMe, setIsAboutMe] = useState(false);

  const getNext = (e) => {
    e.preventDefault();

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

  const imgHandler = (e) => {
    value.setImg({ prop: "img", e: e });
  };

  return (
    <div className="DialogSim2 handelCardSize">
      <form
        // onSubmit={(e) => getNext(e)}
        className="container px-0 my-4 d-flex flex-column"
        dir="rtl"
        style={{ maxWidth: "30rem" }}
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
        <div style={{ paddingTop: "0" }} className="LT-login-holder p-0">
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

          <Row className="mb-4 gap-3 two row w-100-in-phone">
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
                maxLength={25}
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
                maxLength={35}

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
                <span className="cLT-danger-text">*</span>
              </Form.Label>
              <Form.Control
                name="description"
                className="uLT-bd-f-platinum-sA inpBG inp"
                type="text"
                as="textarea"
                placeholder=" اكتب نبذة"
                value={getClientData.info}
                onChange={value.setDataDetails("info")}
                minLength={10}
                maxLength={10000}

                // value={getClientData.brief}
              />
              {/* {messages?.messages?.username && (
                  <p className="mb-0 fLT-Regular-sA cLT-danger-text pt-2 px-2">
                    {messages?.messages?.username}
                  </p>
                )} */}
            </Form.Group>

            <div
              className={`d-flex align-items-center justify-content-around gap-2 mb-3 w-100-in-phone p-0`}
            >
              <div>
                <ButtonShare
                  type={!validation()}
                  onClick={getNext}
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
export default DersciptionPage;
