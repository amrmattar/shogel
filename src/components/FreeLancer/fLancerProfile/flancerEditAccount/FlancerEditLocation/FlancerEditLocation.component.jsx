import "./FlancerEditLocation.component.scss";
//  Hooks Used
import React, { useEffect, useMemo, useRef, useState } from "react";
// Libraries Used
import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Select from "react-select";
// JSON File Used
import { useDispatch } from "react-redux";
import {
  getcitiesID,
  getCountryID,
  getStateID,
  getAreaID,
} from "../../../../../core/redux/reducers/RegisterReducer/RegisterLocationID.core";
import { RegisterServices } from "../../../../../core/services/AuthServices/Method_RegisterData/Method_RegisterData.core";

const FlancerEditLocationComponent = ({ userProfileLocation }) => {
  const [getAllCountryFromResponse, setGetAllCountryFromResponse] = useState();
  const getCoreData = useMemo(() => {
    let modal = ["country", "city", "state", "area"];
    return RegisterServices.GET_RegisterData(
      modal,
      userProfileLocation?.country?.id,
      userProfileLocation?.city?.id
    ).then((res) => {
      setGetAllCountryFromResponse(res.data.data);
    });
  }, [userProfileLocation?.country?.id, userProfileLocation?.city?.id]);
  useEffect(() => {
    return getCoreData;
  }, [getCoreData]);

  const dispatch = useDispatch();
  //TODO Get Location Input Value [Country-City-State]
  const [selectedState, setSelectedState] = useState();

  const [countryName, setCountryName] = useState();
  const [cityName, setCityName] = useState();
  const [stateName, setStateName] = useState();
  const [areaName, setAreaName] = useState();

  const fetchCountry = (country) => {
    setCountryName(country.name);
    dispatch(getCountryID(country?.id));
  };
  const fetchCities = (city) => {
    setCityName(city.name);
    dispatch(getcitiesID(city?.id));
  };
  const fetchState = (state) => {
    setStateName(state.name);
    dispatch(getStateID(state?.id));
  };
  const fetchArea = (area) => {
    setAreaName(area.name);
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
          countryName
            ? countryName
            : isProps.isProps.value
            ? isProps.isProps.value
            : "loading"
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
          cityName
            ? cityName
            : isProps.isProps.value
            ? isProps.isProps.value
            : "loading"
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
          stateName
            ? stateName
            : isProps.isProps.value
            ? isProps.isProps.value
            : "loading"
        }
        onChange={fetchState}
        getOptionLabel={(state) => state?.name}
        getOptionValue={(state) => state?.id}
      />
    );
  }
  // Area Select
  AreaSelect = React.forwardRef(AreaSelect);
  function AreaSelect(isProps = {}, ref) {
    return (
      <Select
        placeholder="الحى"
        ref={refe}
        options={isProps.isProps.location}
        defaultInputValue={
          areaName
            ? areaName
            : isProps.isProps.value === null
            ? "loading"
            : isProps.isProps.value
        }
        onChange={fetchArea}
        getOptionLabel={(state) => state?.name}
        getOptionValue={(state) => state?.id}
      />
    );
  }

  return (
    <>
      {/* fourth  Row [Location] */}
      <Row className="d-flex align-items-center">
        {/* Country [Section] */}
        <Form.Group as={Col} md={6} className="'mb-3  ">
          {/* Country [Option]  */}
          <div
            className={`uLT-bd-f-platinum-sA uLT-f-radius-sB cLT-main-text fLT-Regular-sB LT-edit-account-input mb-3 mb-md-0`}
          >
            <CountrySelect
              isProps={{
                value: userProfileLocation?.country?.name,
                location: getAllCountryFromResponse?.country,
              }}
              ref={refe}
            />
          </div>
        </Form.Group>
        {/* City [Section] */}
        <Form.Group as={Col} md={6} className="'mb-3 mb-md-0">
          {/* City [Option]  */}
          <div
            className={`uLT-bd-f-platinum-sA uLT-f-radius-sB cLT-main-text fLT-Regular-sB `}
          >
            <CitySelect
              isProps={{
                value: userProfileLocation?.city?.name,
                location: getAllCountryFromResponse?.city,
              }}
              ref={refe}
            />
          </div>
        </Form.Group>
      </Row>
      <Row>
        {/* State [Section] */}
        <Form.Group as={Col} md={6} className="'mb-3 mb-md-0">
          {/* State [Option]  */}
          <div
            className={`uLT-bd-f-platinum-sA uLT-f-radius-sB cLT-main-text fLT-Regular-sB `}
          >
            <StateSelect
              isProps={{
                value: userProfileLocation?.state?.name,
                location: getAllCountryFromResponse?.state,
              }}
              ref={refe}
            />
          </div>
        </Form.Group>
        {/* Area [Section] */}
        <Form.Group as={Col} md={6} className="'mb-3 mb-md-0">
          {/* Area [Option]  */}
          <div
            className={`uLT-bd-f-platinum-sA uLT-f-radius-sB cLT-main-text fLT-Regular-sB `}
          >
            <AreaSelect
              isProps={{
                value: userProfileLocation?.area?.name,
                location: getAllCountryFromResponse?.area,
              }}
              ref={refe}
            />
          </div>
        </Form.Group>
      </Row>
    </>
  );
};

export default FlancerEditLocationComponent;
