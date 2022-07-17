import React from 'react'
import { useSelector } from 'react-redux'
import './FlancerTabsController.shared.scss'
const FlancerTabsControllerShared = ({ children, Datafilter, tabSelect, loading }) => {
    const [statusData, userRole] = useSelector((state) => [state.coreData.status, state.userRole.userRole])
    const handleTabsChange = (e) => {
        tabSelect(e.target.id)
    }
    const handleChangeFilter = (e) => {
        const option = e.target.childNodes[e.target.selectedIndex].getAttribute('id');
        Datafilter(option)
    }

    return (
        <div>
            {/* Order Controller[Holder] */}
            <div className="row- m-0 d-flex justify-content-start  gap-3 my-4">
                {/* Order Type Navigator [Holder] */}
                <div className="col-6 p-0">
                    <label htmlFor="" className='cLT-main-text fLT-Bold-sm-sB mb-3'> نوع الطلب </label>
                    {/* Order Navigator List [Holder] */}
                    <ul className="nav nav-pills d-flex gap-3 " id="pills-tab" role="tablist" onClick={(e) => handleTabsChange(e)}>
                        {/* Request Offer Price [Holder] */}
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active px-2 py-1" id="priceListOffer" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">طلبات عرض سعر</button>
                        </li>
                        {/* Request My Job [Holder] */}
                        <li className="nav-item" role="presentation">
                            <button className="nav-link  px-2 py-1" id="hireMeRequests" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">طلبات شغلني</button>
                        </li>
                        {/* Request I Made [Holder] */}
                        {userRole !== '2' &&
                        <li className="nav-item" role="presentation">
                            <button className="nav-link  px-2 py-1" id="RequestsMade" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">طلبات قدمت عليها</button>
                        </li>
                        }
                    </ul>
                </div>
                {/* Order Select Option [Holder] */}
                <div className="d-flex gap-3 col px-0" >
                    {/* Order Status [Select Option] */}
                    <div className="w-100 d-flex flex-column" >
                        <label htmlFor="" className='cLT-main-text fLT-Bold-sm-sB mb-3'> حالة الطلب </label>
                        <div className="uLT-bd-f-platinum-sA uLT-f-radius-sB px-2">
                            <select onChange={(e) => handleChangeFilter(e)} className=" w-100 cLT-secondary-text uLT-outline-0 uLT-border-0 form-select-sm " aria-label=".form-select-sm example" defaultValue={'الكل'}  >
                                <option value="الكل">الكل</option>
                                {statusData?.map((data) => {
                                    return <option key={data?.id} id={data?.id} value={data?.name}>{data?.name}</option>
                                })}
                            </select>
                        </div>
                    </div>
                    {/* Order Details [Select Option] */}
                    {/* <div className="w-100 d-flex flex-column" >
                        <label htmlFor="" className='cLT-main-text fLT-Bold-sm-sB mb-3'> تفاصيل الطلب</label>
                        <div className="uLT-bd-f-platinum-sA uLT-f-radius-sB px-2">
                            <select onChange={(e) => handleChangeFilter(e)} className=" w-100 cLT-secondary-text uLT-outline-0 uLT-border-0 form-select-sm " aria-label=".form-select-sm example" defaultValue={'الكل'}  >
                                <option value="الكل">الكل</option>
                                {taskDetailsStatus?.map((data) => {
                                    return <option key={data?.id} id={data?.id} value={data?.name}>{data?.name}</option>
                                })}
                            </select>
                        </div>
                    </div> */}

                </div>
            </div>
            {/* Order Body Component  [Selector] */}
            <div className="tab-content" id="pills-tabContent" >
                <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="priceListOffer">{children?.requestOffer}</div>
                <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="hireMeRequests">{children?.requestMyJob}</div>
                <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="RequestsMade">{children?.requestMade}</div>
            </div>
        </div>
    )
}

export default FlancerTabsControllerShared
