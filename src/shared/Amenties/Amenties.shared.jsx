import React from "react";
import "./Amenties.shared.scss";

import { AiOutlineFileDone } from "react-icons/ai";
import { GiPayMoney } from "react-icons/gi";
import { arNumberConverter } from "../../utils/arNumberConverter";

const AmentiesShared = ({
  amentiesWithIcon,
  orderData,
  amenties,
  offerAmenties,
  offerAmentiesData,
  areasOfCompetenceData,
  amentiesWithLocation,
  amentiesWithLocationData,
  iconWithLocation,
  locationName,
  time,
  price,
  currency,
  maxWidth,
  phoneView,
}) => {
  return (
    <div style={maxWidth ? { maxWidth: "calc(100% / 4)" } : {}}>
      {/* Amenties With Icon */}
      {amentiesWithIcon === "orderAmenties" ? (
        <div className="LT-orderAmenties d-block d-md-grid">
          {/* Amenties Holder */}
          <div className="d-flex LT-orderCount gap-3 flex-wrap w-100 justify-content-start align-items-center">
            {orderData?.category
              ?.slice(0, 3)
              ?.map((amentiesOfCategory, idx) => {
                return (
                  <div key={idx} className="cLT-platinum-bg uLT-f-radius-sB">
                    <p className="mb-0 px-3 py-1 cLT-support2-text fLT-Regular-sA">
                      {amentiesOfCategory?.name}
                    </p>
                  </div>
                );
              })}
          </div>
          {/* Amenties Icon */}
          <div className={`row w-100 mt-4 mt-md-0`}>
            <div className="col-5 col-md-6 d-none d-md-block">
              <div className="d-flex gap-3 align-items-center">
                <div className="d-flex justify-content-center aling-items-center">
                  <i
                    className={`iLT-Listcard-location uLT-img-contain iLT-sA ms-2 main-color`}
                  />
                  <p className="mb-0 cLT-secondary-text fLT-Bold-sm-sA">
                    {orderData?.country?.name}, {orderData?.city?.name}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-5 mt-2 d-md-none mb-3 ms-1">
              <div className="d-flex  gap-3 align-items-center">
                <div className="d-flex justify-content-center aling-items-center">
                  <i
                    className={`iLT-Advs-calendar uLT-img-contain iLT-sA ms-2 main-color`}
                  />
                  <p
                    style={{ whiteSpace: "nowrap" }}
                    className="mb-0 cLT-secondary-text fLT-Bold-sm-sA"
                  >
                    قبل {orderData?.created_at_value}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-5 mt-2 d-md-none">
              <div className="d-flex  gap-3 align-items-center">
                <div className="d-flex justify-content-center aling-items-center">
                  <AiOutlineFileDone className="ms-2 main-color" />
                  <p className="mb-0 cLT-secondary-text fLT-Bold-sm-sA">
                    {Number(arNumberConverter(orderData?.offerCount || 0))} عروض
                  </p>
                </div>
              </div>
            </div>

            <div className="col-5 col-md-6 d-md-none">
              <div className="d-flex gap-3 align-items-center">
                <div className="d-flex justify-content-center aling-items-center">
                  <i
                    className={`iLT-Listcard-location uLT-img-contain iLT-sA ms-2 main-color`}
                  />
                  <p
                    style={{ whiteSpace: "nowrap" }}
                    className="mb-0 cLT-secondary-text fLT-Bold-sm-sA"
                  >
                    {orderData?.country?.name}, {orderData?.city?.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}

      {/* Amenties With Location */}
      {amentiesWithLocation === "amentiesWithLocation" ? (
        <div className="cLT-platinum-bg uLT-f-radius-sB">
          <p
            style={{ maxWidth: "100px" }}
            title={amentiesWithLocationData}
            className="one-line-specifc mb-0 px-3 px-lg-2 px-xl-3 py-1 cLT-support2-text"
          >
            {amentiesWithLocationData}
          </p>
        </div>
      ) : (
        false
      )}

      {/* Offer Icons With Location */}
      {iconWithLocation === "offerIconWithLocation" ? (
        <div className="card-body~  gap-2 d-flex flex-wrap  justify-content-between align-items-center p-0 w-100">
          {/* Amenties Holder */}
          <div className="d-flex  gap-3 align-items-center">
            <div className="d-flex justify-content-center aling-items-center">
              <i
                className={`iLT-Listcard-location uLT-img-contain iLT-sA ms-2`}
              />
              <p className="mb-0 cLT-support2-text fLT-Bold-sm-sA">
                السعودية, الرياض
              </p>
            </div>
          </div>
          {/* Amenties Icon */}
          <div className="d-flex  gap-3 justify-content-end align-items-center">
            <div className="d-flex justify-content-center align-items-center ">
              <i className={` iLT-orders-offer uLT-img-contain iLT-sA ms-2`} />
              <p className="m-0 card-text cLT-secondary-text fLT-Regular-sB fLT-Bold-sA ps-2">
                0
              </p>
              <p className="m-0 cLT-secondary-text fLT-Bold-sm-sA text-nowrap">
                {" "}
                عروض
              </p>
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <i className={`iLT-Advs-calendar uLT-img-contain iLT-sA ms-2`} />
              <p className="mb-0 cLT-secondary-text fLT-Bold-sm-sA text-nowrap">
                قبل 30 دقيقة
              </p>
            </div>
          </div>
        </div>
      ) : (
        false
      )}

      {/* Price Icons With Location */}
      {iconWithLocation === "priceIconWithLocation" ? (
        <div
          className={`card-body gap-3 d-flex justify-content-between ${
            phoneView ? "align-items-start" : "align-items-center"
          } ${phoneView ? "flex-column-reverse" : ""} p-0 w-100 flex-wrap`}
        >
          {/* Amenties Holder */}
          <div className="d-flex gap-3 flex-wrap  align-items-center">
            <div className="d-flex justify-content-center aling-items-center">
              <i
                className={`iLT-Listcard-location uLT-img-contain iLT-sA ms-2`}
              />
              <p className="mb-0 cLT-support2-text fLT-Bold-sm-sA main-color-in-sm">
                {locationName}
              </p>
            </div>
          </div>
          {/* Amenties Icon */}
          <div className="d-flex gap-3 flex-wrap justify-content-start align-items-center">
            <div className="d-flex justify-content-center align-items-center">
              <i
                className={` iLT-Advs-ksa-currency uLT-img-contain iLT-sA ms-2`}
              />
              <p className="mb-0 cLT-secondary-text fLT-Bold-sm-sA">
                {" "}
                <span> {price} </span> {currency}{" "}
              </p>
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <i className={`iLT-Advs-calendar uLT-img-contain iLT-sA ms-2`} />
              <p className="mb-0 cLT-secondary-text fLT-Bold-sm-sA text-nowrap">
                قبل {time}{" "}
              </p>
            </div>
          </div>
        </div>
      ) : (
        false
      )}

      {/* Amenties */}
      {amenties === "amenties" ? (
        <>
          {/* Amenties Holder */}
          <div className="d-flex gap-3 flex-wrap w-100 justify-content-start align-items-center">
            {orderData?.category
              ?.slice(0, 4)
              ?.map((amentiesOfCategory, idx) => {
                return (
                  <div key={idx} className="cLT-platinum-bg uLT-f-radius-sB">
                    <p className="mb-0 px-3 py-1 cLT-support2-text fLT-Regular-sA">
                      {amentiesOfCategory?.name}
                    </p>
                  </div>
                );
              })}
          </div>
        </>
      ) : (
        false
      )}

      {/* Freelancer Amenties */}
      {amenties === "areasOfCompetence" ? (
        <div className=" uLT-bd-f-secondary-sA uLT-f-radius-sB">
          <p className="mb-0 px-3 py-1 cLT-secondary-text fLT-Regular-sB">
            {areasOfCompetenceData}{" "}
          </p>
        </div>
      ) : (
        false
      )}

      {/* Freelancer Offer Amenties */}
      {offerAmenties === "offerAmenties" ? (
        <>
          <div className="d-flex justify-content-center gap-2 align-items-center">
            <i className={`iLT-offer-last-create uLT-img-contain iLT-sA `} />
            <p className="mb-0 cLT-smoke-text fLT-Regular-sA">
              قبل {offerAmentiesData}
            </p>
          </div>
        </>
      ) : (
        false
      )}

      {/* Freelancer [Icon - Name - Flag - Title] */}
      {amenties === "icon" ? (
        <div className="d-flex justify-content-between align-items-center py-3 uLT-bd-t-platinum-sA mt-3">
          <div className="d-flex align-items-center h-100  p-0">
            <i className={`iLT-Advs-user-icon uLT-img-contain iLT-sF `} />
            <div className="d-flex flex-column align-items-start">
              <div className="pe-2">
                <p className="m-0 ps-3 card-text fLT-Bold-sm-sA cLT-support2-text">
                  محمد صالح{" "}
                </p>
              </div>
              <p className="m-0 cLT-support2-text fLT-Regular-sB pe-2">
                {" "}
                مهندس برمجيات
              </p>
            </div>
          </div>
          <div className="d-flex justify-content-center aling-items-center">
            <i className={`iLT-Advs-calendar uLT-img-contain iLT-sA ms-2`} />
            <p className="mb-0 cLT-secondary-text fLT-Bold-sm-sA">
              قبل 30 دقيقة
            </p>
          </div>
        </div>
      ) : (
        false
      )}
    </div>
  );
};

export default AmentiesShared;
