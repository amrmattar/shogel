import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import AmentiesShared from "../../../../../../shared/Amenties/Amenties.shared";
import FlancerEditsControllerShared from "../../../../../../shared/FlancerController/FlancerEditsControllerShared/FlancerEditsController.shared";
import FlancerDescriptionBodyComponent from "../../../FlancerDescriptionBody/FlancerDescriptionBody.component";
import FlancerDescriptionTitleComponent from "../../../FlancerDescriptionTitle/FlancerDescriptionTitle.component";
import "./AllAdvertisingController.component.scss";
import logoImageDefault from "../../../../../../assets/images/main-logo.svg";
import CancelationShared from "../../../../../../shared/Modal/Modal/Cancelation.shared";
import { advertisingLists } from "../../../../../../core/services/AdvertisingOfferServices/AdvertisingOfferServices.core";
import { useNavigate } from "react-router-dom";
import UserFeedBackShared from "../../../../../../shared/UserFeedBack/UserFeedBack.shared";
import { getMessages } from "../../../../../../core/redux/reducers/Messages/Messages.core";
import { useDispatch, useSelector } from "react-redux";
import { cancelList } from "../../../../../../core/services/CancelationServices/CancelationServices.core";
const AllAdvertisingControllerComponent = ({
  data,
  loading,
  allAdvsRefresh,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [messages] = useSelector((state) => [state.messages]);

  const refes = useRef();
  const [canceladvsID, setAdvsID] = useState();
  const [cancelReason, setCancelReason] = useState([]);
  const handleStopAdvs = (idx) => {
    cancelList
      ._GET_CancelationList()
      .then((res) => {
        if (res.data.status === 1) {
          setCancelReason(res.data.data);
          setAdvsID(idx);
          refes.current.click();
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
        allAdvsRefresh(true);
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
    allAdvsRefresh(false);
  };
  const handleEditAdvs = (id) => {
    navigate(`/advertising-price/${id}`);
  };

  const routeAllAdvsDetails = (e, adsId) => {
    const btnTarget = e.target.innerText;
    if (
      btnTarget !== "حذف" &&
      btnTarget !== "ايقاف" &&
      btnTarget !== "تعديل" &&
      btnTarget !== "تحديث"
    ) {
      navigate(`/advertising/advertise-details/${adsId}`);
    }
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
      {data?.length !== 0 ? (
        <>
          <CancelationShared
            cancelType={"advs"}
            cancelRefesh={allAdvsRefresh}
            refe={refes}
            reason={cancelReason}
            advsID={canceladvsID}
            id={"openModal"}
            dataTarget={"#allAdvertising"}
            modalId={"allAdvertising"}
          />
          {data?.map((adData, idx) => {
            return (
              <div
                key={idx}
                onClick={(e) => routeAllAdvsDetails(e, adData.id)}
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
                  <div className="LT-myAdvs-title  ">
                    <FlancerDescriptionTitleComponent
                      fontSize={"fLT-Bold-sm-sB"}
                      descriptionTitle={adData?.name}
                    />
                    <FlancerDescriptionBodyComponent
                      fontSize={"text-ellipsis2 fLT-Regular-sB "}
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
                      stopRequest={() => handleStopAdvs(adData?.id)}
                      deleteRequest={() => handleDeleteAdvs(adData?.id)}
                      editRequest={() => handleEditAdvs(adData?.id)}
                      updateRequest={() => handleEditAdvs(adData?.id)}
                      type={adData?.status?.id}
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

export default AllAdvertisingControllerComponent;
