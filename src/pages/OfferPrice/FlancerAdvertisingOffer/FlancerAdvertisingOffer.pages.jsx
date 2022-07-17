import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import AdvertisingFormComponent from '../../../components/requestAQuote/OfferPriceDetails/AdvertisingForm/AdvertisingForm.component'
import AdvertisingUpdateFormComponent from '../../../components/requestAQuote/OfferPriceDetails/AdvertisingUpdateForm/AdvertisingUpdateForm.component'
import OfferPriceTitle from '../../../components/requestAQuote/OfferPriceDetails/OfferPriceTitle/OfferPriceTitle.component'
import './FlancerAdvertisingOffer.pages.scss'
const FlancerAdvertisingOfferPage = () => {
    const param = useParams()
    const location = useLocation()
    return (
        <div className="h-100 position-relative">
            <div className="container-fluid py-5 px-4 cLT-Gradian-Linear-Main">
                <OfferPriceTitle title={'ندعمك لنشر اعلاناتك'} description={'نربط اعلانك بمحركات البحث و نساعدك فى الظهور والوصول لعملائك'} />
            </div>
            <div className="container LT-advs-price-position px-0 position-relative">
                {location.pathname === '/advertising-price' &&
                    <AdvertisingFormComponent />
                }
                {location.pathname === `/advertising-price/${param?.id}` &&
                    <AdvertisingUpdateFormComponent advsId={param?.id} />
                }
            </div>
        </div>
    )
}

export default FlancerAdvertisingOfferPage