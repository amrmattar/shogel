import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AmentiesShared from '../../../shared/Amenties/Amenties.shared'
import FlancerPersonalInformationComponent from '../fLancerProfile/FlancerPersonalInformation/FlancerPersonalInformation.component'
import Collapse from 'react-bootstrap/Collapse'
import { Button, Form } from 'react-bootstrap'
import ButtonShare from '../../../shared/Button/Button.shared'
import { userOfferRequest } from '../../../core/services/OfferRequestServices/OfferRequest.core'
import './FlancerEmployedOfferComponent.component.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getMessages } from '../../../core/redux/reducers/Messages/Messages.core'
import { cancelList } from '../../../core/services/CancelationServices/CancelationServices.core'
import CancelationShared from '../../../shared/Modal/Modal/Cancelation.shared'
const FlancerEmployedOfferComponent = ({ data, isMyTask, isMyOffer, isComment, setLoading }) => {
    const dispatch = useDispatch()
    const myPersonData = {
        avatar: data?.user?.avatar,
        fullname: data?.user?.fullname,
        jobName: data?.user?.job_name_id?.name,
        myFlag: data?.user?.nationality?.logo,
        status: data?.user?.available
    }

    // const [first, setfirst] = useState()
    // useEffect(() => {
    //     const commentTimeOut = setTimeout(() => {
    //         data.comment.map(myComment => {
    //             setfirst(myComment)
    //         })
    //     }, 1000);
    //     return () => clearTimeout(commentTimeOut)
    // }, [data])
    // <NavLink to={`/employed/freelancer-profile/${offerList?.user?.id}`} >

    const routeToFlancerProfile = (e) => {
        const btnTarget = e.target.id
        if (btnTarget !== 'commentButton' && btnTarget !== 'commentSend' && btnTarget !== 'commentInput' && btnTarget !== 'commentHolder') {
            // navigate(`/employed/freelancer-profile/${data?.user?.id}`)
        } else {
        }
    }
    const [open, setOpen] = useState(false);
    const [myComment, setMyComment] = useState({ comment: '' });
    const handleCommentChange = useCallback((e) => {
        const { name, value } = e.target;
        setMyComment(myComment => ({ ...myComment, [name]: value }))
    }, [setMyComment])


    const handleSendComment = (e) => {
        console.warn(e.target)
        const commentData = {
            id: data?.id,
            comment: myComment?.comment
        }
        if (commentData.comment !== '') {
            userOfferRequest._POST_MyOfferComment(commentData).then(res => {
                isComment(res.data.data)
                myComment.comment = ''
                dispatch(getMessages({ messages: res.data.message, messageType: 'success', messageClick: true }))
            }).catch(err => {
                dispatch(getMessages({ messages: err.response.data.message, messageType: 'error', messageClick: true }))
                isComment(false)
            })
        }
    }
    const [checkEdit, setCheckEdit] = useState(false)
    const [checkEditLoading, setCheckEditLoading] = useState(false)
    const [checkSaveEdit, setCheckSaveEdit] = useState(false)
    const change = () => {
        setCheckEdit(!checkEdit)
    }
    const [priceOrTime, setPriceOrTime] = useState({ price: data?.price, time: data?.time });
    const handlePriceOrTimeChanged = useCallback((e) => {
        const { name, value } = e.target;
        setPriceOrTime(priceOrTime => ({ ...priceOrTime, [name]: value }))
    }, [])
    const saveChanged = () => {
        setCheckSaveEdit(true)
        const formData = {
            price: priceOrTime?.price,
            time: priceOrTime?.time,
        }
            userOfferRequest._POST_UpdateOfferRequest(data?.id, formData).then(res => {
                setCheckSaveEdit(false)
                dispatch(getMessages({ messages: res.data.message, messageType: 'success', messageClick: true }))
                setCheckEdit(false)
                isComment(true)
            }).catch(err => {
                setCheckSaveEdit(false)
                dispatch(getMessages({ messages: err.response.data.message, messageType: 'error', messageClick: true }))
            })

    }
    const cancelTaskRef = useRef()
    const [cancelIsReason, setCancelReason] = useState([]);
    const [cancelIsType, setCancelType] = useState("");
    const [checkRejectLoading, setCheckRejectLoading] = useState(false);
    const handleRejectOffer = () => {
        cancelTaskRef.current.click()
        dispatch(getMessages({ messages: 'جــارى إرســـال طلبـك', messageType: 'warning', messageClick: true }))
        setCheckRejectLoading(true)
        cancelList._GET_CancelationList().then(res => {
            if (res.data.status === 1) {
                setCancelType('unApproveOffer')
                dispatch(getMessages({ messages: res.data.message, messageType: 'success', messageClick: true }))
                setCheckRejectLoading(false)
                setCancelReason(res.data.data)
            }
        }).catch(err => {
            dispatch(getMessages({ messages: err.response.data.message, messageType: 'error', messageClick: true }))
        })
    }
    const handleDeleteMyOffer = () => {
        cancelTaskRef.current.click()
        setCheckEditLoading(true)
        cancelList._GET_CancelationList().then(res => {
            if (res.data.status === 1) {
                setCancelType('offer')
                dispatch(getMessages({ messages: res.data.message, messageType: 'success', messageClick: true }))
                setCheckEditLoading(false)
                setCancelReason(res.data.data)
            }
        }).catch(err => {
            dispatch(getMessages({ messages: err.response.data.message, messageType: 'error', messageClick: true }))
        })
    }

    const [refreshEditTasks, setRefreshEditTasks] = useState(false)
    const handleEditPrice = () => {
        setRefreshEditTasks(true)
        dispatch(getMessages({ messages: 'جــارى إرســـال طلبـك', messageType: 'warning', messageClick: true }))
        userOfferRequest._POST_EditPriceRequest(data?.id).then(res => {
            dispatch(getMessages({ messages: res.data.message, messageType: 'success', messageClick: true }))
            setRefreshEditTasks(false)
            isComment(true)
        }).catch(err => {
            dispatch(getMessages({ messages: err.response.data.message, messageType: 'error', messageClick: true }))
        })
    }
        const [acceptOffer, setAcceptOffer] = useState(false)
    const handleAcceptOffer = () => {
        setAcceptOffer(true)
        dispatch(getMessages({ messages: 'جــارى إرســـال طلبـك', messageType: 'warning', messageClick: true }))
        userOfferRequest._POST_AcceptOfferRequest(data?.id).then(res => {
            if (res.data.status === 1) {
                dispatch(getMessages({ messages: res.data.message, messageType: 'success', messageClick: true }))
                setAcceptOffer(false)
                isComment(true)
            }
        }).catch(err => {
            setAcceptOffer(false)
            dispatch(getMessages({ messages: err.response.data.message, messageType: 'error', messageClick: true }))
        })
    }
    return (
        <>
            <CancelationShared cancelRefesh={isComment} cancelType={cancelIsType} refe={cancelTaskRef} reason={cancelIsReason} advsID={data?.id} id={'openModal'} dataTarget={'#myAdvertising'} modalId={'myAdvertising'} />
            {/* {first && <Navigate to={`/employed/page=:num/freelancer-profile/${data?.id}`} state={{ from: location.pathname }} replace />} */}
            <div className='uLT-click~ LT-employed-offer-listCard-grid uLT-bd-f-platinum-sA uLT-f-radius-sB' onClick={(e) => routeToFlancerProfile(e)} style={{ userSelect: 'none' }} >
                {/*  FreeLancer [Icon - Circel] */}
                <div className="LT-employed-offer-icon " style={{ width: '42px', height: '42px' }}>
                    <FlancerPersonalInformationComponent myData={myPersonData} statusIcon={data?.user?.available === 1 ? <div className="uLT-status-online"></div> : <div className="uLT-status-offline"></div>} />
                </div>
                <div className="d-flex justify-content-end align-items-start p-0">
                    {/* List Card Rate */}
                    <div className='info-child'>
                        <div className='d-flex justify-content-between w-100 align-items-start'>
                            {/* User Info [Holder] */}
                            <div className="LT-performance-rate-holder  ">
                                {/* User Rate */}
                                <div className="d-flex align-items-center LT-rate-font-size  ">
                                    <p className="m-0 card-text cLT-support2-text ">({data?.user?.rate?.count})</p>
                                    <p className="m-0 card-text cLT-support2-text ">{data?.user?.rate?.rate}</p>
                                    <i className={` iLT-Rate-star uLT-img-contain LT-rate-icon-size me-sm-2`}></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    data.user.id == isMyOffer | isMyTask ?
                        <div className="LT-employed-offer-price">
                            <div className="d-flex align-items-center gap-3 LT-price-time">
                                <div className=" d-flex flex-column align-items-center">
                                    <div className="LT-price d-flex justify-content-center align-items-center gap-2">
                                        <i className={` iLT-Advs-ksa-currency uLT-img-contain iLT-sA `}></i>
                                        <p className="mb-0 cLT-support2-text fLT-Regular-sB">  قيمة اعلان </p>
                                    </div>
                                    {checkEdit === true ?
                                        <Form.Control onChange={handlePriceOrTimeChanged} value={priceOrTime?.price} style={{ width: '100px' }} name="price" className='py-0 px-0 uLT-bd-f-platinum-sA' type="number" />
                                        :
                                        <p className="mb-0 cLT-support2-text fLT-Bold-sm-sB ">  <span> {data?.price} </span> ريـــال </p>
                                    }
                                </div>
                                <div className="LT-employed-offer-divied~ uLT-bd-f-platinum-sA" style={{ width: '2px', height: '61px' }}></div>
                                <div className="d-flex flex-column align-items-center">
                                    <div className="LT-time d-flex justify-content-center align-items-center gap-2">
                                        <i className={` iLT-Advs-calendar uLT-img-contain iLT-sA `}></i>
                                        <p className="mb-0 cLT-support2-text fLT-Regular-sB"> مدة التنفيذ </p>
                                    </div>
                                    {checkEdit === true ?
                                        <Form.Control onChange={handlePriceOrTimeChanged} value={priceOrTime?.time} style={{ width: '100px' }} name="time" className='py-0 px-0 uLT-bd-f-platinum-sA' type="number" />
                                        :
                                        <p className="mb-0 cLT-support2-text fLT-Bold-sm-sB ">  <span> {data?.time} </span> أيـــام </p>
                                    }
                                </div>
                            </div>
                            {data?.status?.name == 'unApprove' &&
                                <div className=" d-flex justify-content-center justify-content-md-end align-items-center cLT-support-text ">
                                    <p className='fLT-Regular-sD m-0  uLT-f-radius-sB uLT-bd-f-gray-sA px-4 py-2'>تم الرفــــــض</p>
                                </div>
                            }
                            {data?.status?.name == 'in progress' ?
                                <div className=" d-flex justify-content-center justify-content-md-end align-items-center cLT-support-text ">
                                    <p className='fLT-Regular-sD m-0  uLT-f-radius-sB uLT-bd-f-gray-sA px-4 py-2'>تم التعــــاقد</p>
                                </div>
                                :
                                <>
                                    {isMyTask && data?.status?.name !== 'unApprove' && data?.status?.name !== 'in proggress' &&
                                        <div className="LT-Button-style d-flex justify-content-center align-items-center gap-2 ">
                                            <ButtonShare loading={checkRejectLoading} onClick={handleRejectOffer} innerText="رفض العرض" textClasses="fLT-Regular-sB  px-3 cLT-support2-text" style={{ width: 'max-content' }} btnClasses="LT-delete-button cLT-platinum-bg p-2 justify-content-center d-flex align-items-center gap-2 uLT-f-radius-sB" />
                                            {data?.change === 1 &&
                                                <ButtonShare loading={refreshEditTasks} onClick={handleEditPrice} innerText="طلب تعديـــل" textClasses="fLT-Regular-sB  px-3 cLT-white-text" style={{ width: 'max-content' }} btnClasses=" LT-edit-button cLT-secondary-bg p-2 justify-content-center d-flex align-items-center gap-2 uLT-f-radius-sB" />
                                            }
                                            <ButtonShare loading={acceptOffer} onClick={handleAcceptOffer} innerText="قبول" textClasses="fLT-Regular-sB  px-3 cLT-white-text" style={{ width: 'max-content' }} btnClasses=" LT-agree-button  cLT-secondary-bg p-2 justify-content-center d-flex align-items-center gap-2 uLT-f-radius-sB" />
                                        </div>
                                    }
                                    {data?.user?.id == isMyOffer &&
                                        <div className="LT-Button-style d-flex justify-content-center align-items-center gap-2">
                                            {data?.status?.name !== 'unApprove' && data?.status?.name !== 'in proggress' &&
                                                <div className=" w-100">
                                                    <ButtonShare onClick={handleDeleteMyOffer} innerText="حذف" textClasses="fLT-Regular-sD" iconName={'LT-task-deleteIcon iLT-sA'}
                                                        btnClasses="p-2 d-flex justify-content-center align-items-center gap-2 uLT-f-radius-sB LT-task-deleteButton cLT-support-text" />
                                                </div>
                                            }
                                            {data?.status?.id === 11 &&
                                                <>
                                                    {checkEdit === false ?
                                                        <div className="w-100">
                                                            <ButtonShare onClick={() => change()} innerText="تعديـــل" textClasses="fLT-Regular-sB px-3 cLT-white-text" style={{ width: 'max-content' }} btnClasses="h-100 cLT-secondary-bg p-2 justify-content-center d-flex align-items-center gap-2 uLT-f-radius-sB" />
                                                        </div>
                                                        :
                                                        <div className="">
                                                            <ButtonShare loading={checkSaveEdit} onClick={() => saveChanged()} innerText="حفظ التعديــــل" textClasses="fLT-Regular-sB px-3 cLT-white-text" style={{ width: 'max-content' }} btnClasses="h-100 cLT-secondary-bg p-2 justify-content-center d-flex align-items-center gap-2 uLT-f-radius-sB" />
                                                        </div>
                                                    }
                                                </>
                                            }
                                        </div>
                                    }
                                </>}
                        </div> : ''
                }
                <div className='LT-employed-offer-description'>
                    {/* Card title */}
                    <p className="m-0 fLT-Regular-sB cLT-smoke-text">
                        {data?.description ? data?.description : 'لا يوجد وصف للعرض'}
                    </p>
                </div>
                {/* Card Divied */}
                <div className="LT-employed-offer-divied uLT-bd-b-platinum-sA"></div>
                {/* Card Amenties */}
                {
                    data.user.id == isMyOffer | isMyTask ?
                        <div className='LT-employed-offer-amenties'>
                            <div className={`${data?.comment?.length !== 0 ? 'amentiesWithLocation pb-3 ' : 'amentiesWithLocation p-0 w-100'}`}>
                                {/* Amenties Holder */}
                                <div className="LT-amenties-grid ">
                                    <AmentiesShared offerAmenties={'offerAmenties'} offerAmentiesData={data?.created_at_value} />
                                    {data?.status?.name !== 'unApprove' && data?.status?.name !== 'in progress' &&
                                        <div className='uLT-click' onClick={() => setOpen(!open)} aria-controls="example-collapse-text" aria-expanded={open}  >
                                            <p id='commentButton' className='mb-0 fLT-Regular-sA cLT-secondary-text' >اكتب تعليقك</p>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div id='writeComment' className={`${data?.comment?.length <= 1 ? 'LT-one-comment' : 'LT-comments'}`} >
                                {data?.comment?.map((newComment, idx) => {
                                    return <div key={idx} className="my-3 uLT-bd-f-platinum-sA uLT-f-radius-sB p-3">
                                        <div className="LT-employed-offer-icon mb-3" style={{ width: '42px', height: '42px' }}>
                                            <FlancerPersonalInformationComponent myData={newComment.done_by} statusIcon={newComment.done_by?.available === 1 ? <div className="uLT-status-online"></div>
                                                : <div className="uLT-status-offline"></div>} />
                                        </div>
                                        <div className='LT-employed-offer-description'>
                                            {/* Card title */}
                                            <p className="m-0 fLT-Regular-sB cLT-smoke-text">
                                                {newComment?.comment && newComment?.comment}
                                            </p>
                                        </div>
                                    </div>
                                })}
                            </div>
                            <div className={`${data?.comment?.length !== 0 ? 'my-2 pt-3' : 'my-0 pt-0'} uLT-f-radius-sB`}>
                                <Collapse in={open}>
                                    <div id="example-collapse-text uLT-f-radius-sB" style={{ border: '1px solid #1EAAAD', borderRadius: '10px' }}>
                                        <div className="d-flex uLT-f-radius-sB ">
                                            <Form.Control id='commentInput' onChange={handleCommentChange} value={myComment.comment} name="comment" className='uLT-f-radius-sB border-0 py-3' type="text" placeholder="اكتب هنا" />
                                            <div id='commentHolder' className={` uLT-bd-r-secondary-sA  d-flex align-items-center justify-content-center gap-2 ${data?.status?.name !== 'unApprove' && data?.status?.name !== 'in proggress' && 'uLT-click'}`}>
                                                <button id='commentSend' onClick={handleSendComment} className=' w-100 fLT-Regular-sB cLT-secondary-text  p-3' style={{ background: 'unset', border: 'none' }}>ارسال</button>
                                            </div>
                                        </div>
                                    </div>
                                </Collapse>
                            </div>
                        </div> : ''
                }
            </div>
        </>
    )
}

export default FlancerEmployedOfferComponent