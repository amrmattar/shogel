import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";

import OrderListCardComponent from "../../../../components/OrdersComponent/OrderListCard/OrderListCard.component";
import { userOfferPrice } from "../../../../core/services/OfferPriceService/OfferPriceService.core";
import AmentiesShared from "../../../../shared/Amenties/Amenties.shared";

const MyFieldSpecialization = ({ offerStatus, setPagination }) => {
  const param = useParams();

  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [vistorUser, getSearchKey] = useSelector((state) => [
    state.authentication.loggedIn,
    state.search,
  ]);

  useEffect(() => {
    userOfferPrice
      ._GET_CopyList(
        5,
        true,
        param.num,
        offerStatus !== null ? offerStatus : ""
      )
      .then((res) => {
        setPagination(res.data);
        setIsLoading(false);
        setList(res.data.data);
      });
  }, [offerStatus, setPagination, param.num]);

  return (
    <>
      {isLoading ? (
        <div className="position-relative d-flex justify-content-center align-items-center w-100 h-100 py-4 mt-4">
          <div className="LT-logo-border-forwards-loading"></div>
          <div
            className="iLT-shogol-logo App-logo-animation uLT-img-contain uLT-f-radius-sB img-fluid~ uLT-f-radius-sB"
            style={{ width: "120px", height: "120px" }}
          ></div>
          <div className="LT-logo-border-backwards-loading"></div>
        </div>
      ) : (
        <>
          {list?.length ? (
            <>
              {list?.map((offer, ix) => {
                return (
                  <NavLink
                    className="card px-3 pt-3 mb-3 uLT-f-radius-sB uLT-list-style"
                    to={`/orders/order-details/${offer.id}`}
                    key={ix}
                  >
                    <OrderListCardComponent
                      roll={vistorUser}
                      offer={offer}
                      isOrder
                      amentiesSelector={
                        <AmentiesShared
                          orderData={offer}
                          amentiesWithIcon="orderAmenties"
                        />
                      }
                      orderDescription={offer?.description}
                      orderTitle={offer?.name}
                      orderStyle={"uLT-bd-b-platinum-sA"}
                      orderStatus={offer?.status?.name}
                    />{" "}
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
        </>
      )}
    </>
  );
};

export default MyFieldSpecialization;
