import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import "./Registeration.component.scss";
import { useDispatch, useSelector } from "react-redux";
import { getDataForm } from "../../../core/redux/reducers/RegisterReducer/RegisterReducer.core";
import {
  getcitiesID,
  getCountryID,
  getStateID,
} from "../../../core/redux/reducers/RegisterReducer/RegisterLocationID.core";
import { RegisterServices } from "../../../core/services/AuthServices/Method_RegisterData/Method_RegisterData.core";
import Collapse from "react-bootstrap/Collapse";

const RegisterationComponent = ({
  isChanged,
  getFormData,
  messages,
  freelancerTagsSection,
  companySection,
  setData,
}) => {
  const location = useSelector((state) => state.locationID);
  const dispatch = useDispatch();
  //TODO Get Location Input Value [Country-City-State]
  const [getAllCountryFromResponse, setGetAllCountryFromResponse] = useState();
  const [selectedCountry, setSelectedCountry] = useState(1);
  const [selectedState, setSelectedState] = useState(1);
  const [selectedCountryName, setSelectedCountryName] = useState();
  const [selectedStateName, setSelectedStateName] = useState();

  const getCoreData = useMemo(() => {
    let modal = ["country", "city", "state"];
    return RegisterServices.GET_RegisterData(
      modal,
      selectedCountry,
      selectedState
    ).then((res) => {
      setGetAllCountryFromResponse(res.data.data);
    });
  }, [selectedCountry, selectedState]);
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
    dispatch(getStateID(state?.id));
  };

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

  // //TODO Get Mobile Input Value
  const [getRoleValue, setGetRoleValue] = useState();

  //TODO Get Form Input Value
  const [formInput, setFormInput] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
    nationalID: "",
    commercialRegister: "",
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

  //TODO ==> Function Collect All Values In One [Variables]
  const getFormDatas = useCallback(() => {
    const formData = {
      username: formInput?.username,
      fullname: formInput?.fullname,
      email: formInput?.email,
      password: formInput?.password,
      job_name_id: jobName?.id,
      role_id: getRoleValue,
      commercial_number: formInput.commercialRegister,
      country_id: location?.countriesID
        ? location?.countriesID
        : selectedCountry,
      city_id: location?.citiesID ? location?.citiesID : selectedState,
      gender_id: gender?.id,
      nationality_number: formInput?.nationalID,
      nationality_id: nationality?.id,
    };
    if (location?.stateID !== 0) {
      const sendWithState = {
        ...formData,
        state_id: location?.stateID,
      };
      dispatch(getDataForm(sendWithState));
    } else if (formData !== "") {
      dispatch(getDataForm(formData));
    } else {
      return false;
    }
  }, [
    dispatch,
    formInput,
    jobName,
    selectedCountry,
    location,
    selectedState,
    getRoleValue,
    nationality,
    gender,
  ]);
  useEffect(() => {
    getFormDatas();
  }, [getFormDatas]);
  const [openFreelancerSection, setOpenFreelancerSection] = useState(false);
  const [openCompanySection, setOpenCompanySection] = useState(false);

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
        placeholder="المدينة"
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
  return (
    <>
      <div
        onChange={(e) => setGetRoleValue(e?.target?.value)}
        className="d-flex flex-column align-items-center justify-content-center p-0"
      >
        <label className="fLT-Regular-sC cLT-support2-text mb-4">
          {" "}
          نوع الحساب
        </label>
        {/* Freelancer Account Navigator [Holder] */}
        <div className="LT-user-Type-holder uLT-f-radius-sB p-0 ">
          {/* Freelancer Hide Account [Button] */}
          <div className="fLT-Regular-sC cLT-support2-text  py-3 col  LT-company">
            <label
              id="hideCompo"
              onChange={(e) => isChanged(e)}
              className="uLT-click"
            >
              <input
                type="radio"
                name="one"
                value={4}
                datatype="anytwo"
                alt="compTrue"
                onClick={() => {
                  setOpenFreelancerSection(true);
                }}
              />
              <span className="text-nowrap"> حساب شركة</span>
            </label>
          </div>
          {/* Freelancer Show Account [Button] */}
          <div className="fLT-Regular-sC cLT-support2-text  py-3 col  LT-freelancer ">
            <label
              id="showCompo"
              aria-controls="example-collapse-text"
              onChange={(e) => isChanged(e)}
              className="uLT-click"
            >
              <input
                type="radio"
                name="one"
                value={3}
                datatype="anuone"
                alt="true"
                onClick={() => {
                  setOpenFreelancerSection(true);
                }}
              />
              <span className="text-nowrap"> حساب مشتغل</span>
            </label>
          </div>
          {/* Freelancer Hide Account [Button] */}
          <div className="fLT-Regular-sC cLT-support2-text  py-3 col  LT-client ">
            <label
              id="hideCompo"
              onChange={(e) => isChanged(e)}
              className="uLT-click"
            >
              <input
                type="radio"
                name="one"
                value={2}
                datatype="any"
                alt="false"
                onClick={() => {
                  setOpenFreelancerSection(false);
                }}
              />
              <span className="text-nowrap"> حساب عميل</span>
            </label>
          </div>
        </div>
      </div>
      {/* First Row [Name & Email] */}
      <Row className="my-3 gap-3 flex-column m-0">
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
              className="uLT-bd-f-platinum-sA uLT-f-radius-sB cLT-main-text fLT-Regular-sB"
              type="text"
              placeholder="اسم المستخدم"
              maxLength={15}
              minLength={3}
            />
            {messages?.username && (
              <p className="mb-0 fLT-Regular-sA cLT-danger-text pt-2 px-2">
                {messages?.username}
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
              className="uLT-bd-f-platinum-sA uLT-f-radius-sB cLT-main-text fLT-Regular-sB"
              type="text"
              placeholder="الاسم بالكامل"
            />
            {messages?.fullname && (
              <p className="mb-0 fLT-Regular-sA cLT-danger-text pt-2 px-2">
                {messages?.fullname}
              </p>
            )}
          </Form.Group>
        </div>
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
              required
              onChange={(e) => handleChange(e)}
              className="uLT-bd-f-platinum-sA uLT-f-radius-sB cLT-main-text fLT-Regular-sB"
              type="email"
              placeholder="البريد الإلكتروني"
            />
            {messages?.email && (
              <p className="mb-0 fLT-Regular-sA cLT-danger-text pt-2 px-2">
                {messages?.email}
              </p>
            )}
          </Form.Group>
          {/* National ID */}
          {getRoleValue == 4 ? (
            <Form.Group
              as={Col}
              md={6}
              controlId="formGridPassword"
              className="position-relative"
            >
              <Form.Label className="fLT-Regular-sB cLT-support2-text mb-3 ">
                رقم السجل التجارى <span className="cLT-danger-text">*</span>
              </Form.Label>
              <Form.Control
                name="commercialRegister"
                className="uLT-bd-f-platinum-sA uLT-f-radius-sB cLT-main-text fLT-Regular-sB  "
                onChange={(e) => handleChange(e)}
                required
                value={formInput.commercialRegister.replace(/[^0-9]/gi, "")}
                type="number"
                onWheel={(e) => e.target.blur()}
                placeholder="رقم السجل التجارى"
              />
              {messages?.commercial_number && (
                <p className="mb-0 fLT-Regular-sA cLT-danger-text pt-2 px-2">
                  {messages?.commercial_number}
                </p>
              )}
            </Form.Group>
          ) : (
            <Form.Group
              as={Col}
              sm={12}
              md={6}
              controlId="formGridNationalID"
              className="px-0  "
            >
              <Form.Label className="fLT-Regular-sB cLT-support2-text mb-3">
                رقم الهوية <span className="cLT-danger-text">*</span>
              </Form.Label>
              <Form.Control
                value={formInput.nationalID}
                required
                name="nationalID"
                onWheel={(e) => e.target.blur()}
                onChange={(e) => nationalIdHandler(e)}
                className="uLT-bd-f-platinum-sA uLT-f-radius-sB cLT-main-text fLT-Regular-sB"
                type="number"
                placeholder="رقم الهوية"
              />
              {messages?.nationality_number && (
                <p className="mb-0 fLT-Regular-sA cLT-danger-text pt-2 px-2">
                  {messages?.nationality_number}
                </p>
              )}
            </Form.Group>
          )}
        </div>
      </Row>
      {/* Third Row [Job Title & Gender & Nationality] */}
      <Row className=" d-flex align-items-center mb-3">
        {/* Job Title & Nationality [Holder] */}
        {/* Password Title */}
        <Form.Group
          as={Col}
          md={4}
          controlId="formGridPassword"
          className="position-relative"
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
            className="uLT-bd-f-platinum-sA uLT-f-radius-sB"
            type="password"
            placeholder="0000"
          />
          {/* {formInput?.password?.length < 8 && messages?.password && <p className='mb-0 fLT-Regular-sA cLT-danger-text pt-2 px-2'>{messages?.password}</p>} */}
          {formInput?.password?.length < 8 && messages?.password && (
            <p className="position-absolute text-nowrap mb-0 fLT-Regular-sA cLT-danger-text pt-2 px-2">
              {messages?.password}
            </p>
          )}
        </Form.Group>
        {/* Gender */}
        <Form.Group as={Col} md={4} controlId="formGridGender" className="">
          {/* Gender [Label] */}
          <Form.Label className="fLT-Regular-sB cLT-support2-text mb-3 position-relative">
            النوع <span className="cLT-danger-text">*</span>
          </Form.Label>
          {/* Gender [Option]  */}
          <div
            className={`uLT-bd-f-platinum-sA uLT-f-radius-sB cLT-main-text fLT-Regular-sB`}
          >
            <Select
              placeholder="النوع"
              options={getFormData?.gender}
              onChange={fetchGender}
              getOptionLabel={(gender) => gender?.name}
              getOptionValue={(gender) => gender?.id}
            />
          </div>
          {!gender && messages?.gender_id && (
            <p className="position-absolute text-nowrap mb-0 fLT-Regular-sA cLT-danger-text pt-2 px-2">
              {messages.gender_id}
            </p>
          )}
        </Form.Group>
        {/* Nationality */}
        <Form.Group
          as={Col}
          md={4}
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
          {!nationality && messages?.nationality_id && (
            <p className="position-absolute text-nowrap mb-0 fLT-Regular-sA cLT-danger-text pt-2 px-2">
              {messages.nationality_id}
            </p>
          )}
        </Form.Group>
      </Row>
      {/* fourth  Row [Location] */}
      <Row className="d-flex align-items-center pt-3">
        {/* Country [Section] */}
        <label className="fLT-Regular-sB cLT-support2-text mb-2">
          موقعك <span className="cLT-danger-text">*</span>
        </label>
        <Form.Group as={Col} md={4} className="mb-4 ">
          {/* Country [Option]  */}
          <div
            className={` uLT-bd-f-platinum-sA uLT-f-radius-sB cLT-main-text fLT-Regular-sB LT-edit-account-input`}
          >
            <CountrySelect
              isProps={{
                value: getAllCountryFromResponse?.country[0]?.name,
                location: getAllCountryFromResponse?.country,
              }}
              ref={refe}
            />
          </div>
          {!location?.countriesID && messages?.country_id && (
            <p className="mb-0 fLT-Regular-sA cLT-danger-text pt-2 px-2">
              {messages?.country_id}
            </p>
          )}
        </Form.Group>
        {/* State [Section] */}
        <Form.Group as={Col} md={4} className="mb-4">
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
        {/* City [Section] */}
        <Form.Group as={Col} md={4} className="mb-4">
          {/* City [Option]  */}
          <div
            className={` uLT-bd-f-platinum-sA uLT-f-radius-sB cLT-main-text fLT-Regular-sB `}
          >
            <Select
              placeholder="الحى"
              options={getAllCountryFromResponse?.state}
              onChange={fetchState}
              getOptionLabel={(state) => state?.name}
              getOptionValue={(state) => state?.id}
            />
          </div>
          {!location?.stateID && messages?.state_id && (
            <p className="mb-0 fLT-Regular-sA cLT-danger-text pt-2 px-2">
              {messages?.state_id}
            </p>
          )}
        </Form.Group>
      </Row>
      {/* Freelancer Collapse Section */}
      <Collapse in={openFreelancerSection}>
        <div id="example-collapse-freelancer uLT-f-radius-sB">
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
              className={` uLT-bd-f-platinum-sA uLT-f-radius-sB cLT-main-text fLT-Regular-sB `}
            >
              <Select
                placeholder=" الوصف المختصر"
                options={getFormData?.jobName}
                onChange={fetchJobName}
                getOptionLabel={(jobName) => jobName?.name}
                getOptionValue={(jobName) => jobName?.id}
              />
            </div>
            {!jobName && messages?.job_name_id && (
              <p className="mb-0 fLT-Regular-sA cLT-danger-text pt-2 px-2">
                {messages?.job_name_id}
              </p>
            )}
          </Form.Group>
          {openFreelancerSection && freelancerTagsSection}
          {setOpenCompanySection && companySection}
        </div>
      </Collapse>
    </>
  );
};

export default React.memo(RegisterationComponent);
