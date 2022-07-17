import React from 'react'
import StarRatings from "react-star-ratings";

const FlancerRate = ({ rateNumber }) => {
    return (
        <>
            {/* Business [Quality] */}
            <div className="d-flex justify-content-between align-items-center pb-3">
                <p className="m-0 fLT-Regular-sB cLT-support2-text" >جودة الشغل </p>
                <div className="" dir="ltr">
                    <StarRatings rating={rateNumber} starRatedColor="#faaf00" starDimension="24px" numberOfStars={5} />
                </div>
            </div>
            {/* Business [Price] */}
            <div className="d-flex justify-content-between align-items-center pb-3">
                <p className="m-0 fLT-Regular-sB cLT-support2-text" >السعر مقابل الشغل </p>
                <div className="" dir="ltr">
                    <StarRatings rating={rateNumber} starRatedColor="#faaf00" starDimension="24px" numberOfStars={5} />
                </div>
            </div>
            {/* Business [Design] */}
            <div className="d-flex justify-content-between align-items-center pb-3">
                <p className="m-0 fLT-Regular-sB cLT-support2-text" >التصميم لمقدم الشغل </p>
                <div className="" dir="ltr">
                    <StarRatings rating={rateNumber} starRatedColor="#faaf00" starDimension="24px" numberOfStars={5} />
                </div>
            </div>
        </>
    )
}

export default React.memo(FlancerRate)
