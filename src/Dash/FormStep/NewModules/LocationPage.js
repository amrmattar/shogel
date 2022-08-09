import { Button, ButtonGroup, Dialog } from "@mui/material";
import { LabelContext } from "../LabelDataContext/labelDataContext";
import { Col, Form, Row } from "react-bootstrap";
import "../NewStyle.scss";
import { NavLink, useNavigate } from "react-router-dom";
import ButtonShare from "../../../shared/Button/Button.shared";
import { RegisterServices } from "../../../core/services/AuthServices/Method_RegisterData/Method_RegisterData.core";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "../../../core/redux/reducers/Messages/Messages.core";
// import { RegisterServices } from "../../../core/services/AuthServices/Method_RegisterData/Method_RegisterData.core";
// import { getMessages } from "../../../core/redux/reducers/Messages/Messages.core";
import Select from "react-select";
import { useEffect, useContext, useMemo, useRef, useState } from "react";
import { userOfferPrice } from "../../../core/services/OfferPriceService/OfferPriceService.core";
import { toast } from "react-toastify";
import { userProfile } from "../../../core/services/userProfile/FreelancerProfile/FreelancerProfile.core";
import { LoginServices } from "../../../core/services/AuthServices/Method_LoginData/Method_LoginData.core";
import { getUserLoginData } from "../../../core/redux/reducers/UserLoginData/UserLoginData.core";
import { getAuthentication } from "../../../core/redux/reducers/Authentication/AuthenticationReducer.core";
import { getRoleUser } from "../../../core/redux/reducers/Role/RoleReducer.core";
const IdPage = () => {
  const [open, setOpen] = useState(true);
  const value = useContext(LabelContext);
  const getClientData = value.labelInfo.clientView;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [getMobileNumber] = useSelector((state) => [state.mobileOTP]);
  const messages = useSelector((state) => state.messages);
  const [nextLoading, setNextLoadiing] = useState(false);
  const getNext = (e) => {
    e.preventDefault();
    setNextLoadiing(true);

    const data = {
      fullname: getClientData.fullName,
      username: getClientData.username,
      email: getClientData.email,
      password: getClientData.password,
      role_id: 3,
      country_id: getClientData.area?.country?.id,
      city_id: getClientData.area?.city?.id,
      state_id: getClientData.area?.state?.id,
      area_id: getClientData.area?.id,
      mobile: getMobileNumber?.mobile.split("+").join(""),
      gender_id: getClientData.gender.id,
      nationality_id: getClientData.nation.id,
      // category: value.labelInfo.skills,
      category: [],
    };
    RegisterServices.POST_RegisterData(data)
      .then((res) => {
        dispatch(
          getMessages({
            messages: res.data.message,
            messageType: "success",
            messageClick: true,
          })
        );
        setNextLoadiing(false);
        const dataWithToken = {
          email: getClientData.email,
          password: getClientData.password,
          device_token: localStorage.getItem("FCM"),
        };
        LoginServices._POST_LoginData(dataWithToken).then((res) => {
          if (res?.data?.status === 1) {
            dispatch(
              getMessages({
                messages: res?.data?.message,
                messageType: "success",
                messageClick: true,
              })
            );
            localStorage.setItem("UI", res?.data?.data?.id);
            const data = {
              avatar: res?.data?.data?.avatar,
              id: res?.data?.data?.id,
              username: res?.data?.data?.username,
              profileValidation: res?.data?.data?.profile_validation,
              userRole: res?.data?.data?.role,
            };
            dispatch(getUserLoginData(data));
            const userToken = res?.data?.data.token;
            localStorage.setItem("userTK", JSON.stringify(userToken));
            dispatch(getAuthentication(true));
            localStorage.setItem("usID", res?.data?.data?.id);
            localStorage.setItem("userRL", res?.data?.data?.role?.id);
            localStorage.setItem("valid", res?.data?.data?.profile_validation);
            dispatch(getRoleUser(true));

            const routTimeOut = setTimeout(() => {
              navigate(`/`);
            }, 1000);

            return () => clearTimeout(routTimeOut);
          }
        });
      })
      .catch((err) => {
        setNextLoadiing(false);
        let ob = err.response?.data.message;
        if (ob) {
          for (const key in ob) {
            let ele = ob[key];

            toast.error(ele[0]);
          }
        } else {
          toast.error("حدث خطأ ما");
        }
        dispatch(
          getMessages([
            {
              messages: ob,
              messageType: "error",
              messageClick: true,
            },
          ])
        );
        window.scrollTo({
          top: 250,
          behavior: "smooth",
        });
      });
  };
  const getBack = () => {
    value.prevPage();
  };
  const handleClose = () => {
    setOpen(false);
    navigate("/");
  };
  //////////////////////////////////////////////////////////////////////////////////

  const [getAllCountryFromResponse, setGetAllCountryFromResponse] = useState();
  const [selectedCountry, setSelectedCountry] = useState();
  const [selectedState, setSelectedState] = useState();
  const [selectedArea, setSelectedArea] = useState();
  const [selectedCity, setSelectedCity] = useState();
  const validation = selectedArea?.id;
  const fetchCountry = (country) => {
    setSelectedCountry(country);
    setSelectedCity("");
    setSelectedState("");
    setSelectedArea("");
  };
  const fetchCities = (city) => {
    setSelectedCity(city);
    setSelectedState("");
    setSelectedArea("");
  };
  const fetchState = (state) => {
    setSelectedState(state);
    setSelectedArea("");
  };
  const fetchArea = (area) => {
    setSelectedArea(area);
    console.log(area);
    value.setDataDetails(area);
  };
  const presetLocation = (data) => {
    setSelectedCountry(data?.country);
    setSelectedCity(data?.city);
    setSelectedState(data?.state);
    setSelectedArea(data?.area);
  };
  const getCoreData = useMemo(() => {
    let modal = ["country", "city", "state", "area"];
    return RegisterServices.GET_RegisterData(
      modal,
      selectedCountry?.id,
      selectedCity?.id,
      selectedState?.id
    ).then((res) => {
      setGetAllCountryFromResponse(res.data.data);
    });
  }, [selectedCountry, selectedState, selectedCity]);
  useEffect(() => {
    return getCoreData;
  }, [getCoreData]);

  return (
    <div>
      <Dialog
        aria-labelledby="simple-dialog-title1"
        open={open ? open : false}
        // onClose={handleClose}
      >
        <form
          onSubmit={(e) => getNext(e)}
          className="container px-0 my-4 d-flex flex-column gap-4"
          dir="rtl"
          style={{ width: "30rem" }}
        >
          <div className="LT-login-holder">
            <div
              style={{ textAlign: "center" }}
              className=" LT-account-logo d-flex flex-column p-3"
            >
              <p className="regiTitle"> معلومات الموقع </p>
            </div>
            <Row className="mb-4 gap-3 two row">
              {/* Country [Section] */}

              <Form.Group>
                <Form.Label className="fLT-Regular-sB cLT-support2-text mb-3 ">
                  البلد<span className="cLT-danger-text">*</span>
                </Form.Label>
                {/* Country [Option]  */}
                <div
                  className={` uLT-bd-f-platinum-sA uLT-f-radius-sB cLT-main-text fLT-Regular-sB LT-edit-account-input`}
                >
                  <Select
                    value={selectedCountry}
                    placeholder="البلد"
                    className="uLT-f-radius-sB "
                    options={getAllCountryFromResponse?.country}
                    onChange={fetchCountry}
                    getOptionLabel={(country) => country?.name}
                    getOptionValue={(country) => country?.id}
                  />
                </div>
                {/* {errMessage?.country_id && (
              <p
                className="position-absolute mb-0 fLT-Regular-sA cLT-danger-text  px-2"
                style={{ bottom: "-27px" }}
              >
                {errMessage?.country_id}
              </p>
            )} */}
              </Form.Group>
              {/* State [Section] */}
              <Form.Group>
                <Form.Label className="fLT-Regular-sB cLT-support2-text mb-3 ">
                  المدينة<span className="cLT-danger-text">*</span>
                </Form.Label>
                {/* State [Option]  */}
                <div
                  className={` uLT-bd-f-platinum-sA uLT-f-radius-sB cLT-main-text fLT-Regular-sB LT-edit-account-input`}
                >
                  <Select
                    value={selectedCity}
                    placeholder="المدينة"
                    options={getAllCountryFromResponse?.city}
                    onChange={fetchCities}
                    getOptionLabel={(city) => city?.name}
                    getOptionValue={(city) => city?.id}
                  />
                </div>
                {/* {errMessage?.city_id && (
              <p
                className="position-absolute mb-0 fLT-Regular-sA cLT-danger-text  px-2"
                style={{ bottom: "-27px" }}
              >
                {errMessage?.city_id}
              </p>
            )} */}
              </Form.Group>

              {/* Country [Section] */}

              <Form.Group>
                <Form.Label className="fLT-Regular-sB cLT-support2-text mb-3 ">
                  المنطقة<span className="cLT-danger-text">*</span>
                </Form.Label>
                {/* Country [Option]  */}
                <div
                  className={` uLT-bd-f-platinum-sA uLT-f-radius-sB cLT-main-text fLT-Regular-sB LT-edit-account-input`}
                >
                  <Select
                    value={selectedState}
                    placeholder="المنطقة"
                    className="uLT-f-radius-sB "
                    options={getAllCountryFromResponse?.state}
                    onChange={fetchState}
                    getOptionLabel={(country) => country?.name}
                    getOptionValue={(country) => country?.id}
                  />
                </div>
              </Form.Group>
              {/* State [Section] */}
              <Form.Group>
                <Form.Label className="fLT-Regular-sB cLT-support2-text mb-3 ">
                  الحي<span className="cLT-danger-text">*</span>
                </Form.Label>
                {/* State [Option]  */}
                <div
                  className={` uLT-bd-f-platinum-sA uLT-f-radius-sB cLT-main-text fLT-Regular-sB LT-edit-account-input`}
                >
                  <Select
                    value={selectedArea}
                    placeholder="الحي"
                    options={getAllCountryFromResponse?.area}
                    onChange={fetchArea}
                    getOptionLabel={(city) => city?.name}
                    getOptionValue={(city) => city?.id}
                  />
                </div>
              </Form.Group>
            </Row>
          </div>
          <div className="d-flex align-items-center justify-content-around gap-4">
            <div className="">
              <ButtonShare
                type={!validation}
                loading={nextLoading}
                innerText={"تسجيل"}
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
