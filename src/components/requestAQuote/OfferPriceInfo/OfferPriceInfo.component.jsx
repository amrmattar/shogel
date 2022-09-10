import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import ButtonShare from "../../../shared/Button/Button.shared";
import TextEditorShared from "../../../shared/TextEditor/TextEditor.shared";
import { Col, Form, Row } from "react-bootstrap";
import UserFeedBackShared from "../../../shared/UserFeedBack/UserFeedBack.shared";
import AuthComponent from "../../auth/Auth.component";
import cls from"./OfferPriceInfo.component.module.scss";
const OfferPriceInfo = ({ data }) => {
  const [checkLogin, messages] = useSelector((state) => [
    state.authentication.loggedIn,
    state.messages,
  ]);
  const location = useLocation();
  const [nextClick, setNextClick] = useState(false);
  const [taskFormData, setTaskFormData] = useState({
    title: "",
    description: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskFormData((taskFormData) => ({ ...taskFormData, [name]: value }));
  };

  const maxLengthCharacter = 5000;
  const [content, setContent] = useState("");
  const [getDescriptionLength, setGetDescriptionLength] = useState(0);
  const handleClick = () => {
    const formData = {
      title: taskFormData.title,
      description: content?.value,
    };
    localStorage.setItem("TD", JSON.stringify(formData));
  };
  useEffect(() => {
    location.pathname === "/" && localStorage.removeItem("TD");
  }, [location.pathname]);

  const [sectionTwoData, setSectionTwoData] = useState({
    title: "",
    decription: "",
  });
  const handleSectionOne = useCallback(() => {
    data?.map((homeData) => {
      if (homeData?.section === "2") {
        switch (homeData?.key) {
          case "home_section_2_title":
            return setSectionTwoData((sectionTwoData) => ({
              ...sectionTwoData,
              title: homeData.value,
            }));
          case "home_section_2_description":
            return setSectionTwoData((sectionTwoData) => ({
              ...sectionTwoData,
              decription: homeData.value,
            }));
          default:
            return false;
        }
      }
    });
  }, [data]);
  useEffect(() => {
    let cancel = false;
    if (cancel) return;
    handleSectionOne();
    return () => {
      cancel = true;
    };
  }, [handleSectionOne]);
  console.log(sectionTwoData);
  return (
    <>
      <UserFeedBackShared
        message={messages.messages}
        type={messages?.messageType}
        clickMe={messages?.messageClick}
      />
      <div className="row m-0 p-0 d-flex justify-content-center align-items-center p-3">
        {/* Offer Price [Title] */}
        <div className="col-12 text-center px-0 pb-4">
          <p
            className={cls.title}
            dangerouslySetInnerHTML={{ __html: sectionTwoData?.title }}
          ></p>
          <i className="iLT-offerPrice-one-line iLT-sD uLT-img-contain p-4"></i>
        </div>
        {/* Offer Price [Sub Title Content] */}
        <div className="col-12 col-lg-6 px-0 d-flex flex-column justify-content-center align-items-start gap-3 py-3 ps-md-4">
          <p className={cls.title1}>معلومات</p>
          <p className={cls.title2}>طلب عرض سعر</p>
          <i className="iLT-contacUs-two-line iLT-sD uLT-img-contain py-4 px-5"></i>

          <p className={cls.title3}>
            لتبسيط نجاحك في العمل والحياة الأفضل لكل ميزانية ابحث عن خدمات عالية
            الجودة في كل نقطة سعر. لا توجد أسعار بالساعة ، فقط تسعير قائم على
            المشروع. جودة العمل تتم بسرعة ابحث عن المستقل المناسب لبدء العمل على
            مشروعك في غضون دقائق بحث عن المستقل المناسب لبدء العمل على مشروعك في
            غضون دقائق عرف دائمًا ما ستدفعه مقدمًا. لن يتم تحرير دفعتك حتى توافق
            على العمل
          </p>
        </div>
        {/* Offer Price Info [Holder] */}
        <div className="col-12 col-lg-6 d-flex flex-column justify-content-center cLT-secondary-opacity-3 uLT-f-radius-sB p-3 p-md-4">
          {/* Offer Price Address Info */}
          <div className="mb-3">
            <label className="form-label fLT-Bold-sA cLT-main-text">
              عنوان الطلب
            </label>
            <input
              type="email"
              name={"title"}
              onChange={handleChange}
              className="form-control uLT-f-radius-sB"
              placeholder="علي سبيل المثال , ببناء موقع علي شبكة الانترنت"
            />
          </div>
          {/* Offer Price TextArea */}
          {/* Details Request [Section] */}
          <div className="LT-details-request position-relative mb-3">
            <Form.Label className="form-label fLT-Bold-sA cLT-main-text mb-3">
              {" "}
              اكتب تفاصيل الطلب
            </Form.Label>
            <div style={{ background: "#fff" }}>
              <TextEditorShared
                setDescription={setContent}
                setMaxLength={setGetDescriptionLength}
                characterLength={maxLengthCharacter}
              />
            </div>
            <div className="text-start w-100 cLT-smoke-text">
              {getDescriptionLength} / {maxLengthCharacter}
            </div>
          </div>
          {/* Offer Price Next Button */}
          {checkLogin ? (
            <NavLink to="/offer-price">
              <div className="d-flex justify-content-end align-items-center w-100">
                <div className="shadow uLT-f-radius-sB">
                  <ButtonShare
                    onClick={handleClick}
                    btnClasses="cLT-secondary-bg px-4 py-3 uLT-f-radius-sB"
                    textClasses="px-4 cLT-white-text fLT-Regular-sB"
                    innerText="التالي"
                  />
                </div>
              </div>
            </NavLink>
          ) : (
            <>
              <div className="d-flex justify-content-end align-items-center w-100">
                <div className="shadow uLT-f-radius-sB">
                  <ButtonShare
                    onClick={() => setNextClick(!nextClick)}
                    btnClasses="cLT-secondary-bg px-4 py-3 uLT-f-radius-sB"
                    textClasses="px-4 cLT-white-text fLT-Regular-sB"
                    innerText="التالي"
                  />
                </div>
              </div>
              <div className="d-none">
                <AuthComponent clickMe={nextClick} clickStatus={nextClick} />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default OfferPriceInfo;
