import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { advertisingLists } from "../../../../../../core/services/AdvertisingOfferServices/AdvertisingOfferServices.core";
import { cancelList } from "../../../../../../core/services/CancelationServices/CancelationServices.core";
import FlancerEditsControllerShared from "../../../../../../shared/FlancerController/FlancerEditsControllerShared/FlancerEditsController.shared";
import FlancerDescriptionBodyComponent from "../../../FlancerDescriptionBody/FlancerDescriptionBody.component";
import FlancerDescriptionTitleComponent from "../../../FlancerDescriptionTitle/FlancerDescriptionTitle.component";
import logoImageDefault from "../../../../../../assets/images/main-logo.svg";
import AmentiesShared from "../../../../../../shared/Amenties/Amenties.shared";
import CancelationShared from "../../../../../../shared/Modal/Modal/Cancelation.shared";
import { useDispatch, useSelector } from "react-redux";
import UserFeedBackShared from "../../../../../../shared/UserFeedBack/UserFeedBack.shared";
import { getMessages } from "../../../../../../core/redux/reducers/Messages/Messages.core";
const MyActiveAdvertisingComponent = ({
  data,
  loading,
  btnLoad,
  activeStatus,
  activeRefesh,
}) => {
  const dispatch = useDispatch();
  const [messages] = useSelector((state) => [state.messages]);
  const navigate = useNavigate();
  const refs = useRef();
  const [canceladvsID, setAdvsID] = useState();
  const [cancelIsReason, setCancelReason] = useState([]);

  const handleStopAdvs = (idx) => {
    refs.current.click();
    cancelList
      ._GET_CancelationList()
      .then((res) => {
        if (res.data.status === 1) {
          setCancelReason(res.data.data);
          setAdvsID(idx);
        }
      })
      .catch((err) => {});
  };
  const handleDeleteAdvs = (id) => {
    dispatch(
      getMessages({
        messages: "جاري إرسال طلبك",
        messageType: "warning",
        messageClick: true,
      })
    );
    advertisingLists
      ._Delete_Advertising(id)
      .then((res) => {
        activeRefesh(true);
        dispatch(
          getMessages({
            messages: res.data.message,
            messageType: "success",
            messageClick: true,
          })
        );
      })
      .catch((err) => {
        dispatch(
          getMessages({
            messages: err.response.data.message,
            messageType: "error",
            messageClick: true,
          })
        );
      });
    activeRefesh(false);
  };
  const routeAdvsDetails = (e, adsId) => {
    const btnTarget = e.target.innerText;
    if (btnTarget !== "حذف" && btnTarget !== "ايقاف" && btnTarget !== "تعديل") {
      navigate(`/advertising/advertise-details/${adsId}`);
    }
  };
  // AdvertisingUpdateFormComponent
  const handleEditAdvs = (id) => {
    navigate(`/advertising-price/${id}`);
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
      <UserFeedBackShared
        message={messages.messages}
        type={messages?.messageType}
        clickMe={messages?.messageClick}
      />
      <CancelationShared
        cancelType={"advs"}
        refe={refs}
        cancelRefesh={activeRefesh}
        reason={cancelIsReason}
        advsID={canceladvsID}
        id={"openModal"}
        dataTarget={"#myAdvertising"}
        modalId={"myAdvertising"}
      />
      {activeStatus === 3 && data?.length !== 0 ? (
        <>
          {data?.map((adData, idx) => {
            return (
              <div
                onClick={(e) => {
                  routeAdvsDetails(e, adData.id);
                }}
                className={"uLT-click"}
                key={idx}
              >
                <div
                  key={idx}
                  className="LT-myAdvs-grid uLT-f-radius-sB uLT-bd-f-platinum-sA mb-3"
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
                      <source
                        src={adData?.document[0]?.file}
                        type="video/mp4"
                      />
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
                    <div className="LT-myAdvs-controller">
                      <FlancerEditsControllerShared
                        deletCheck={btnLoad}
                        stopRequest={() => handleStopAdvs(adData?.id)}
                        deleteRequest={() => handleDeleteAdvs(adData?.id)}
                        editRequest={() => handleEditAdvs(adData?.id)}
                        type={adData?.status?.id}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <div className="d-flex flex-column justify-content-center align-items-center w-100 h-100">
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

export default React.memo(MyActiveAdvertisingComponent);
