import React, {
  Fragment,
  useContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import "./Register.scss";
import { useDispatch, useSelector } from "react-redux";
import { LabelContext } from "../LabelDataContext/labelDataContext";
import { RegisterServices } from "../../../core/services/AuthServices/Method_RegisterData/Method_RegisterData.core";
import {
  getAreaID,
  getcitiesID,
  getCountryID,
  getStateID,
} from "../../../core/redux/reducers/RegisterReducer/RegisterLocationID.core";
import FlancerEditTagsComponent from "../../../components/FreeLancer/fLancerProfile/flancerEditAccount/FlancerEditTags/FlancerEditTags.component";
import { getMessages } from "../../../core/redux/reducers/Messages/Messages.core";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { LoginServices } from "../../../core/services/AuthServices/Method_LoginData/Method_LoginData.core";
import { getUserLoginData } from "../../../core/redux/reducers/UserLoginData/UserLoginData.core";
import { getAuthentication } from "../../../core/redux/reducers/Authentication/AuthenticationReducer.core";
import { getRoleUser } from "../../../core/redux/reducers/Role/RoleReducer.core";

const RegisterFreelancerPersonalDetails = () => {
  const [location, messages, categorySkills, getMobileNumber, getFormData] =
    useSelector((state) => [
      state.locationID,
      state.messages,
      state.registerCategory,
      state.mobileOTP,
      state.coreData,
    ]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const value = useContext(LabelContext);

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

  //TODO Get Form Input Value
  const [formInput, setFormInput] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
    nationalID: "",
  });
  const nationalIdHandler = useCallback(
    (e) => {
      const { name, value } = e.target;
      return value.length < 11
        ? setFormInput((formInput) => ({ ...formInput, [name]: value }))
        : null;
    },
    [setFormInput]
  );
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

  //TODO Get Nationality Input Value
  const [nationality, setNationality] = useState();
  const fetchNationality = useCallback(
    (nationality) => {
      setNationality(nationality);
    },
    [setNationality]
  );

  //TODO Get Gender Input Value
  const [gender, setGender] = useState();
  const fetchGender = useCallback(
    (gender) => {
      setGender(gender);
    },
    [setGender]
  );

  //TODO Get Gender Input Value
  const [jobName, setJobName] = useState();
  const fetchJobName = useCallback(
    (jobName) => {
      setJobName(jobName);
    },
    [setJobName]
  );

  const [userId, setUserId] = useState();
  useEffect(() => {
    switch (value?.accountType?.userKind) {
      case "worker":
        return setUserId(3);
      default:
        return null;
    }
  }, [value?.accountType?.userKind]);
  const [formLoading, setLoading] = useState(false);
  const [formMessages, setMessages] = useState();
  const [check, setCheck] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const hideIcon = formInput.password.length > 0;
  const getNext = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      username: formInput?.username,
      fullname: formInput?.fullname,
      email: formInput?.email,
      password: formInput?.password,
      job_name_id: jobName?.id,
      role_id: userId,
      country_id: location?.countriesID
        ? location?.countriesID
        : selectedCountry,
      city_id: location?.citiesID ? location?.citiesID : selectedState,
      state_id: location?.stateID ? location?.stateID : selectedCity,
      area_id: location?.areaID ? location?.areaID : selectedArea,
      gender_id: gender?.id ? gender?.id : 0,
      nationality_id: nationality?.id ? nationality?.id : 0,
      nationality_number: formInput.nationalID,
      mobile: getMobileNumber.mobile.split("+").join(""),
      category: categorySkills,
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
        setLoading(false);
        const dataWithToken = {
          email: formInput?.email,
          password: formInput?.password,
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
        setLoading(false);
        setMessages(err.response.data.message);
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
  const validation =
    categorySkills?.length !== 0 &&
    jobName?.id !== undefined &&
    formInput.nationalID !== "";

  return (
    <Fragment>
      <Form
        onSubmit={(e) => getNext(e)}
        className="container px-0 my-4 d-flex flex-column gap-4"
        dir="rtl"
      >
        {/* First Row [Name & Email] */}
        <Row className="my-3 gap-3 flex-column m-0">
          <div className="d-flex gap-3 ps-0 ps-md-3 pe-0 mx-0 flex-column flex-md-row">
            {/* Email Address */}
            <Form.Group
              as={Col}
              sm={12}
              md={6}
              controlId="formGridEmail"
              className="px-0  "
            >
              <Form.Label className="fLT-Regular-sB cLT-support2-text mb-3">
                البريد الإلكتروني <span className="cLT-danger-text">*</span>
              </Form.Label>
              <Form.Control
                value={formInput.email}
                name="email"
                onChange={(e) => handleChange(e)}
                className={`${
                  formMessages?.email
                    ? "uLT-bd-f-danger-sA"
                    : "uLT-bd-f-platinum-sA"
                } uLT-f-radius-sB cLT-main-text fLT-Regular-sB`}
                type="email"
                placeholder="البريد الإلكتروني"
              />
              {formMessages?.email && (
                <p className="mb-0 fLT-Regular-sA cLT-danger-text pt-2 px-2">
                  {formMessages?.email}
                </p>
              )}
            </Form.Group>
            {/* Password Title */}
            <Form.Group
              as={Col}
              md={6}
              controlId="formGridPassword"
              className="px-0 position-relative"
            >
              {/* Password Title [Label] */}
              <Form.Label className="fLT-Regular-sB cLT-support2-text mb-3">
                كلمة المرور <span className="cLT-danger-text">*</span>
              </Form.Label>
              {/* Password Title [Input] */}
              <Form.Control
                value={formInput.password}
                name="password"
                onChange={(e) => handleChange(e)}
                className={`${
                  formMessages?.password
                    ? "uLT-bd-f-danger-sA"
                    : "uLT-bd-f-platinum-sA"
                } uLT-f-radius-sB `}
                type={showPassword ? "text" : "password"}
                placeholder="كلمة المرور"
              />
              {hideIcon && (
                <IconButton
                  style={{ position: "absolute", top: "49px", left: "8px" }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <VisibilityOffOutlinedIcon />
                  ) : (
                    <VisibilityOutlinedIcon />
                  )}{" "}
                </IconButton>
              )}
              {formInput?.password?.length < 8 && formMessages?.password && (
                <p className="mb-0 fLT-Regular-sA cLT-danger-text pt-2 px-2">
                  {formMessages?.password}
                </p>
              )}
            </Form.Group>
          </div>
          <div className="d-flex gap-3 ps-0 ps-md-3 pe-0 mx-0 flex-column flex-md-row">
            {/* User Name */}
            <Form.Group
              as={Col}
              sm={12}
              md={6}
              controlId="formGridUserName"
              className="px-0"
            >
              <Form.Label className="fLT-Regular-sB cLT-support2-text mb-3">
                {" "}
                اسم المستخدم <span className="cLT-danger-text">*</span>{" "}
              </Form.Label>
              <Form.Control
                value={formInput.username.replace(/[^A-Za-z0-9]/gi, "")}
                name="username"
                onChange={(e) => handleChange(e)}
                className={`${
                  formMessages?.username
                    ? "uLT-bd-f-danger-sA"
                    : "uLT-bd-f-platinum-sA"
                }  uLT-f-radius-sB cLT-main-text fLT-Regular-sB`}
                type="text"
                placeholder="اسم المستخدم"
                maxLength={15}
              />
              {formMessages?.username && (
                <p className="mb-0 fLT-Regular-sA cLT-danger-text pt-2 px-2">
                  {formMessages?.username}
                </p>
              )}
            </Form.Group>
            {/* Full Name */}
            <Form.Group
              as={Col}
              sm={12}
              md={6}
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
          </div>
        </Row>
        {/* Third Row [Job Title & Gender & Nationality] */}
        <Row className=" d-flex align-items-center mb-3">
          {/* National ID */}
          <Form.Group
            as={Col}
            sm={12}
            md={4}
            controlId="formGridNationalID"
            className=""
          >
            <Form.Label className="fLT-Regular-sB cLT-support2-text mb-3">
              رقم الهوية <span className="cLT-danger-text">*</span>
            </Form.Label>
            <Form.Control
              value={formInput.nationalID}
              required
              name="nationalID"
              onWheel={(e) => e.target.blur()}
              type="number"
              placeholder="رقم الهوية"
              onChange={(e) => nationalIdHandler(e)}
              className={`${
                formMessages?.nationality_number
                  ? "uLT-bd-f-danger-sA"
                  : "uLT-bd-f-platinum-sA"
              } uLT-f-radius-sB cLT-main-text fLT-Regular-sB`}
            />
            {formMessages?.nationality_number && (
              <p className="position-absolute text-nowrap mb-0 fLT-Regular-sA cLT-danger-text pt-2 px-2">
                {formMessages?.nationality_number}
              </p>
            )}
          </Form.Group>
          {/* Gender */}
          <Form.Group
            as={Col}
            md={4}
            controlId="formGridGender"
            className="my-3"
          >
            {/* Gender [Label] */}
            <Form.Label className="fLT-Regular-sB cLT-support2-text mb-3 position-relative">
              الجنس <span className="cLT-danger-text">*</span>
            </Form.Label>
            {/* Gender [Option]  */}
            <div
              className={`${
                formMessages?.gender_id
                  ? "uLT-bd-f-danger-sA"
                  : "uLT-bd-f-platinum-sA"
              } uLT-f-radius-sB cLT-main-text fLT-Regular-sB`}
            >
              <Select
                placeholder="الجنس"
                options={getFormData?.gender}
                onChange={fetchGender}
                getOptionLabel={(gender) => gender?.name}
                getOptionValue={(gender) => gender?.id}
              />
            </div>
            {!gender && formMessages?.gender_id && (
              <p className="position-absolute text-nowrap mb-0 fLT-Regular-sA cLT-danger-text pt-2 px-2">
                {formMessages.gender_id}
              </p>
            )}
          </Form.Group>
          {/* Nationality */}
          <Form.Group
            as={Col}
            md={4}
            controlId="formGridNationality"
            className="my-3"
          >
            {/* Nationality [Label] */}
            <Form.Label className="fLT-Regular-sB cLT-support2-text mb-3">
              الجنسية <span className="cLT-danger-text">*</span>
            </Form.Label>
            {/* Nationality [Option]  */}
            <div
              className={`${
                formMessages?.nationality_id
                  ? "uLT-bd-f-danger-sA"
                  : "uLT-bd-f-platinum-sA"
              } uLT-f-radius-sB cLT-main-text fLT-Regular-sB `}
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
              className={`${
                formMessages?.country_id
                  ? "uLT-bd-f-danger-sA"
                  : "uLT-bd-f-platinum-sA"
              } uLT-f-radius-sB cLT-main-text fLT-Regular-sB LT-edit-account-input mb-3 mb-md-0`}
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
              className={`${
                formMessages?.city_id
                  ? "uLT-bd-f-danger-sA"
                  : "uLT-bd-f-platinum-sA"
              } uLT-f-radius-sB cLT-main-text fLT-Regular-sB `}
            >
              <CitySelect
                isProps={{
                  value: getAllCountryFromResponse?.city[0]?.name,
                  location: getAllCountryFromResponse?.city,
                }}
                ref={refe}
              />
            </div>
            {!location?.citiesID && formMessages?.city_id && (
              <p className="mb-0 fLT-Regular-sA cLT-danger-text pt-2 px-2">
                {formMessages?.city_id}
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
            {!location?.stateID && formMessages?.area_id && (
              <p className="mb-0 fLT-Regular-sA cLT-danger-text pt-2 px-2">
                {formMessages?.state_id}
              </p>
            )}
          </Form.Group>
        </Row>
        <Row>
          <div className="pt-4">
            <div className="mb-4">
              <label className="fLT-Regular-sB cLT-support2-text mb-2">
                مجالات الاختصاص <span className="cLT-danger-text">*</span>
              </label>
              <FlancerEditTagsComponent
                tags={getAllCountryFromResponse?.category}
                type={"Register"}
              />
            </div>
          </div>
          {/* Job Name Title */}
          <Form.Group
            as={Col}
            md={12}
            controlId="formGridGender"
            className="mt-3"
          >
            {/* Job Name [Label] */}
            <Form.Label className="fLT-Regular-sB cLT-support2-text mb-3">
              الوصف المختصر <span className="cLT-danger-text">*</span>
            </Form.Label>
            {/* Job Name [Option]  */}
            <div
              className={`${
                formMessages?.job_name_id
                  ? "uLT-bd-f-danger-sA"
                  : "uLT-bd-f-platinum-sA"
              } uLT-f-radius-sB cLT-main-text fLT-Regular-sB `}
            >
              <Select
                placeholder=" الوصف المختصر"
                options={getFormData?.jobName}
                onChange={fetchJobName}
                getOptionLabel={(jobName) => jobName?.name}
                getOptionValue={(jobName) => jobName?.id}
              />
            </div>
            {!jobName && formMessages?.job_name_id && (
              <p className="mb-0 fLT-Regular-sA cLT-danger-text pt-2 px-2">
                {formMessages?.job_name_id}
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
              disabled={!validation}
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
          <button
            disabled={!validation || !check}
            name="freelancer"
            className="btn w-50 cLT-secondary-bg p-1"
          >
            <div className="d-flex align-items-center gap-2 justify-content-center gap-3">
              {formLoading && <div className="spinner"></div>}
              <p className="m-0  py-1 px-4 cLT-white-text fLT-Regular-sB">
                إنشـــاء حســـاب
              </p>
            </div>
          </button>
          <button
            onClick={value.handleChange("user")}
            name="freelancer"
            className="btn w-50 cLT-secondary-bg p-1"
          >
            <p
              name="freelancer"
              className="m-0  py-1 px-4 cLT-white-text fLT-Regular-sB"
            >
              رجــــوع
            </p>
          </button>
        </div>
      </Form>
    </Fragment>
  );
};
export default RegisterFreelancerPersonalDetails;
