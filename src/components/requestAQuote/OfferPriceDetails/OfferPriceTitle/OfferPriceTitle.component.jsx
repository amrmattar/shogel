import React from 'react'

const OfferPriceTitle = ({ title, description }) => {
    return (
        <div className="container pt-5 px-4">
            <p className="m-0 pb-4 fLT-Bold-sE cLT-white-text">{title}</p>
            <p className="pb-4 fLT-Regular-sE cLT-white-text">{description}</p>
        </div>
    )
}

export default OfferPriceTitle
