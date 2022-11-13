import React, { useRef, useState } from "react";
import PerformanceShared from "../../../../../shared/Performance/Performance.shared";
import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "./FlancerEditCertificates.component.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getCertificate,
  deleteCertificate,
} from "../../../../../core/redux/reducers/CertificateSkillsReducer.core";
import ButtonShare from "../../../../../shared/Button/Button.shared";

const FlancerEditCertificatesComponent = () => {
  // Todo => Block Of Reducers Selectors
  // Certificate Data From Freelancer Reducer
  const certificateData = useSelector((state) => state.certificateSkills);
  // Todo => [Dispatch]
  const dispatch = useDispatch();

  // Todo => Block Of Use useState [Conditions] ========> [Start] <=======
  // Set Required To Input Attr
  const [requireds, setRequired] = useState(false);
  // Set Required To Performance Holder
  const [rateRequireds, setRateRequired] = useState(false);
  // Set Type Of Click To Switch Dispatch For Freelancer Reducers
  const [type, setType] = useState(false);
  const skillType = "certificate";
  // Todo => Block Of Use useState [Conditions] ========> [End] <=======

  // Todo => Block Of Input Value ========> [Start] <=======
  // State To Save Input Value
  const [certificateVal, setCertificateVal] = useState("");
  // Function Listen Value Update
  const certificateValue = (e) => {
    setCertificateVal(e.target.value);
  };
  // Get Input Value By [Ref]
  const certificateRef = useRef();
  // Todo => Block Of Input Value ========> [End] <=======

  // Todo => Dispatch Value To Freelancer Reducer
  const handleClick = (e) => {
    e.preventDefault();
    if (certificateRef.current?.value === "") {
      setRequired(true);
    } else if (certificateData.fCertificateRate === 0) {
      setRateRequired(true);
    } else {
      setRequired(false);
      setRateRequired(false);
      dispatch(
        getCertificate({
          skill: certificateVal,
          id: Date.now().toString(),
          level_id: certificateData?.fCertificateRate,
          type: "skill",
        })
      );
      setCertificateVal("");
      setType(true);
    }
  };
  return (
    <>
      {/* Certificate [Title] */}
      <div className="fLT-Regular-sB cLT-support2-text mb-3">المهارة </div>
      <Row className="mb-3 d-flex align-items-center gap-4  m-0">
        {/* Certificate Input  [Section] */}
        <Form.Group as={Col} md={5} className="px-0">
          <Form.Control
            className={`${
              requireds ? "uLT-bd-f-danger-sA" : "uLT-bd-f-platinum-sA"
            } uLT-f-radius-sB cLT-main-text fLT-Regular-sB`}
            type="text"
            placeholder="اسم المهارة"
            onBlur={() => {
              setRequired(false);
            }}
            ref={certificateRef}
            name="fCertificate"
            onChange={(e) => certificateValue(e)}
            value={certificateVal}
            required={
              certificateData.fCertificate.length === 0 ? "required" : ""
            }
          />
        </Form.Group>
        {/* Certificate Performance  [Section] */}
        <Form.Group
          as={Col}
          md={4}
          className={`px-0 d-flex gap-3 h-100 ${
            rateRequireds && "uLT-bd-f-danger-sA uLT-f-radius-sB p-3 "
          } `}
          onBlur={() => {
            setRateRequired(false);
          }}
          onFocus={() => {
            setRateRequired(false);
          }}
        >
          <div className="fLT-Regular-sB cLT-support2-text">الكفاءة </div>
          <PerformanceShared
            type={type}
            setLevelValue={setType}
            skillsType={skillType}
          />
          {/* <Dash type={type} /> */}
        </Form.Group>
        {requireds && (
          <div className="cLT-danger-text fLT-Regular-sA">
            * please Fill Field
          </div>
        )}
        {/* Certificate Show Input Value  [Section] */}
        <div className="d-flex align-items-center gap-3 px-0 pb-2 overflow-auto">
          {certificateData?.fCertificate?.map(
            ({ skill, id, level_id, level }, idx) => {
              return (
                <div
                  className={`d-flex align-items-center gap-3 uLT-f-radius`}
                  key={id}
                >
                  <span
                    style={{
                      width: 3,
                      height: 40,
                    }}
                    className={`${
                      idx ? "border-end border-dark border-2" : ""
                    } d-block`}
                  />
                  <div className="cLT-support2-text">
                    {level?.level || level_id}
                  </div>

                  <div className="d-flex align-items-center gap-3 uLT-f-radius uLT-bd-f-platinum-sA cLT-secondary-bg p-2">
                    <p
                      className="mb-0 fLT-Regular-sB cLT-white-text"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      {skill}{" "}
                    </p>
                    <i
                      className="iLT-Close-button-white iLT-sB uLT-img-contain uLT-click"
                      onClick={() => {
                        dispatch(deleteCertificate(id));
                      }}
                    ></i>
                  </div>
                </div>
              );
            }
          )}
        </div>

        {/* Add Certificates Skills [Button] */}
        <div
          onClick={(e) => handleClick(e)}
          className="d-flex justify-content-end align-items-center px-0"
        >
          <div className="uLT-f-radius-sB uLT-bd-f-secondary-sA uLT-click d-flex align-items-center justify-content-center gap-2 px-3 py-1">
            <p className="mb-0 fLT-Bold-sC cLT-secondary-text">+</p>
            <ButtonShare
              nohover
              innerText="اضف مهارة"
              textClasses="fLT-Regular-sD cLT-secondary-text px-0 py-0"
              btnClasses="px-0"
            />
          </div>
        </div>
      </Row>
    </>
  );
};

export default FlancerEditCertificatesComponent;
