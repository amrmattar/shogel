import React from "react";
import cls from "./OfferPriceTitle.module.scss";
const OfferPriceTitle = ({ title, description }) => {
  return (
    <div className={cls.container}>
      <p className={cls.title}>{title}</p>
      <p className={cls.description}>{description}</p>
    </div>
  );
};

export default OfferPriceTitle;
