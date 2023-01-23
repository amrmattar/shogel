import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import defautFlag from "../../../../assets/icons/Advs-flag.svg";
import ButtonShare from "../../../../shared/Button/Button.shared";
const FlancerPersonalInformationComponent = ({
  statusIcon,
  myData,
  rate,
  nowrap,
  nowraps,
}) => {
  const location = useLocation();

  return (
    <div className="d-flex">
      <div>
        {/*  User [Icon - Name - Flag - Title] */}
        <div className="d-flex align-items-center justify-conetnt-center gap-2 gap-md-3 p-0">
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
                style={
                  nowrap
                    ? {
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        width: "70%",
                      }
                    : {}
                }
                className={`m-0 card-text fLT-Bold-sm-sA cLT-support2-text text-end ${
                  location.pathname === "/" ? "" : "text-nowrap"
                }`}
              >
                {myData?.fullname || myData?.name}
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
            <p
              style={
                nowrap
                  ? {
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      width: "70%",
                    }
                  : nowraps
                  ? {
                      whiteSpace: "nowrap",
                    }
                  : {}
              }
              className="m-0 cLT-support2-text fLT-Regular-sB"
            >
              {myData?.description}
            </p>
          </div>
        </div>

        {/* <div className="d-flex align-items-center LT-rate-font-size  ">
        <p className="m-0 card-text cLT-support2-text ">({rate?.count})</p>
        <p className="m-0 card-text cLT-support2-text ">{rate?.rate}</p>
        <i className={` iLT-Rate-star uLT-img-contain LT-rate-icon-size`}></i>
      </div> */}
      </div>

      {myData?.jobName === "freelancer" && (
        <NavLink
          to={`/freelancer-offer/${myData?.id}`}
          className={"uLT-list-style me-3"}
        >
          <div className="shadow  uLT-f-radius-sB">
            <ButtonShare
              btnClasses="cLT-secondary-bg py-2 px-4  d-flex align-items-center gap-2 uLT-f-radius-sB"
              textClasses={`fLT-Regular-sB px-1 cLT-white-text `}
              innerText="شغلني"
              iconName={"iLT-work-case-white"}
            />
          </div>
        </NavLink>
      )}
    </div>
  );
};

export default FlancerPersonalInformationComponent;
