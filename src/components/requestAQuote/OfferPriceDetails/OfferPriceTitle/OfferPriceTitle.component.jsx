import React from "react";
import cls from "./OfferPriceTitle.module.scss";

const no_wrap_style = {
  width: "100%",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  overflow: "hidden",
};

const OfferPriceTitle = ({ title, description, noWrap }) => {
  return (
    <div className={cls.container}>
      <p style={noWrap ? no_wrap_style : {}} className={cls.title}>
        {title}
      </p>
      <p style={noWrap ? no_wrap_style : {}} className={cls.description}>
        {description}
      </p>
    </div>
  );
};

export default OfferPriceTitle;
