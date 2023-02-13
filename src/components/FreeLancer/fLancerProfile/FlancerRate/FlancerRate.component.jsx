import React from "react";
import StarRatings from "react-star-ratings";
import { arNumberConverter } from "../../../../utils/arNumberConverter";

const FlancerRate = ({ rate, count }) => {
  return (
    <div className="d-flex justify-content-between align-items-center pb-3">
      <p className="m-0 fLT-Regular-sB cLT-support2-text">جودة الشغل </p>
      <div className="d-flex" dir="ltr">
        <p>
          {Number(arNumberConverter(rate?.rate || 0))?.toFixed(1)}
          {count ? <span className="small mx-1">({count})</span> : <></>}
        </p>
        <StarRatings
          rating={Number(arNumberConverter(rate?.rate || 0))}
          starRatedColor="#faaf00"
          starDimension="24px"
          numberOfStars={Number(arNumberConverter(rate?.rate || 0))}
        />
      </div>
    </div>
  );
};

export default React.memo(FlancerRate);
