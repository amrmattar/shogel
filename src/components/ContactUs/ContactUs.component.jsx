import "./ContactUs.component.scss";
import { useCallback, useEffect, useRef, useState } from "react";
import ButtonShare from "../../shared/Button/Button.shared";
import ReactPhoneInput from "react-phone-input-2";
import { isPostContactUs } from "../../core/services/ContactUsService/ContactUs.core";
import imgWebp from "../../assets/images/contact-us-image.webp";
import { Col, Form, Row } from "react-bootstrap";
import TextEditorShared from "../../shared/TextEditor/TextEditor.shared";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "../../core/redux/reducers/Messages/Messages.core";
import { useNavigate } from "react-router-dom";

const ContactUs = ({ data }) => {
  const messages = useSelector((state) => state.messages);
  const dispatch = useDispatch();
  const [mobileUpdate, setMobileupdate] = useState(false);

  // TODO Function Set Maxlength To Mobile Input
  useEffect(() => {
    const attrTimeOut = setTimeout(() => {
      const mobileInput = document.getElementById("mobileNumber");
      if (mobileUpdate === false) {
        mobileInput.value = "+966";
      }
      mobileInput.setAttribute("maxLength", 14);
    }, 400);
    return () => clearTimeout(attrTimeOut);
  }, [mobileUpdate]);

  //** Input On Change */
  const [contactForm, setContactForm] = useState({
    email: "",
    name: "",
    category: "",
    message: "التفــاصيل :",
    mobile: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setContactForm((contactForm) => ({ ...contactForm, [name]: value }));
  }

  //? Var State
  const [formMessages, setMessages] = useState();
  const [isLoading, setLoading] = useState(false);
  const [desc, setDesc] = useState("");
  const navigate = useNavigate();
  const inputIsref = useRef();

  //** Send Messages */
  function handleSubmit(e) {
    e.preventDefault();
    const mobileInput = document.getElementById("mobileNumber");
    setLoading(true);
    setMobileupdate(true);
    const mobile = contactForm.mobile.split(" ").splice("+").join("");
    const contactUsData = {
      name: contactForm.name,
      email: contactForm.email,
      mobile: mobile.split("+").join(""),
      subject: contactForm.category,
      description: contactForm.message,
    };
    isPostContactUs
      ._POST_ContactUsForm(contactUsData)
      .then((res) => {
        dispatch(
          getMessages({
            messages: res.data.message,
            messageType: "success",
            messageClick: true,
          })
        );
        setMobileupdate(false);
        setLoading(false);
        setContactForm({ email: "", name: "", category: "", message: "" });
      })
      .catch((err) => {
        dispatch(
          getMessages([
            {
              messages: err.response.data.message,
              messageType: "error",
              messageClick: true,
            },
          ])
        );
        setMessages(err.response.data.message);
        setLoading(false);
      });
  }
  // TODO POST Mobile Number TO Check
  function handleEnterKey(e) {
    e.preventDefault();
    if (e.key === "Enter") {
      handleSubmit();
    }
  }
  const [sectionFiveData, setSectionFiveData] = useState({
    title: "",
    image: "",
  });

  const handleSectionOne = useCallback(() => {
    data?.map((homeData) => {
      if (homeData?.section === "5") {
        switch (homeData?.key) {
          case "home_section_5_title":
            return setSectionFiveData((sectionFiveData) => ({
              ...sectionFiveData,
              title: homeData.value,
            }));
          case "home_section_5_image":
            return setSectionFiveData((sectionFiveData) => ({
              ...sectionFiveData,
              image: homeData.value,
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

  return (
    <>
      <section
        id="contactSec"
        className="row m-0 d-flex justify-content-center w-100 align-items-center"
      >
        {/* Contact Us Image [Holder] */}
        <picture
          className="col-12 col-lg px-0 uLT-f-radius-sB LT-contact-image "
          style={{ width: "529px" }}
        >
          <img
            type="image/webp"
            src={sectionFiveData?.image ? sectionFiveData?.image : imgWebp}
            alt=""
            className="w-100 h-100"
            style={{ aspectRatio: "1/1", borderRadius: "16px" }}
          />
        </picture>
        <section className="col-12 col-lg px-0 px-lg-4 d-flex flex-column justify-content-center ">
          {/* Contact Us Title [Holder] */}
          <section className="col-12 pb-4 text-end px-0 mt-4 mt-lg-0">
            <p className={"homeTilteGreen"}>معلومات</p>
            <p className={"homeTitleBlack"}>نحن نفضل ان نسمع منك؟</p>

            <i className="iLT-contacUs-two-line iLT-sD uLT-img-contain py-4 px-5"></i>
          </section>
          {/* Contact Us Form [Holder] */}
          {/* // TODO Forms [START] */}
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="container px-0 my-4 d-flex flex-column gap-3"
            dir="rtl"
          >
            <div className="d-flex gap-3 ps-0 ps-md-3 pe-0 mx-0 flex-column flex-md-row">
              <Form.Group
                id="contactUsId"
                as={Col}
                md={6}
                controlId="formGridUserName"
                className="px-0"
              >
                <Form.Label className="fLT-Bold-sA cLT-main-text mb-3 text-end w-100">
                  {" "}
                  الاسم{" "}
                </Form.Label>
                <Form.Control
                  value={contactForm.name}
                  name="name"
                  onChange={handleChange}
                  className="uLT-bd-f-platinum-sA uLT-f-radius-sB cLT-main-text fLT-Regular-sB p-3"
                  type="text"
                  placeholder="الاسم"
                  required={true}
                />
                {formMessages?.name && (
                  <p className="mb-0 fLT-Regular-sA cLT-danger-text text-end pt-2 px-2">
                    {formMessages?.name}
                  </p>
                )}
              </Form.Group>
              {/* Email Address */}
              <Form.Group
                as={Col}
                md={6}
                controlId="formGridEmail"
                className="px-0  "
              >
                <Form.Label className="fLT-Bold-sA cLT-main-text mb-3 text-end w-100">
                  الايميل
                </Form.Label>
                <Form.Control
                  name="email"
                  required
                  className="uLT-bd-f-platinum-sA uLT-f-radius-sB cLT-main-text fLT-Regular-sB p-3"
                  type="email"
                  placeholder="الايميل"
                  onChange={handleChange}
                  pattern="[-a-zA-Z0-9~!$%^&amp;*_=+}{'?]+(\.[-a-zA-Z0-9~!$%^&amp;*_=+}{'?]+)*@([a-zA-Z0-9_][-a-zA-Z0-9_]*(\.[-a-zA-Z0-9_]+)*\.([cC][oO][mM]))(:[0-9]{1,5})?"
                  value={contactForm.email}
                />
                {formMessages?.email && (
                  <p className="mb-0 fLT-Regular-sA cLT-danger-text text-end pt-2 px-2">
                    {formMessages?.email}
                  </p>
                )}
              </Form.Group>
            </div>
            <div className="d-flex gap-3 ps-0 ps-md-3 pe-0 mx-0 flex-column flex-md-row">
              {/* Mobile Number */}
              <Form.Group
                as={Col}
                md={6}
                controlId="formGridMobile"
                className=" "
              >
                <Form.Label className="fLT-Bold-sA cLT-main-text mb-3 text-end w-100">
                  رقم الجوال
                </Form.Label>
                <div dir="ltr" onChange={handleChange}>
                  <ReactPhoneInput
                    inputClass="fLT-Regular-sB"
                    onEnterKeyPress={(e) => handleEnterKey(e)}
                    inputProps={{ name: "mobile", id: "mobileNumber" }}
                    countryCodeEditable={false}
                    placeholder="0000"
                    country={"sa"}
                    onlyCountries={["sa"]}
                    masks={{ sa: "........." }}
                  />
                </div>
                {formMessages?.mobile && (
                  <p className="mb-0 fLT-Regular-sA cLT-danger-text text-end pt-2 px-2">
                    {formMessages?.mobile}
                  </p>
                )}
              </Form.Group>
              {/* subject */}
              <Form.Group
                as={Col}
                md={6}
                controlId="formGridSubject"
                className="px-0  "
              >
                <Form.Label className="fLT-Bold-sA cLT-main-text mb-3 text-end w-100">
                  المجال
                </Form.Label>
                <Form.Control
                  name="category"
                  required
                  className="uLT-bd-f-platinum-sA uLT-f-radius-sB cLT-main-text fLT-Regular-sB p-3"
                  type="email"
                  placeholder="المجال"
                  onChange={handleChange}
                  value={contactForm.category}
                />
                {formMessages?.subject && (
                  <p className="mb-0 fLT-Regular-sA cLT-danger-text text-end pt-2 px-2">
                    {formMessages?.subject}
                  </p>
                )}
              </Form.Group>
            </div>

            <Form.Label className="fLT-Bold-sA cLT-main-text mb-3 text-end w-100">
              {" "}
              اكتب تعليقك
            </Form.Label>
            <Row className="bg-light">
              <Form.Group
                as={Col}
                controlId="formGridDescription"
                className=" "
              >
                <textarea
                  name="message"
                  onChange={handleChange}
                  required
                  value={contactForm.message}
                  style={{ resize: "none" }}
                  className="form-control uLT-f-radius-sB uLT-outline-0"
                  rows="6"
                ></textarea>
                {formMessages?.description && (
                  <p className="mb-0 fLT-Regular-sA cLT-danger-text text-end pt-2 px-2 w-100">
                    {formMessages?.description}
                  </p>
                )}
              </Form.Group>
            </Row>
          </form>
          {/* // TODO Forms [END] */}
        </section>
        {/* Send Button */}
        <section className="d-flex justify-content-end align-items-center px-0">
          <div className="uLT-f-radius-sB px-0">
            <ButtonShare
              loading={isLoading}
              onClick={handleSubmit}
              innerText={"ارســــــال"}
              btnClasses={" cLT-secondary-bg"}
              textClasses={"py-2 px-3 cLT-white-text fLT-Regular-sB"}
            />
          </div>
        </section>
      </section>
    </>
  );
};

export default ContactUs;
