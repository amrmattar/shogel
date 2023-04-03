import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
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
    <Link
      to={`/employed/freelancer-profile/${myData?.id}`}
      className="d-flex text-decoration-none text-dark"
      style={{ cursor: "pointer", width: "fit-content" }}
    >
      <div className="d-flex">
        {myData?.to ? (
          <NavLink className={`text-decoration-none`} to={myData.to}>
            <div className="cu-pointer text-decoration-none">
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
                  <div className="d-flex gap-2 gap-md-3 justify-content-start">
                    <p
                      style={
                        nowrap
                          ? {
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              width: "70%",
                              textDecoration: "none",
                            }
                          : {}
                      }
                      className={`m-0 card-text fLT-Bold-sm-sA cLT-support2-text text-decoration-none text-end ${
                        location.pathname === "/" ? "" : "text-nowrap"
                      }`}
                    >
                      {myData?.fullname || myData?.name}
                    </p>
                    <img
                      src={
                        myData?.myFlag ||
                        myData?.nationality?.logo ||
                        "https://uat.shogol.sa/Admin/public/images/nationality/1/سعودي.png"
                      }
                      alt=""
                      className={`${
                        location.pathname === "/"
                      } ? iLT-sB : iLT-sC`}
                    />
                    {/* <i className={` iLT-Advs-flag uLT-img-contain iLT-sC`}></i> */}
                  </div>
                  <p
                    style={{
                      overflow: "hidden",
                      height: "3rem",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      width: 200,
                    }}
                    className="m-0 cLT-support2-text fLT-Regular-sB"
                  >
                    {myData?.description == "null"
                      ? "لا يوجد وصف مختصر"
                      : myData?.description}
                  </p>
                </div>
              </div>

              {/* <div className="d-flex align-items-center LT-rate-font-size  ">
        <p className="m-0 card-text cLT-support2-text ">({rate?.count})</p>
        <p className="m-0 card-text cLT-support2-text ">{rate?.rate}</p>
        <i className={` iLT-Rate-star uLT-img-contain LT-rate-icon-size`}></i>
      </div> */}
            </div>
          </NavLink>
        ) : (
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
                <div className="d-flex gap-2 gap-md-3 justify-content-start">
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
                      myData?.myFlag ||
                      myData?.nationality?.logo ||
                      "https://uat.shogol.sa/Admin/public/images/nationality/1/سعودي.png"
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
                  {myData?.description == "null"
                    ? "لا يوجد وصف مختصر"
                    : myData?.description}
                </p>
              </div>
            </div>

            {/* <div className="d-flex align-items-center LT-rate-font-size  ">
      <p className="m-0 card-text cLT-support2-text ">({rate?.count})</p>
      <p className="m-0 card-text cLT-support2-text ">{rate?.rate}</p>
      <i className={` iLT-Rate-star uLT-img-contain LT-rate-icon-size`}></i>
    </div> */}
          </div>
        )}
      </div>
    </Link>
  );
};

export default FlancerPersonalInformationComponent;
