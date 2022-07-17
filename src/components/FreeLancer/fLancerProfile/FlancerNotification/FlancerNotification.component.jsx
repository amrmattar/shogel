import React from 'react'

const FlancerNotificationComponent = () => {
    return (
        // { Notification Section [Holder] }
        <div className=' d-flex flex-column d-md-flex flex-md-row justify-content-md-between align-items-md-center gap-3 p-0 mb-4' >
            {/* Notification Info [Holder] */}
            <div className="pt-2 pb-0 d-flex flex-column align-items-center d-md-flex flex-md-row align-items-md-start  gap-3">
                {/* Notification [Icon] */}
                <div className="d-flex h-100 p-0">
                    <div className="uLT-f-radius-sB uLT-bd-f-platinum-sA d-flex align-items-center justify-content-center mb-0 card-title ">
                        <i className={`iLT-Advs-user uLT-img-contain iLT-sB m-2`}></i>
                    </div>
                </div>
                {/* Notification [Title And Description] */}
                <div className="">
                    <p className="mb-3 mb-md-0 fLT-Regular-sB cLT-secondary-text">تم قبول عرضك علي طلب محمد صالح </p>
                    <p className="m-0 fLT-Bold-sA cLT-support2-text">احتاج الي مطور مكدس كامل للعمل معي في بعض المشاريع</p>
                </div>
            </div>
            {/* Notification Calendar */}
            <div className="d-flex justify-content-center align-items-center">
                <i className={`iLT-notification-calendar uLT-img-contain iLT-sA ms-2`}></i>
                <p className="mb-0 cLT-smoke-text fLT-Regular-sA text-nowrap">قبل 30 دقيقة</p>
            </div>
        </div>
    )
}

export default FlancerNotificationComponent
