import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import AdvertisingFormComponent from "../../../components/requestAQuote/OfferPriceDetails/AdvertisingForm/AdvertisingForm.component";
import AdvertisingUpdateFormComponent from "../../../components/requestAQuote/OfferPriceDetails/AdvertisingUpdateForm/AdvertisingUpdateForm.component";
import OfferPriceTitle from "../../../components/requestAQuote/OfferPriceDetails/OfferPriceTitle/OfferPriceTitle.component";
import { ChangeFotterState } from "../../../core/redux/reducers/FotterReducer.core";
import cls from "./FlancerAdvertisingOffer.pages.module.scss";

const FlancerAdvertisingOfferPage = () => {
  const param = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  const fotterStateHandler = () => {
    dispatch(ChangeFotterState(false));
  };
  useEffect(() => {
    fotterStateHandler();
  }, []);

  return (
    <div className={cls.main}>
      <div className={cls.Titlecontainer}>
        <OfferPriceTitle
          title={"ندعمك لنشر اعلاناتك"}
          description={
            "نربط اعلانك بمحركات البحث و نساعدك فى الظهور والوصول لعملائك"
          }
        />
      </div>
      <div className={cls.formContainer}>
        {location.pathname === "/advertising-price" && (
          <AdvertisingFormComponent />
        )}
        {location.pathname === `/advertising-price/${param?.id}` && (
          <AdvertisingUpdateFormComponent advsId={param?.id} />
        )}
      </div>
    </div>
  );
};

export default FlancerAdvertisingOfferPage;
