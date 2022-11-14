import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { arNumberConverter } from "../../../utils/arNumberConverter";
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
  isMyList,
  isOrder,
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
          {isMyList ? (
            <span>{orderStatus}</span>
          ) : isOrder ? (
            <>
              {Number(arNumberConverter(offer?.offerCount || 0)) ? (
                <span className="text-dark">
                  عدد العروض:{" "}
                  <span className="text-primary">
                    {Number(arNumberConverter(offer?.offerCount || 0))}
                  </span>
                </span>
              ) : (
                <span>كن اول من يقدم عرض !</span>
              )}
            </>
          ) : (
            <></>
          )}
        </div>

        <div
          className={`${cls.description} text-muted small`}
          dangerouslySetInnerHTML={{ __html: orderDescription }}
        />

        {amentiesSelector}
      </div>
    </>
  );
};
export default OrderListCardComponent;
