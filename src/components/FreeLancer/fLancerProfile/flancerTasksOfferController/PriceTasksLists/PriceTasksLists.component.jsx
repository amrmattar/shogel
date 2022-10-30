import React, { Fragment, useCallback, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { userOfferPrice } from "../../../../../core/services/OfferPriceService/OfferPriceService.core";
import AmentiesShared from "../../../../../shared/Amenties/Amenties.shared";
import OrderListCardComponent from "../../../../OrdersComponent/OrderListCard/OrderListCard.component";

const PriceTasksListsComponent = ({
  setPagination,
  offerStatus,
  type,
  isMyList,
}) => {
  const param = useParams();
  const [loading, setloading] = useState(false);
  const [myOfferList, setMyOfferList] = useState();
  const getAllOfferTasksList = useCallback(() => {
    if (type === "priceListOffer") {
      userOfferPrice
        ._GET_MyOfferGeneralLists(
          10,
          true,
          param.num,
          offerStatus !== null ? offerStatus : ""
        )
        .then((res) => {
          setPagination(res.data);
          setloading(true);
          setMyOfferList(res.data.data);
        });
    }
  }, [param.num, offerStatus, setPagination, type]);

  useEffect(() => {
    getAllOfferTasksList();
  }, [getAllOfferTasksList]);

  if (!loading)
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
    <Fragment>
      {myOfferList?.length !== 0 ? (
        <>
          {myOfferList?.map((data, idx) => {
            return (
              <NavLink
                className="card px-3 pt-3 mb-3 uLT-f-radius-sB uLT-list-style"
                to={`/orders/order-details/${data?.id}`}
                key={idx}
              >
                <OrderListCardComponent
                  key={idx}
                  orderTitle={data?.name}
                  orderStatus={data?.status?.name}
                  orderDescription={data?.description}
                  isMyList={isMyList}
                  amentiesSelector={
                    <AmentiesShared
                      orderData={data}
                      amentiesWithIcon="orderAmenties"
                    />
                  }
                />
              </NavLink>
            );
          })}
        </>
      ) : (
        <div className="d-flex flex-column justify-content-center align-items-center w-100  ">
          <div
            className="imLT-main-logo uLT-img-contain uLT-f-radius-sB img-fluid uLT-f-radius-sB"
            style={{ width: "200px", height: "200px" }}
          ></div>
          <p className="mb-0 fLT-Bold-sD cLT-gray-text">لا يوجد طلبـــات</p>
        </div>
      )}
    </Fragment>
  );
};

export default PriceTasksListsComponent;
