import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { LabelContext } from "../LabelDataContext/labelDataContext";
import { Col, Row } from "react-bootstrap";
import { Form } from "react-bootstrap";
import Select from "react-select";
import ButtonShare from "../../../shared/Button/Button.shared";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  getAreaID,
  getcitiesID,
  getCountryID,
  getStateID,
} from "../../../core/redux/reducers/RegisterReducer/RegisterLocationID.core";
import { RegisterServices } from "../../../core/services/AuthServices/Method_RegisterData/Method_RegisterData.core";
import { getMessages } from "../../../core/redux/reducers/Messages/Messages.core";
import { useNavigate } from "react-router-dom";
import { LoginServices } from "../../../core/services/AuthServices/Method_LoginData/Method_LoginData.core";
import { getAuthentication } from "../../../core/redux/reducers/Authentication/AuthenticationReducer.core";
import { getUserLoginData } from "../../../core/redux/reducers/UserLoginData/UserLoginData.core";
import { getRoleUser } from "../../../core/redux/reducers/Role/RoleReducer.core";

const RegisterClientOptionDetails = () => {
  const dispatch = useDispatch();
  const value = useContext(LabelContext);
  const [location, messages, getMobileNumber, getFormData] = useSelector(
    (state) => [
      state.locationID,
      state.messages,
      state.mobileOTP,
      state.coreData,
    ]
  );
  // ================[Block START]================ //
  //TODO Get Nationality Input Value
  const [nationality, setNationality] = useState();
  const fetchNationality = useCallback(
    (nationality) => {
      setNationality(nationality);
    },
    [setNationality]
  );
  // ================[Block END]================ //

  // ================[Block START]================ //
  //TODO Get Gender Input Value
  const [gender, setGender] = useState();
  const fetchGender = useCallback(
    (gender) => {
      setGender(gender);
    },
    [setGender]
  );
  // ================[Block END]================ //

  // TODO Get Location [START]
  // ================[Block START]================ //
  //TODO Get Location Input Value [Country-City-State]
  const [getAllCountryFromResponse, setGetAllCountryFromResponse] = useState();
  const [selectedCountry, setSelectedCountry] = useState(1);
  const [selectedState, setSelectedState] = useState(1);
  const [selectedCity, setSelectedCity] = useState();
  const [selectedArea, setSelectedArea] = useState();
  const [selectedCountryName, setSelectedCountryName] = useState();
  const [selectedStateName, setSelectedStateName] = useState();
  const [selectedCityName, setSelectedCityName] = useState();
  const [selectedAreaName, setSelectedAreaName] = useState();

  const getCoreData = useMemo(() => {
    let modal = ["country", "city", "state", "area", "category"];
    return RegisterServices.GET_RegisterData(
      modal,
      selectedCountry,
      selectedState,
      selectedCity
    ).then((res) => {
      setGetAllCountryFromResponse(res.data.data);
    });
  }, [selectedCountry, selectedState, selectedCity]);
  useEffect(() => {
    return getCoreData;
  }, [getCoreData]);

  const fetchCountry = (country) => {
    dispatch(getCountryID(country?.id));
    setSelectedCountry(country.id);
    setSelectedCountryName(country?.name);
  };
  const fetchCities = (city) => {
    setSelectedState(city.id);
    setSelectedStateName(city.name);
    dispatch(getcitiesID(city?.id));
  };
  const fetchState = (state) => {
    setSelectedCity(state.id);
    setSelectedCityName(state?.name);
    setSelectedAreaName(getAllCountryFromResponse?.area);
    dispatch(getStateID(state?.id));
  };
  const fetchArea = (area) => {
    setSelectedArea(area.id);
    dispatch(getAreaID(area?.id));
  };
  const refe = useRef();
  // Country Select
  CountrySelect = React.forwardRef(CountrySelect);
  function CountrySelect(isProps = {}, ref) {
    return (
      <Select
        placeholder="البلد"
        ref={refe}
        options={isProps.isProps.location}
        defaultInputValue={
          selectedCountryName ? selectedCountryName : isProps.isProps.value
        }
        onChange={fetchCountry}
        getOptionLabel={(country) => country?.name}
        getOptionValue={(country) => country?.id}
      />
    );
  }
  // City Select
  CitySelect = React.forwardRef(CitySelect);
  function CitySelect(isProps = {}, ref) {
    return (
      <Select
        placeholder="المنطقة"
        ref={refe}
        options={isProps.isProps.location}
        defaultInputValue={
          selectedStateName ? selectedStateName : isProps.isProps.value
        }
        onChange={fetchCities}
        getOptionLabel={(city) => city?.name}
        getOptionValue={(city) => city?.id}
      />
    );
  }
  // State Select
  StateSelect = React.forwardRef(StateSelect);
  function StateSelect(isProps = {}, ref) {
    return (
      <Select
        placeholder="المدينة"
        ref={refe}
        options={isProps.isProps.location}
        defaultInputValue={
          selectedCityName ? selectedCityName : isProps.isProps.value
        }
        onChange={fetchState}
        getOptionLabel={(state) => state?.name}
        getOptionValue={(state) => state?.id}
      />
    );
  }
  // ================[Block END]================ //

  const [userId, setUserId] = useState();
  useEffect(() => {
    switch (value?.accountType?.userKind) {
      case "client":
        return setUserId(2);
      default:
        return null;
    }
  }, [value?.accountType?.userKind]);

  //TODO Get Form Input Value
  const [formInput, setFormInput] = useState({ fullname: "" });
  const fullNameHandler = useCallback(
    (e) => {
      const { name, value } = e.target;
      return value.length < 36
        ? setFormInput((formInput) => ({ ...formInput, [name]: value }))
        : null;
    },
    [setFormInput]
  );
  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormInput((formInput) => ({ ...formInput, [name]: value }));
    },
    [setFormInput]
  );
  // ================[Block END]================ //

  // TODO Get Location [END]
  // ================[Block END]================ //
  const [formLoading, setLoading] = useState(false);
  const [formMessages, setMessages] = useState();
  const [check, setCheck] = useState(false);

  const navigate = useNavigate();
  const getNext = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      fullname: formInput?.fullname,
      username: value.labelInfo.clientView.username,
      email: value.labelInfo.clientView.email,
      password: value.labelInfo.clientView.password,
      role_id: userId,
      country_id: location?.countriesID
        ? location?.countriesID
        : selectedCountry,
      city_id: location?.citiesID ? location?.citiesID : selectedState,
      state_id: location?.stateID ? location?.stateID : selectedCity,
      area_id: location?.areaID ? location?.areaID : selectedArea,
      mobile: getMobileNumber?.mobile.split("+").join(""),
      gender_id: gender?.id ? gender?.id : 0,
      nationality_id: nationality?.id ? nationality?.id : 0,
    };
    console.warn(data);
    RegisterServices.POST_RegisterData(data)
      .then((res) => {
        dispatch(
          getMessages({
            messages: res.data.message,
            messageType: "success",
            messageClick: true,
          })
        );
        setLoading(false);
        const dataWithToken = {
          email: value.labelInfo.clientView.email,
          password: value.labelInfo.clientView.password,
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
            if (
              res?.data?.data?.role.id == 3 ||
              res?.data?.data?.role?.id == 4
            ) {
              const routTimeOut = setTimeout(() => {
                navigate(`/account_management/my-edit-account/${data?.id}`);
  
              }, 800);

              return () => clearTimeout(routTimeOut);
            } 
          } 
        });
        navigate("/");
      })
      .catch((err) => {
        setMessages(err.response.data.message);
        setLoading(false);
        toast.error("حدث خطأ ما");
        dispatch(
          getMessages([
            {
              messages: err.response.data.message,
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
    value.jumpPage(3);
  };
  return (
    <Form
      onSubmit={(e) => getNext(e)}
      className="container px-0 my-4 d-flex flex-column gap-4"
      dir="rtl"
    >
      <Row>
        {/* Full Name */}
        <Form.Group
          as={Col}
          sm={12}
          controlId="formGridFullName"
          className="px-0"
        >
          <Form.Label className="fLT-Regular-sB cLT-support2-text mb-3">
            الاسم بالكامل <span className="cLT-danger-text">*</span>
          </Form.Label>
          <Form.Control
            value={formInput.fullname}
            name="fullname"
            onChange={(e) => fullNameHandler(e)}
            className={`${
              formMessages?.fullname
                ? "uLT-bd-f-danger-sA"
                : "uLT-bd-f-platinum-sA"
            } uLT-f-radius-sB cLT-main-text fLT-Regular-sB`}
            type="text"
            placeholder="الاسم بالكامل"
          />
          {formMessages?.fullname && (
            <p className="mb-0 fLT-Regular-sA cLT-danger-text pt-2 px-2">
              {formMessages?.fullname}
            </p>
          )}
        </Form.Group>
      </Row>
      {/* Third Row [Job Title & Gender & Nationality] */}
      <Row className=" d-flex align-items-center mb-3 gap-3 gap-md-0">
        {/* Gender */}
        <Form.Group
          as={Col}
          md={6}
          controlId="formGridGender"
          className="mb-3 mb-md-0"
        >
          {/* Gender [Label] */}
          <Form.Label className="fLT-Regular-sB cLT-support2-text mb-3 position-relative">
            النوع <span className="cLT-danger-text">*</span>
          </Form.Label>
          {/* Gender [Option]  */}
          <div
            className={`uLT-bd-f-platinum-sA uLT-f-radius-sB cLT-main-text fLT-Regular-sB `}
          >
            <Select
              placeholder="النوع"
              options={getFormData?.gender}
              className="p-3~"
              onChange={fetchGender}
              getOptionLabel={(gender) => gender?.name}
              getOptionValue={(gender) => gender?.id}
            />
          </div>
          {!gender && formMessages?.gender_id && (
            <p className="position-absolute text-nowrap mb-0 fLT-Regular-sA cLT-danger-text pt-2 px-2">
              {formMessages?.gender_id}
            </p>
          )}
        </Form.Group>
        {/* Nationality */}
        <Form.Group
          as={Col}
          md={6}
          controlId="formGridNationality"
          className=""
        >
          {/* Nationality [Label] */}
          <Form.Label className="fLT-Regular-sB cLT-support2-text mb-3">
            الجنسية <span className="cLT-danger-text">*</span>
          </Form.Label>
          {/* Nationality [Option]  */}
          <div
            className={` uLT-bd-f-platinum-sA uLT-f-radius-sB cLT-main-text fLT-Regular-sB `}
          >
            <Select
              placeholder="الجنسية"
              options={getFormData?.nationality}
              onChange={fetchNationality}
              getOptionLabel={(nationality) => nationality?.name}
              getOptionValue={(nationality) => nationality?.id}
            />
          </div>
          {!nationality && formMessages?.nationality_id && (
            <p className="position-absolute text-nowrap mb-0 fLT-Regular-sA cLT-danger-text pt-2 px-2">
              {formMessages.nationality_id}
            </p>
          )}
        </Form.Group>
      </Row>
      {/* fourth  Row [Location] */}
      <Row className="d-flex align-items-center">
        {/* Country [Section] */}
        <label className="fLT-Regular-sB cLT-support2-text mb-3">
          موقعك <span className="cLT-danger-text">*</span>
        </label>
        <Form.Group as={Col} md={6} className="'mb-3  ">
          {/* Country [Option]  */}
          <div
            className={` uLT-bd-f-platinum-sA uLT-f-radius-sB cLT-main-text fLT-Regular-sB LT-edit-account-input mb-3 mb-md-0`}
          >
            <CountrySelect
              isProps={{
                value: getAllCountryFromResponse?.country[0]?.name,
                location: getAllCountryFromResponse?.country,
              }}
              ref={refe}
            />
          </div>
          {!location?.countriesID && formMessages?.country_id && (
            <p className="mb-0 fLT-Regular-sA cLT-danger-text pt-2 px-2">
              {formMessages?.country_id}
            </p>
          )}
        </Form.Group>
        {/* State [Section] */}
        <Form.Group as={Col} md={6} className="'mb-3 mb-md-0">
          {/* State [Option]  */}
          <div
            className={` uLT-bd-f-platinum-sA uLT-f-radius-sB cLT-main-text fLT-Regular-sB `}
          >
            <CitySelect
              isProps={{
                value: getAllCountryFromResponse?.city[0]?.name,
                location: getAllCountryFromResponse?.city,
              }}
              ref={refe}
            />
          </div>
          {!location?.citiesID && messages?.city_id && (
            <p className="mb-0 fLT-Regular-sA cLT-danger-text pt-2 px-2">
              {messages?.city_id}
            </p>
          )}
        </Form.Group>
      </Row>
      <Row>
        {/* State [Section] */}
        <Form.Group as={Col} md={6} className="">
          <div
            className={`${
              formMessages?.state_id
                ? "uLT-bd-f-danger-sA"
                : "uLT-bd-f-platinum-sA"
            } uLT-f-radius-sB cLT-main-text fLT-Regular-sB mb-3 mb-md-0 `}
          >
            <StateSelect
              isProps={{
                value: getAllCountryFromResponse?.sate,
                location: getAllCountryFromResponse?.state,
              }}
              ref={refe}
            />
          </div>
          {/* State [Option]  */}
          {!location?.stateID && formMessages?.state_id && (
            <p className="mb-0 fLT-Regular-sA cLT-danger-text pt-2 px-2">
              {formMessages?.state_id}
            </p>
          )}
        </Form.Group>
        <Form.Group as={Col} md={6} className="">
          {/* Area [Option]  */}
          <div
            className={`${
              formMessages?.area_id
                ? "uLT-bd-f-danger-sA"
                : "uLT-bd-f-platinum-sA"
            } uLT-f-radius-sB cLT-main-text fLT-Regular-sB `}
          >
            <Select
              placeholder="الحى"
              options={selectedAreaName}
              onChange={fetchArea}
              getOptionLabel={(area) => area?.name}
              getOptionValue={(area) => area?.id}
            />
          </div>
          {!location?.areaID && formMessages?.area_id && (
            <p className="mb-0 fLT-Regular-sA cLT-danger-text pt-2 px-2">
              {formMessages?.state_id}
            </p>
          )}
        </Form.Group>
      </Row>

      <div className="d-flex flex-column  align-items-center justify-content-between gap-4">
        {/* Agree Terms [Section] */}
        <label className="d-flex justify-content-center align-items-center gap-2 gap-sm-3 ">
          <input
            id="acceptTerms"
            checked={check}
            type="checkbox"
            className="uLT-click"
            name="radio-button"
            onChange={() => setCheck(!check)}
            style={{ width: "24px", height: "24px" }}
          />
          <p className="mb-0  LT-agree-condition cLT-support2-text termsText">
            {" "}
            اوافق علي الشروط والاحكام{" "}
          </p>
        </label>
        <div className="w-50">
          <ButtonShare
            loading={formLoading}
            type={!check}
            innerText={"إنشـــاء حســـاب"}
            btnClasses={"three cLT-secondary-bg"}
            textClasses={"py-1 px-4 cLT-white-text fLT-Regular-sB"}
          />
        </div>
        <div className="w-50">
          <ButtonShare
            onClick={() => getBack()}
            innerText={"رجــــوع"}
            btnClasses={"three cLT-secondary-bg"}
            textClasses={"py-1 px-4 cLT-white-text fLT-Regular-sB"}
          />
        </div>
      </div>
    </Form>
  );
};
export default RegisterClientOptionDetails;
