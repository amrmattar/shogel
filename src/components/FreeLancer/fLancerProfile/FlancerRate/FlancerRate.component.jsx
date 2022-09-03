import React from "react";
import StarRatings from "react-star-ratings";

const FlancerRate = ({ rate }) => {
  return (
    <div className="d-flex justify-content-between align-items-center pb-3">
      <p className="m-0 fLT-Regular-sB cLT-support2-text">جودة الشغل </p>
      <div className="d-flex" dir="ltr">
        <p>{rate?.rate?.toFixed(1)}</p>
        <StarRatings
          rating={rate?.rate}
          starRatedColor="#faaf00"
          starDimension="24px"
          numberOfStars={5}
        />
      </div>
    </div>
  );
};

export default React.memo(FlancerRate);
