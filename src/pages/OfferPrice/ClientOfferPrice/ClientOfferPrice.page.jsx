import React, { useCallback, useEffect, useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import OfferPriceForm from "../../../components/requestAQuote/OfferPriceDetails/OfferPriceForm/OfferPriceForm.component";
import OfferPriceTitle from "../../../components/requestAQuote/OfferPriceDetails/OfferPriceTitle/OfferPriceTitle.component";
import OfferUpdateFormComponent from "../../../components/requestAQuote/OfferPriceDetails/OfferUpdateForm/OfferUpdateForm.component";
import cls from "./ClientOfferPrice.page.module.scss";
import { ChangeFotterState } from "../../../core/redux/reducers/FotterReducer.core";
import { useDispatch } from "react-redux";

const ClientOfferPricePage = () => {
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
          noWrap
          title={"   اخبرنا عن اي شغل تريد انجازه"}
          description={
            "انت علي بعد خطوة من كشف سعر السوق والوصول للمشتغلين المستعدين لخدمتك"
          }
        />
      </div>
      <div className={cls.formContainer}>
        {location.pathname === "/offer-price" && <OfferPriceForm />}
        {location.pathname === `/update-offer-price/${param?.id}` && (
          <OfferUpdateFormComponent taskId={param?.id} />
        )}
      </div>
    </div>
  );
};

export default ClientOfferPricePage;
