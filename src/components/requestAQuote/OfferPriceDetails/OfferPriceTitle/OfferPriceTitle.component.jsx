import React from "react";
import cls from "./OfferPriceTitle.module.scss";

const no_wrap_style = {
  width: "100%",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  overflow: "hidden",
};

const OfferPriceTitle = ({ title, description, noWrap, smWhite }) => {
  return (
    <div className={cls.container}>
      <p
        style={noWrap ? no_wrap_style : {}}
        className={`${smWhite ? cls.smallTitle : ""} ${cls.title}`}
      >
        {title}
      </p>
      <p
        style={noWrap ? no_wrap_style : {}}
        className={`${smWhite ? cls.sm_description : ""} ${cls.description}`}
      >
        {description}
      </p>
    </div>
  );
};

export default OfferPriceTitle;
