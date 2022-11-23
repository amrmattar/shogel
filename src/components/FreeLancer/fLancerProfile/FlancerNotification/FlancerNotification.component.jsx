import React from "react";
import { useNavigate } from "react-router-dom";

const FlancerNotificationComponent = ({ notification }) => {
  const navigate = useNavigate();

  const clickNotificationHandelar = () => {
    if (
      notification?.notifiable_type === "task" ||
      notification?.notifiable_type === "offer"
    ) {
      return navigate(`/orders/order-details/${notification?.notifiable_id}`);
    }

    if (
      notification?.notifiable_type === "adv" ||
      notification?.notifiable_type === "advertising"
    ) {
      return navigate(
        `/advertising/advertise-details/${notification?.notifiable_id}`
      );
    }

    if (notification?.notifiable_type === "user") {
      return navigate(
        `/employed/freelancer-profile/${notification?.notifiable_id}`
      );
    }
  };
  return (
    // { Notification Section [Holder] }
    <div
      onClick={clickNotificationHandelar}
      className={`${
        notification.notifiable_type !== "system" ? "cu-pointer" : ""
      } border rounded-3 px-3 py-4 d-flex flex-column d-md-flex flex-md-row justify-content-md-between align-items-md-center gap-3 p-0 mb-4`}
    >
      {/* Notification Info [Holder] */}
      <div className="pt-2 pb-0 d-flex flex-column align-items-center d-md-flex flex-md-row align-items-md-start  gap-3">
        {/* Notification [Icon] */}
        <div className="d-flex h-100 p-0">
          <div className="uLT-f-radius-sB uLT-bd-f-platinum-sA d-flex align-items-center justify-content-center mb-0 card-title ">
            <i className={`iLT-Advs-user uLT-img-contain iLT-sB m-2`}></i>
          </div>
        </div>
        {/* Notification [Title And Description] */}
        <div className="">
          <p className="mb-3 mb-md-0 fLT-Regular-sB cLT-secondary-text">
            {notification?.title?.value}
          </p>
          <p className="m-0 fLT-Bold-sA cLT-support2-text">
            {notification?.description?.value}
          </p>
        </div>
      </div>
      {/* Notification Calendar */}
      <div className="d-flex justify-content-center align-items-center">
        <i
          className={`iLT-notification-calendar uLT-img-contain iLT-sA ms-2`}
        />
        <p className="mb-0 cLT-smoke-text fLT-Regular-sA text-nowrap">
          {notification?.created_at}
        </p>
      </div>
    </div>
  );
};

export default FlancerNotificationComponent;
