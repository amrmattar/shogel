import React, { useCallback, useEffect, useMemo } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import OfferPriceForm from '../../../components/requestAQuote/OfferPriceDetails/OfferPriceForm/OfferPriceForm.component'
import OfferPriceTitle from '../../../components/requestAQuote/OfferPriceDetails/OfferPriceTitle/OfferPriceTitle.component'
import OfferUpdateFormComponent from '../../../components/requestAQuote/OfferPriceDetails/OfferUpdateForm/OfferUpdateForm.component'
import './ClientOfferPrice.page.scss'
const ClientOfferPricePage = () => {
    const param = useParams()
    const location = useLocation()

    return (
        <div className="h-100 position-relative">
            <div className="container-fluid py-5 px-4 cLT-Gradian-Linear-Main">
                <OfferPriceTitle title={'اخبرنا عن اي شغل تريد انجازه'} description={'أنت على بعد خطوة من كشف سوق العمل و الوصول للمشتغلين المستعدين لخدمتك'} />
            </div>
            <div className="container LT-offer-price-position px-0 position-relative">
                {location.pathname === '/offer-price' &&
                    <OfferPriceForm />
                }
                {location.pathname === `/update-offer-price/${param?.id}` &&
                    <OfferUpdateFormComponent taskId={param?.id} />
                }
            </div>
        </div>
    )
}

export default ClientOfferPricePage
