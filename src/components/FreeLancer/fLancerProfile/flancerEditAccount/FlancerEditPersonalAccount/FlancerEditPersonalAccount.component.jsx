import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "./FlancerEditPersonalAccount.component.scss";
import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import ReactPhoneInput from "react-phone-input-2";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { getUpdateDataForm } from "../../../../../core/redux/reducers/UpdateProfileReducer/UpdateProfileReducer.core";

import {
  testNumbers,
  arNumberConverter,
} from "../../../../../utils/arNumberConverter";

const FlancerEditPersonalAccountComponent = ({
  data,
  userProfileData,
  convertToFreeLancerMode,
}) => {
  console.log();
  const [userRole] = useSelector((state) => [state.userRole.userRole]);
  const userIsData = useMemo(() => {
    if (userProfileData) {
      return userProfileData;
    }
  }, [userProfileData]);
  const dispatch = useDispatch();
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
  //TODO Get Form Input Value
  const [formInput, setFormInput] = useState({
    username: "",
    fullname: "",
    email: "",
    description: "",
    nationality_number: "",
  });
  const [updateMobile, setUpdateMobile] = useState();

  const nationalIdHandler = useCallback(
    (e) => {
      const { name, value } = e.target;

      // only price number
      if (name === "nationality_number" && value && testNumbers(value)) return;

      return value.length < 36
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
  const descHandler = useCallback(
    (e) => {
      const { name, value } = e.target;

      setFormInput((formInput) => ({ ...formInput, [name]: value }));
    },
    [setFormInput]
  );
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((formInput) => ({ ...formInput, [name]: value }));
  };
  useEffect(() => {
    if (userIsData !== undefined) {
      const updateForm = {
        username: formInput.username
          ? formInput.username
          : userProfileData?.username,
        info: formInput.info ? formInput.info : userIsData?.info,
        description: formInput.description
          ? formInput.description
          : userIsData?.description,
        fullname: formInput.fullname
          ? formInput.fullname
          : userProfileData?.fullname,
        email: formInput.email ? formInput.email : userProfileData?.email,
        nationality_number: formInput.nationality_number
          ? arNumberConverter(formInput.nationality_number)
          : userProfileData?.nationality_number,
        nationality_id: nationality?.id
          ? nationality?.id
          : userProfileData?.nationality?.id,
        job_name_id: jobName?.id
          ? jobName?.id
          : userProfileData?.job_name_id?.id,
        mobile: updateMobile ? updateMobile : userProfileData?.mobile,
        gender_id: gender?.id ? gender?.id : userProfileData?.gender?.id,
      };

      dispatch(getUpdateDataForm(updateForm));
    }
  }, [
    userIsData,
    dispatch,
    nationality?.id,
    jobName?.id,
    updateMobile,
    gender?.id,
    formInput,
    userProfileData,
  ]);
  useEffect(() => {
    setFormInput({ ...userIsData });
  }, [userIsData]);
  const refe = useRef();
  // Gender Select
  // console.log(userIsData);
  GenderSelect = React.forwardRef(GenderSelect);
  function GenderSelect(isProps = {}, ref) {
    return (
      <Select
        placeholder="النوع"
        ref={refe}
        options={isProps.isProps.selecName}
        defaultInputValue={
          gender?.name
            ? gender?.name
            : isProps.isProps.value
            ? isProps.isProps.value
            : ""
        }
        onChange={fetchGender}
        getOptionLabel={(gender) => gender?.name}
        getOptionValue={(gender) => gender?.id}
      />
    );
  }
  // Job Name Select
  JobSelect = React.forwardRef(JobSelect);
  function JobSelect(isProps = {}, ref) {
    return (
      <Select
        placeholder=" الوصف المختصر"
        ref={refe}
        options={isProps.isProps.selecName}
        defaultInputValue={
          jobName?.name
            ? jobName?.name || ""
            : isProps.isProps.value
            ? isProps.isProps.value || ""
            : ""
        }
        onChange={fetchJobName}
        getOptionLabel={(jobname) => jobname?.name}
        getOptionValue={(jobname) => jobname?.id}
      />
    );
  }
  // Nationality Select
  NationalitySelect = React.forwardRef(NationalitySelect);
  function NationalitySelect(isProps = {}, ref) {
    return (
      <Select
        placeholder="الجنسية"
        ref={refe}
        options={isProps.isProps.selecName}
        defaultInputValue={
          nationality?.name
            ? nationality?.name
            : isProps.isProps.value
            ? isProps.isProps.value
            : ""
        }
        onChange={fetchNationality}
        getOptionLabel={(nationality) => nationality?.name}
        getOptionValue={(nationality) => nationality?.id}
      />
    );
  }
  return (
    <>
      {/* First Row */}
      <Row className=" gap-3 flex-column m-0">
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
              اسم المستخدم
            </Form.Label>
            <Form.Control
              name="username"
              className="uLT-bd-f-platinum-sA uLT-f-radius-sB cLT-main-text fLT-Regular-sB"
              type="text"
              placeholder="اسم المستخدم"
              pattern="[\x00-\x7F]+"
              maxLength={15}
              minLength={3}
              onChange={(e) => e}
              defaultValue={userIsData && userIsData?.username}
              readOnly
            />
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
              الاسم بالكامل
            </Form.Label>
            <Form.Control
              name="fullname"
              className="uLT-bd-f-platinum-sA uLT-f-radius-sB cLT-main-text fLT-Regular-sB"
              type="text"
              placeholder="الاسم بالكامل"
              onChange={(e) => fullNameHandler(e)}
              value={formInput.fullname}
            />
          </Form.Group>
        </div>
      </Row>
      {/* Second Row */}
      <Row className=" gap-3 flex-column m-0">
        <div className="d-flex gap-3 ps-0 ps-md-3 pe-0 mx-0 flex-column flex-md-row">
          {/* Mobile Number */}
          <Form.Group
            as={Col}
            sm={12}
            md={6}
            controlId="formGridMobile"
            className="px-0"
            readOnly
          >
            <Form.Label className="fLT-Regular-sB cLT-support2-text mb-3">
              رقم الجوال
            </Form.Label>
            <div dir="ltr">
              <Form.Control
                style={{
                  fontFamily: "sans-serif !important",
                }}
                readOnly
                name="mobile"
                className="uLT-bd-f-platinum-sA uLT-f-radius-sB cLT-main-text fLT-Regular-sB"
                type="text"
                placeholder="0000"
                value={userIsData?.mobile}
              />
            </div>
          </Form.Group>
          {/* Email Address */}
          <Form.Group
            as={Col}
            sm={12}
            md={6}
            controlId="formGridEmail"
            className="px-0  "
          >
            <Form.Label className="fLT-Regular-sB cLT-support2-text mb-3">
              البريد الإلكتروني
            </Form.Label>
            <Form.Control
              name="email"
              className="uLT-bd-f-platinum-sA uLT-f-radius-sB cLT-main-text fLT-Regular-sB"
              type="email"
              placeholder="البريد الإلكتروني"
              onChange={(e) => handleChange(e)}
              defaultValue={userIsData?.email}
              readOnly
            />
          </Form.Group>
        </div>
      </Row>
      {/* Third Row */}
      {(userProfileData?.role?.id != "2" || convertToFreeLancerMode) && (
        <>
          <Row className="d-flex align-items-center">
            {/* National ID */}
            <Form.Group
              as={Col}
              sm={12}
              md={6}
              controlId="formGridNationalID"
              className=""
            >
              <Form.Label className="fLT-Regular-sB cLT-support2-text mb-3">
                رقم الهوية
              </Form.Label>
              <Form.Control
                name="nationality_number"
                className="uLT-bd-f-platinum-sA uLT-f-radius-sB cLT-main-text fLT-Regular-sB"
                type="text"
                placeholder="رقم الهوية"
                onChange={(e) => nationalIdHandler(e)}
                defaultValue={userIsData?.nationality_number}
                value={formInput?.nationality_number}
              />
            </Form.Group>
            {/* Job Title */}
            <Form.Group
              as={Col}
              sm={12}
              md={6}
              controlId="formGridUserName"
              className="px-0"
            >
              <Form.Label className="fLT-Regular-sB cLT-support2-text mb-3">
                الوصف المختصر
              </Form.Label>
              <Form.Control
                name="description"
                className="uLT-bd-f-platinum-sA uLT-f-radius-sB cLT-main-text fLT-Regular-sB"
                type="text"
                placeholder="مطور ويب | خبير صيانه"
                onChange={(e) => descHandler(e)}
                defaultValue={userIsData?.description || ""}
              />
            </Form.Group>
          </Row>
          <Row>
            {/* Gender */}
            <Form.Group
              as={Col}
              sm={12}
              md={6}
              controlId="formGridGender"
              className=""
            >
              {/* Gender [Label] */}
              <Form.Label className="fLT-Regular-sB cLT-support2-text mb-3">
                النوع
              </Form.Label>
              {/* Gender [Option]  */}
              <div
                className={` uLT-bd-f-platinum-sA uLT-f-radius-sB cLT-main-text fLT-Regular-sB LT-edit-account-input`}
              >
                <GenderSelect
                  isProps={{
                    value: userProfileData?.gender?.name,
                    selecName: data?.gender,
                  }}
                  ref={refe}
                />
              </div>
            </Form.Group>
            {/* Nationality */}
            <Form.Group
              as={Col}
              sm={12}
              md={6}
              controlId="formGridNationality"
              className=" cLT-danger-text"
            >
              {/* Nationality [Label] */}
              <Form.Label className="fLT-Regular-sB cLT-support2-text mb-3">
                الجنسية
              </Form.Label>
              {/* Nationality [Option]  */}
              <div
                className={` uLT-bd-f-platinum-sA uLT-f-radius-sB cLT-main-text fLT-Regular-sB LT-edit-account-input`}
              >
                <NationalitySelect
                  isProps={{
                    value: userProfileData?.nationality?.name,
                    selecName: data?.nationality,
                  }}
                  ref={refe}
                />
              </div>
            </Form.Group>
          </Row>
        </>
      )}
      {/* Four Row [Gender & Nationality] */}
      {userProfileData?.role?.id == "2" && !convertToFreeLancerMode && (
        <Row className="flex align-items-center">
          {/* National ID */}
          <Form.Group
            as={Col}
            sm={12}
            md={4}
            controlId="formGridNationalID"
            className=""
          >
            <Form.Label className="fLT-Regular-sB cLT-support2-text mb-3">
              رقم الهوية
            </Form.Label>
            <Form.Control
              name="nationality_number"
              className="uLT-bd-f-platinum-sA uLT-f-radius-sB cLT-main-text fLT-Regular-sB"
              type="text"
              placeholder="رقم الهوية"
              onChange={(e) => nationalIdHandler(e)}
              defaultValue={userIsData?.nationality_number}
              value={formInput?.nationality_number}
            />
          </Form.Group>
          {/* Gender */}
          <Form.Group
            as={Col}
            sm={12}
            md={4}
            controlId="formGridGender"
            className=""
          >
            {/* Gender [Label] */}
            <Form.Label className="fLT-Regular-sB cLT-support2-text mb-3">
              النوع
            </Form.Label>
            {/* Gender [Option]  */}
            <div
              className={` uLT-bd-f-platinum-sA uLT-f-radius-sB cLT-main-text fLT-Regular-sB LT-edit-account-input`}
            >
              <GenderSelect
                isProps={{
                  value: userProfileData?.gender?.name,
                  selecName: data?.gender,
                }}
                ref={refe}
              />
            </div>
          </Form.Group>
          {/* Nationality */}
          <Form.Group
            as={Col}
            sm={12}
            md={4}
            controlId="formGridNationality"
            className=" cLT-danger-text"
          >
            {/* Nationality [Label] */}
            <Form.Label className="fLT-Regular-sB cLT-support2-text mb-3">
              الجنسية
            </Form.Label>
            {/* Nationality [Option]  */}
            <div
              className={` uLT-bd-f-platinum-sA uLT-f-radius-sB cLT-main-text fLT-Regular-sB LT-edit-account-input`}
            >
              <NationalitySelect
                isProps={{
                  value: userProfileData?.nationality?.name,
                  selecName: data?.nationality,
                }}
                ref={refe}
              />
            </div>
          </Form.Group>
        </Row>
      )}
    </>
  );
};

export default React.memo(FlancerEditPersonalAccountComponent);
