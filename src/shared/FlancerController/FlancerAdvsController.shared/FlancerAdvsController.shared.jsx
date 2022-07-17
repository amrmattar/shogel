import React, { useEffect, useState } from 'react'
import './FlancerAdvsController.shared.scss'
const FlancerAdvsControllerShared = ({children , onClick }) => {
    return (
        <div>
            {/* Order Controller[Holder] */}
                {/* Order Type Navigator [Holder] */}
                <div className="mb-3">
                    <label htmlFor="" className='cLT-main-text fLT-Bold-sm-sB mb-3'> نوع الطلب </label>
                    {/* Order Navigator List [Holder] */}
                    <ul className="nav nav-pills d-flex gap-3 " id="pills-tab" role="tablist">
                        {/* Request My Job [Holder] */}
                        <li className="nav-item" role="presentation1">
                            <button  onClick={onClick} className="nav-link active px-2 py-1" id={'showAllAds'} data-bs-toggle="pill" data-bs-target="#all-advertising" type="button" role="tab" aria-controls="all-advertising" aria-selected="false">الكل</button>
                        </li>
                        <li className="nav-item" role="presentation2">
                            <button  onClick={onClick} className="nav-link px-2 py-1" id="showActiveAds" data-bs-toggle="pill" data-bs-target="#active-advertising" type="button" role="tab" aria-controls="active-advertising" aria-selected="false">الإعلانات النشطه</button>
                        </li>
                        {/* Request I Made [Holder] */}
                        <li className="nav-item" role="presentation3">
                            <button  onClick={onClick} className="nav-link  px-2 py-1" id="showCancelAds" data-bs-toggle="pill" data-bs-target="#cancel-advertising" type="button" role="tab" aria-controls="cancel-advertising" aria-selected="false">الإعلانات المتوقفة</button>
                        </li>
                        <li className="nav-item" role="presentation3">
                            <button  onClick={onClick} className="nav-link  px-2 py-1" id="showExpiredAds" data-bs-toggle="pill" data-bs-target="#update-advertising" type="button" role="tab" aria-controls="update-advertising" aria-selected="false">الإعلانات الغير نشطه</button>
                        </li>
                    </ul>
                </div>
            {/* Order Body Component  [Selector] */}
            {children ?
                <>
                    <div className="tab-content" id="pills-tabContent">
                        <div className="tab-pane fade  show active" id="all-advertising" role="tabpanel" aria-labelledby={'0'}>{children?.myAllAdvsList}</div>
                        <div className="tab-pane fade" id="active-advertising" role="tabpanel" aria-labelledby="3">{children?.myActiveAdvsList}</div>
                        <div className="tab-pane fade" id="cancel-advertising" role="tabpanel" aria-labelledby="7">{children?.myCancelAdsList && children?.myCancelAdsList}</div>
                        <div className="tab-pane fade" id="update-advertising" role="tabpanel" aria-labelledby="9">{children?.myExpiredAdsList}</div>

                    </div>
                </>
                : <p className='mb-0 bg-danger' >loading</p>
            }
        </div>
    )
}
export default FlancerAdvsControllerShared
