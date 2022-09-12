import React from "react";
import { useLocation } from "react-router-dom";
import defautFlag from "../../../../assets/icons/Advs-flag.svg";
const FlancerPersonalInformationComponent = ({ statusIcon, myData, rate }) => {
  const location = useLocation();
  return (
    <div>
      {/*  User [Icon - Name - Flag - Title] */}
      <div className="d-flex align-items-start gap-2 gap-md-3 p-0">
        {/* <i className={`iLT-Advs-user-icon uLT-img-contain iLT-sF `}></i> */}
        <div className="d-flex align-items-center justify-content-center position-relative">
          {/* <i className={`d-inline-flex iLT-flancer-image uLT-img-contain iLT-sF  uLT-f-radius`}></i> */}
          <img
            src={myData?.avatar}
            alt="myPic"
            className={" iLT-sF uLT-f-radius"}
          />
          {statusIcon}
        </div>

        <div className="d-flex flex-column justify-content-start">
          <div className="d-flex gap-2 gap-md-3 justify-content-between">
            <p
              className={`m-0 card-text fLT-Bold-sm-sA cLT-support2-text text-end ${
                location.pathname === "/" ? "" : "text-nowrap"
              }`}
            >
              {myData?.fullname || myData?.username || myData?.name}{" "}
            </p>
            <img
              src={
                myData?.nationality?.logo
                  ? myData?.nationality?.logo
                  : defautFlag
              }
              alt=""
              className={`${location.pathname === "/"} ? iLT-sB : iLT-sC`}
            />
            {/* <i className={` iLT-Advs-flag uLT-img-contain iLT-sC`}></i> */}
          </div>
          <p className="m-0 cLT-support2-text fLT-Regular-sB">
            {" "}
            {myData?.jobName || myData?.job_name_id?.name}
          </p>
        </div>
      </div>

      <div className="d-flex align-items-center LT-rate-font-size  ">
        <p className="m-0 card-text cLT-support2-text ">({rate?.count})</p>
        <p className="m-0 card-text cLT-support2-text ">{rate?.rate}</p>
        <i className={` iLT-Rate-star uLT-img-contain LT-rate-icon-size`}></i>
      </div>
    </div>
  );
};

export default FlancerPersonalInformationComponent;
