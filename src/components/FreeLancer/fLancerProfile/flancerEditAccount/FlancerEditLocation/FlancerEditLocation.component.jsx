import "./FlancerEditLocation.component.scss";
//  Hooks Used
import React, { useEffect, useMemo, useRef, useState } from "react";
// Libraries Used
import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Select from "react-select";
// JSON File Used
import { useDispatch, useSelector } from "react-redux";
import {
  getcitiesID,
  getCountryID,
  getStateID,
  getAreaID,
} from "../../../../../core/redux/reducers/RegisterReducer/RegisterLocationID.core";
import { RegisterServices } from "../../../../../core/services/AuthServices/Method_RegisterData/Method_RegisterData.core";

const FlancerEditLocationComponent = ({ userProfileLocation }) => {
  const [getAllCountryFromResponse, setGetAllCountryFromResponse] = useState();

  const dispatch = useDispatch();
  const locationIDs = useSelector(({ locationID }) => locationID);

  const fetchCountry = (country) => {
    setSelectedCountry(country);
    setSelectedCity({});
    setSelectedState({});
    setSelectedArea({});
    dispatch(getCountryID(country?.id));
  };
  const fetchCities = (city) => {
    setSelectedCity(city);
    setSelectedState({});
    setSelectedArea({});
    dispatch(getcitiesID(city?.id));
  };
  const fetchState = (state) => {
    setSelectedState(state);
    setSelectedArea({});
    dispatch(getStateID(state?.id));
  };
  const fetchArea = (area) => {
    setSelectedArea(area);
    dispatch(getAreaID(area?.id));
  };

  const [isLoading, setIsLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState({});
  const [selectedCity, setSelectedCity] = useState({});
  const [selectedState, setSelectedState] = useState({});
  const [selectedArea, setSelectedArea] = useState({});

  useEffect(() => {
    if (userProfileLocation?.country && isLoading) {
      setSelectedCountry(userProfileLocation?.country || {});
      setSelectedCity(userProfileLocation?.city || {});
      setSelectedState(userProfileLocation?.state || {});
      setSelectedArea(userProfileLocation?.area || {});
      setIsLoading(false);
    }
  }, [userProfileLocation, isLoading]);

  const getCoreData = useMemo(() => {
    let modal = ["country", "city", "state", "area"];
    return RegisterServices.GET_RegisterData(
      modal,
      locationIDs?.countriesID || userProfileLocation?.country?.id,
      locationIDs?.citiesID || userProfileLocation?.city?.id,
      locationIDs?.stateID || userProfileLocation?.state?.id
    ).then((res) => {
      setGetAllCountryFromResponse(res.data.data);
    });
  }, [
    userProfileLocation?.country?.id,
    userProfileLocation?.city?.id,
    userProfileLocation?.state?.id,
    locationIDs?.countriesID,
    locationIDs?.citiesID,
    locationIDs?.stateID,
  ]);

  useEffect(() => {
    return getCoreData;
  }, [getCoreData]);

  const refe = useRef();
  // Country Select
  CountrySelect = React.forwardRef(CountrySelect);
  function CountrySelect(isProps = {}, ref) {
    return (
      <Select
        placeholder="البلد"
        value={selectedCountry}
        onChange={fetchCountry}
        ref={refe}
        options={isProps.isProps.location}
        // defaultInputValue={
        //   countryName
        //     ? countryName
        //     : isProps.isProps.value
        //     ? isProps.isProps.value
        //     : ""
        // }
        getOptionLabel={(country) => country?.name}
        getOptionValue={(country) => country?.id}
      />
    );
  }

  // City Select
  StateSelect = React.forwardRef(StateSelect);
  function StateSelect(isProps = {}, ref) {
    return (
      <Select
        placeholder="المنطقه"
        ref={refe}
        options={isProps.isProps.location}
        value={selectedState}
        // defaultInputValue={
        //   stateName
        //     ? stateName
        //     : isProps.isProps.value
        //     ? isProps.isProps.value
        //     : ""
        // }
        onChange={fetchState}
        getOptionLabel={(state) => state?.name}
        getOptionValue={(state) => state?.id}
      />
    );
  }
  // State Select
  CitySelect = React.forwardRef(CitySelect);
  function CitySelect(isProps = {}, ref) {
    return (
      <Select
        placeholder="المدينه"
        ref={refe}
        options={isProps.isProps.location}
        // defaultInputValue={
        //   cityName
        //     ? cityName
        //     : isProps.isProps.value
        //     ? isProps.isProps.value
        //     : ""
        // }
        value={selectedCity}
        onChange={fetchCities}
        getOptionLabel={(city) => city?.name}
        getOptionValue={(city) => city?.id}
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
        // defaultInputValue={
        //   areaName
        //     ? areaName
        //     : isProps.isProps.value === null
        //     ? ""
        //     : isProps.isProps.value
        // }
        value={selectedArea}
        onChange={fetchArea}
        getOptionLabel={(area) => area?.name}
        getOptionValue={(area) => area?.id}
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
