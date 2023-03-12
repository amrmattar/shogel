import React, { useCallback, useEffect, useState } from "react";
import "./CheckMobile.component.scss";
import { Form, Row } from "react-bootstrap";
import ButtonShare from "../../../../shared/Button/Button.shared";
import ReactPhoneInput from "react-phone-input-2";
import { useDispatch } from "react-redux";
import { getMobileNumber } from "../../../../core/redux/reducers/MobileOTP/MobileOTP.core";
import { checkMobileValidation } from "../../../../core/services/AuthServices/ForgetPasswordServices/CheckMobileCore/CheckMobile.core";
import { getMessages } from "../../../../core/redux/reducers/Messages/Messages.core";
import CountrySelectBox from "../../../../Dash/FormStep/StepComponent/CountrySelectBox";
import { API } from "../../../../enviroment/enviroment/enviroment";
import axios from "axios";

const CheckMobileComponent = ({ nextFn }) => {
  const [allCountrys, setAllCountrys] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [hisCountry, setHisCountry] = useState(null);

  const selectCountry = (country) => {
    setSelectedCountry(country);
  };

  useEffect(() => {
    const getAllCountrys = async () => {
      const { data: countrys } = await API.get("/coredata/nationality/list");
      setAllCountrys(countrys?.data);
    };

    getAllCountrys();
  }, []);

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

  // TODO Function Set Maxlength To Mobile Input
  useEffect(() => {
    const attrTimeOut = setTimeout(() => {
      const giveInputAtrr = document.getElementById("forgetMobile");
      giveInputAtrr.setAttribute("maxLength", 15);
    }, 400);
    return () => clearTimeout(attrTimeOut);
  }, []);
  //TODO Selector To Get Messages
  const dispatch = useDispatch();
  // TODO GET Mobile Number From Child Component
  const [mobileForm, setMobileForm] = useState({ mobile: "" });
  const handleMobileData = useCallback(
    (e) => {
      const { name, value } = e.target;
      setMobileForm((mobileForm) => ({ ...mobileForm, [name]: value }));
    },
    [setMobileForm]
  );

  // TODO Check Mobile Validation Before Post
  const [mobileType, setMobileType] = useState(true);
  const [mobileLoading, setMobileLoading] = useState(false);
  const splitNumber = mobileForm.mobile.split(" ").join("");

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

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      if (!value) {
        setMobileForm((mobileForm) => ({ ...mobileForm, [name]: value }));
      }

      const regex = /^[0-9\b]+$/;
      if (regex.test(value)) {
        setMobileForm((mobileForm) => ({ ...mobileForm, [name]: value }));
      }
    },
    [setMobileForm]
  );

  // TODO POST Mobile Number TO Check
  const CheckMobileSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setMobileLoading(true);

      const country_code = selectedCountry?.code;
      const mobileNumber = splitNumber;
      dispatch(getMobileNumber({ mobile: mobileNumber, country_code }));

      checkMobileValidation
        ._POST_CheckMobileValid({ mobile: mobileNumber, country_code })
        .then((res) => {
          setMobileLoading(false);
          dispatch(
            getMessages({
              messages: res.data.message,
              messageType: "success",
              messageClick: true,
            })
          );
          const forgetTimeOut = setTimeout(() => {
            nextFn();
          }, 300);
          return () => clearTimeout(forgetTimeOut);
        })
        .catch((err) => {
          setMobileLoading(false);
          dispatch(
            getMessages({
              messages: err.response.data.message,
              messageType: "error",
              messageClick: true,
            })
          );
        });
    },
    [dispatch, splitNumber, nextFn, selectedCountry?.code]
  );
  return (
    <div className="d-flex justify-content-center">
      <div className="LT-check-mobile-holder">
        {/* Mobile Number Holder */}
        <Row className="gap-3 two mb-3">
          {/* Mobile Number */}
          <Form.Group md="12" controlId="formGridMobile" className=" ">
            <Form.Label className="fLT-Regular-sB cLT-support2-text mb-3">
              رقم الجوال
            </Form.Label>
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
                value={mobileForm.mobile}
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
          <p className="mb-0 fLT-Regular-sA cLT-support2-text">
            برجاء إدخال رقم الجوال لإرسال رمز التـــأكيد{" "}
          </p>
        </Row>
        <div className="w-100">
          <ButtonShare
            loading={mobileLoading}
            onClick={CheckMobileSubmit}
            type={mobileType}
            innerText={"ارســــــال"}
            btnClasses={"three cLT-secondary-bg"}
            textClasses={"py-2 cLT-white-text fLT-Regular-sB"}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckMobileComponent;
