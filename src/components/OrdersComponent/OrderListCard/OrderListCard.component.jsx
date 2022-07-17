import { useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import './OrderListCard.component.scss'
const OrderListCardComponent = ({ amentiesSelector, orderDescription, orderStyle, orderTitle, orderStatus, orderStyleHolder, roll }) => {
    const location = useLocation()
    const param = useParams()
    const [showDescription, setShowDescription] = useState(false)
    return (
        <>
            {/* List Card Row [Holder] */}
            <div className={`${orderStyleHolder}`}>
                {/* Status */}
                <div className="d-flex align-items-center gap-3 ">
                    <p className='m-0 fLT-Regular-sA cLT-smoke-text'>حالة الطلب</p>
                    <p className='m-0 uLT-f-radius-sB px-3 py-1 fLT-Regular-sA cLT-secondary-bg cLT-white-text '>{orderStatus}</p>
                </div>
                {/* List Card User [Holder] */}
                <div className={`d-flex flex-column gap-3 justify-content-center align-items-start py-3 pe-0  ${orderStyle}`}>
                    {/*  Order [Holder] */}
                    <p className="m-0 fLT-Bold-sA cLT-support2-text">
                        {orderTitle}
                    </p>
                    <div className="d-flex justify-content-between aling-items-end">
                        {/* Card Description */}
                        <div className="w-100">
                        {roll === undefined | roll === true ?
                            <p className={`m-0 fLT-Regular-sB cLT-gray-text w-100 xx ${showDescription === true ? '' : 'text-ellipsis3'}  ${location.pathname === `/orders/order-details/${param?.id}` ? '' : 'text-ellipsis3'}`} dangerouslySetInnerHTML={{ __html: orderDescription }} ></p> : ''
                        }
                        </div>
                        <div className="d-flex align-items-end p-0">
                        {location.pathname === `/orders/order-details/${param?.id}` &&
                            <div onClick={() => setShowDescription(!showDescription)} 
                            className='d-flex justify-content-center align-items-center gap-2 LT-readMore-holder-button cLT-platinum-b~g uLT-f-radius px-2  uLT-click'>
                                {showDescription === false ? 
                                <>
                            <div  className='p-0 fLT-Regular-sA cLT-secondary-text text-nowrap'> المزيد</div>
                            <i className={` iLT-read-arrow-down uLT-img-contain  LT-read-more-arrow `} style={{width:'10px',height:'10px'}}></i>
                                </>
                                    :
                                    <>
                            <div  className='p-0 fLT-Regular-sA cLT-secondary-text text-nowrap'> إخفاء</div>
                            <i className={` iLT-read-arrow-up uLT-img-contain  LT-read-more-arrow `} style={{width:'10px',height:'10px'}}></i>
                                    </>
                        }
                            </div>
                        }
                        </div>
                    </div>
                </div>
                {/* Card Amenties */}
                {amentiesSelector}
            </div>
        </>
    )
}
export default OrderListCardComponent