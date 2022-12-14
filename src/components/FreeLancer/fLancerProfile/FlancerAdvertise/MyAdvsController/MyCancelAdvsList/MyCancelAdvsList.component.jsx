import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AmentiesShared from "../../../../../../shared/Amenties/Amenties.shared";
import FlancerDescriptionBodyComponent from "../../../FlancerDescriptionBody/FlancerDescriptionBody.component";
import FlancerDescriptionTitleComponent from "../../../FlancerDescriptionTitle/FlancerDescriptionTitle.component";
import logoImageDefault from "../../../../../../assets/images/main-logo.svg";
const MyCancelAdvsListComponent = ({ data, cancelStatus, loading }) => {
  const navigate = useNavigate();
  const routeCancelAdvsDetails = (adsId) => {
    navigate(`/advertising/advertise-details/${adsId}`);
  };
  if (loading)
    return (
      <div className="position-relative d-flex justify-content-center align-items-center w-100 h-100 py-4">
        <div className="LT-logo-border-forwards-loading"></div>
        <div
          className="iLT-shogol-logo App-logo-animation uLT-img-contain uLT-f-radius-sB img-fluid~ uLT-f-radius-sB"
          style={{ width: "120px", height: "120px" }}
        ></div>
        <div className="LT-logo-border-backwards-loading"></div>
      </div>
    );
  return (
    <>
      {cancelStatus === 7 && data?.length !== 0 ? (
        <>
          {data?.map((adData, idx) => {
            return (
              <div
                key={idx}
                onClick={() => routeCancelAdvsDetails(adData.id)}
                className="uLT-click LT-myAdvs-grid uLT-f-radius-sB uLT-bd-f-platinum-sA mb-3"
              >
                {/* List Card [Image] */}
                {!adData?.document[0]?.file.match(".mp4") ? (
                  adData?.document[0]?.file ? (
                    <picture className="LT-myAdvs-image  ">
                      <img
                        src={adData?.document[0]?.file}
                        alt=""
                        className="uLT-bd-f-platinum-sA img-fluid uLT-f-radius-sB"
                        style={{
                          width: "100%",
                          height: "100%",
                          aspectRatio: "1.5/1",
                        }}
                      />
                    </picture>
                  ) : (
                    <picture className="LT-myAdvs-image">
                      <img
                        src={logoImageDefault}
                        alt=""
                        className=" uLT-f-radius-sB"
                        style={{
                          width: "100%",
                          height: "100%",
                          aspectRatio: "4/1",
                        }}
                      />
                    </picture>
                  )
                ) : (
                  <video
                    width="100%"
                    style={{
                      objectFit: "fill",
                      height: "100%",
                      borderRadius: "15px",
                    }}
                    className="LT-myAdvs-image"
                    controls
                    autoPlay={true}
                  >
                    <source src={adData?.document[0]?.file} type="video/mp4" />
                  </video>
                )}
                {/* Details [Section] */}
                <div className="LT-myAdvs-details">
                  {/* Card title */}
                  <div className="LT-myAdvs-title ">
                    <FlancerDescriptionTitleComponent
                      descriptionTitle={adData?.name}
                    />
                    <FlancerDescriptionBodyComponent
                      descriptionBody={adData?.description}
                    />
                  </div>
                  {/* Card Amenties */}
                  <div className="LT-myAdvs-amenties">
                    <AmentiesShared
                      iconWithLocation={"priceIconWithLocation"}
                      price={adData.price}
                      currency={adData?.currency.name}
                      locationName={`${adData?.user?.country?.name},${adData?.user?.city?.name} `}
                      time={adData?.created_at_value}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <div
          className="d-flex flex-column justify-content-center align-items-center w-100  "
          style={{ height: "100% " }}
        >
          <div
            className="imLT-main-logo uLT-img-contain uLT-f-radius-sB img-fluid uLT-f-radius-sB"
            style={{ width: "200px", height: "200px" }}
          ></div>
          <p className="mb-0 fLT-Bold-sD cLT-gray-text">لا يوجد اعلانــــات</p>
        </div>
      )}
    </>
  );
};

export default MyCancelAdvsListComponent;
