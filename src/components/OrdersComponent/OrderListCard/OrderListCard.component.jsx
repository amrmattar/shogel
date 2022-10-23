import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import cls from "./OrderListCard.component.module.scss";
const OrderListCardComponent = ({
  amentiesSelector,
  orderDescription,
  orderStyle,
  orderTitle,
  offer,
  orderStatus,
  orderStyleHolder,
  roll,
}) => {
  const location = useLocation();
  const param = useParams();
  const [showDescription, setShowDescription] = useState(true);
  return (
    <>
      <div className={cls.main}>
        {/* <div className={cls.offer}>
          <i className={` iLT-orders-offer uLT-img-contain iLT-sA ms-2`}></i>
          <p className="m-0 card-text cLT-secondary-text fLT-Regular-sB fLT-Bold-sA ps-2">
            {offer?.offerCount}
          </p>
          <p className="m-0 cLT-secondary-text fLT-Bold-sm-sA text-nowrap">
            {" "}
            عروض
          </p>
        </div> */}
        <div className="d-flex align-items-center justify-content-between">
          <p className={`${cls.title} fs-5 mb-3`}>{orderTitle}</p>
          {orderStatus}
        </div>

        <div
          className={`${cls.description} text-muted`}
          dangerouslySetInnerHTML={{ __html: orderDescription }}
        />

        {amentiesSelector}
      </div>
    </>
  );
};
export default OrderListCardComponent;
