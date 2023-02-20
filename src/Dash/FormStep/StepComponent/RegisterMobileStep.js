/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { getMobileNumber } from "../../../core/redux/reducers/MobileOTP/MobileOTP.core";
import { getMessages } from "../../../core/redux/reducers/Messages/Messages.core";
import { MobileServices } from "../../../core/services/AuthServices/Method_MobileValidation/Method_MobileValidation.core";
import { Form, Row } from "react-bootstrap";
import ReactPhoneInput from "react-phone-input-2";
import ButtonShare from "../../../shared/Button/Button.shared";
import { LabelContext } from "../LabelDataContext/labelDataContext";
import UserFeedBackShared from "../../../shared/UserFeedBack/UserFeedBack.shared";
import cls from "./RegisterMobile.module.scss";
import { API } from "../../../enviroment/enviroment/enviroment";
import axios from "axios";

import CountrySelectBox from "./CountrySelectBox";

const RegisterMobileStep = () => {
  const value = useContext(LabelContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [messages] = useSelector((state) => [state.messages]);

  const [hisCountry, setHisCountry] = useState(null);
  const [allCountrys, setAllCountrys] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState(null);

  const selectCountry = (country) => {
    setSelectedCountry(country);
  };

  // get his country
  useEffect(() => {
    const getHisCountry = async () => {
      const getCoords = async () => {
        const pos = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        return {
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        };
      };

      getCoords().then(async ({ lat, lon }) => {
        const hisCountryUri = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&language=ar&key=AIzaSyAeMiz0Z5VKOjU4TUxh-2RgZt7PnWQXxoQ`;

        const { data: hisDataCountry } = await axios(hisCountryUri);

        let country = "sa";

        if (hisDataCountry?.status == "OK") {
          if (hisDataCountry?.results[1]) {
            //find country name
            for (
              var i = 0;
              i < hisDataCountry?.results[0].address_components.length;
              i++
            ) {
              for (
                var b = 0;
                b <
                hisDataCountry?.results[0].address_components[i].types.length;
                b++
              ) {
                if (
                  hisDataCountry?.results[0].address_components[i].types[b] ==
                  "country"
                ) {
                  //this is the object you are looking for
                  country =
                    hisDataCountry?.results[0].address_components[i]?.long_name;
                  break;
                }
              }
            }

            // set country code
            setHisCountry(country);
          }
        }
      });
    };

    getHisCountry();
  }, []);

  useEffect(() => {
    const getAllCountrys = async () => {
      const { data: countrys } = await API.get("/coredata/nationality/list");
      setAllCountrys(countrys?.data);
    };

    getAllCountrys();
  }, []);

  const countrys = useMemo(
    () => [
      "sa",
      "ae",
      "kw",
      "om",
      "qa",
      "bh",
      "eg",
      "sd",
      "iq",
      "ma",
      "jo",
      "ye",
      "tn",
      "dj",
      "sy",
      "ps",
      "lb",
      "dz",
      "ly",
      "mr",
    ],
    []
  );

  const ConvertToArabicNumbers = (num) => {
    const arabicNumbers =
      "\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669";
    return new String(num).replace(/[0123456789]/g, (d) => {
      return arabicNumbers[d];
    });
  };

  const [arabicNumber, setArabicNumber] = useState({
    number: 0,
    converted: ConvertToArabicNumbers(""),
  });

  // Set Send Button Status To Disable Or Not
  const [mobileType, setMobileType] = useState(true);
  // TODO GET Mobile Number From Child Component
  const [mobileForm, setMobileForm] = useState({ mobile: "" });
  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setMobileForm((mobileForm) => ({ ...mobileForm, [name]: value }));
    },
    [setMobileForm]
  );

  // TODO Check Mobile Validation Before Post
  const activeMobileSend = useCallback(() => {
    mobileForm.mobile?.length <= 5 ? setMobileType(true) : setMobileType(false);
  }, [mobileForm, setMobileType]);

  useEffect(() => {
    const mobileTimeOut = setTimeout(() => {
      activeMobileSend();
    }, 200);

    return () => clearTimeout(mobileTimeOut);
  }, [activeMobileSend, setMobileForm]);

  const [isLoading, setIsLoading] = useState(false);
  // TODO Post Mobile Number To API
  const handleMobileSubmit = useCallback(
    (e) => {
      dispatch(
        getMessages({
          messages: "جــارى ارسال رقم الجوال",
          messageType: "warning",
          messageClick: true,
        })
      );
      setIsLoading(true);

      const mobileNumber = mobileForm?.mobile;
      const country_code = selectedCountry?.code;
      console.log(country_code);
      dispatch(getMobileNumber(`${country_code}${mobileNumber}`));

      MobileServices._POST_MobileNumber({
        mobile: mobileNumber,
        country_code,
      })
        .then((res) => {
          dispatch(
            getMessages({
              messages: res.data.message,
              messageType: "success",
              messageClick: true,
            })
          );
          setIsLoading(false);
          const nextStepTimeOut = setTimeout(() => {
            value.jumpPage(1);
          }, 1200);
          return () => clearTimeout(nextStepTimeOut);
        })
        .catch((err) => {
          dispatch(
            getMessages({
              messages: err.response.data.message,
              messageType: "error",
              messageClick: true,
            })
          );
          setIsLoading(false);
        });
    },
    [dispatch, mobileForm, messages, selectedCountry?.code]
  );

  // TODO POST Mobile Number TO Check
  const handleEnterKey = (e) => {
    e.preventDefault();

    if (e.key === "Enter") {
      handleMobileSubmit();
    }
  };

  const [open, setOpen] = useState(true);
  const [check, setCheck] = useState(false);

  const handleClose = () => {
    setOpen(false);
    navigate("/");
  };

  return (
    <div className={cls.mobileHolder}>
      <UserFeedBackShared
        message={messages.messages}
        type={messages?.messageType}
        clickMe={messages?.messageClick}
      />

      <div className="LT-login-holder">
        <div
          style={{
            width: "8rem",
            alignSelf: "center",
            margin: "1rem auto 2rem auto",
          }}
          className="imLT-main-logo uLT-img-contain one img"
        />
      </div>
      <p className="regiTitle">إنشاء حساب</p>
      <div className="d-flex justify-content-center pop-width">
        <div className="LT-check-mobile-holder">
          <Row className="gap-3 two">
            {/* Mobile Number */}
            <Form.Group md="12" controlId="formGridMobile" className=" ">
              <Form.Label className="fLT-Regular-sB cLT-support2-text mb-3 text-end text-md-center d-block">
                رقم الجوال
              </Form.Label>
              {/* <div dir="ltr" onChange={handleChange}>
                <ReactPhoneInput
                  disabled={!hisCountry}
                  autoFormat={true}
                  inputClass="fLT-Regular-sB"
                  onEnterKeyPress={(e) => handleEnterKey(e)}
                  inputProps={{
                    name: "mobile",
                    id: "mobileNumber",
                  }}
                  countryCodeEditable={true}
                  placeholder="0000"
                  country={hisCountry}
                  onlyCountries={countrys}
                />
              </div> */}

              <div className="d-flex" dir="ltr">
                <article className="me-1" style={{ width: "30%" }}>
                  <CountrySelectBox
                    selectedCountry={selectedCountry}
                    selectCountry={selectCountry}
                    allCountrys={allCountrys}
                    hisCountry={hisCountry}
                  />
                </article>

                <input
                  disabled={!allCountrys?.length}
                  onChange={handleChange}
                  name="mobile"
                  maxLength={25}
                  className="border rounded-3 py-2 px-3"
                  style={{
                    backgroundColor: "#f8fafc",
                    width: "70%",
                  }}
                />
              </div>
            </Form.Group>
            <p className="mb-0 fLT-Regular-sA text-end cLT-support2-text">
              {" "}
              برجاء إدخال رقم الجوال لإرسال رمز التأكيد
            </p>
          </Row>

          <div className="label d-flex align-items-center">
            <label className={cls.label}>
              <input
                id="acceptTerms"
                checked={check}
                type="checkbox"
                className="green-check"
                name="radio-button"
                onChange={() => setCheck(!check)}
                style={{ width: "24px", height: "24px" }}
              />
              <p className="mb-0  LT-agree-condition cLT-support2-text termsText">
                اوافق علي
              </p>
            </label>

            <Link className="text-decoration-none" to="/policies">
              <span>الشروط والاحكام</span>
            </Link>
          </div>

          <div className="three" dir="">
            <ButtonShare
              onClick={handleMobileSubmit}
              loading={isLoading}
              innerText={"ارســــــال"}
              btnClasses={"cLT-secondary-bg br14"}
              textClasses={"py-2 cLT-white-text fLT-Regular-sB"}
              type={!check || mobileType}
            />
          </div>
        </div>
      </div>
      <div
        className="d-md-flex align-items-cente justify-content-center py-3 mt-3 gap-1 bT"
        style={{
          paddingBottom: "3rem",
          width: "90%",
          alignSelf: "center",
          margin: "auto",
        }}
      >
        <p className="m-0 fLT-Bold-sm-sA cLT-main-text"> لديك حساب بالفعل ؟</p>
        {/* <Button onClick={switchSignup} className='px-0'
                            <p className='uLT-list-style fLT-Bold-sm-sA cLT-secondary-text '>إنشاء حساب جديد</p>
                        </Button> */}
        <NavLink
          to={"/login"}
          onClick={handleClose}
          className="uLT-list-style fLT-Bold-sm-sA cLT-secondary-text"
        >
          تسجيل الدخول
        </NavLink>
      </div>
    </div>
  );
};
export default RegisterMobileStep;
