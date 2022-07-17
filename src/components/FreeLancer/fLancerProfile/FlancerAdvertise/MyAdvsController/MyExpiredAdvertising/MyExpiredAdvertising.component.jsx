import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { advertisingLists } from '../../../../../../core/services/AdvertisingOfferServices/AdvertisingOfferServices.core'
import AmentiesShared from '../../../../../../shared/Amenties/Amenties.shared'
import FlancerEditsControllerShared from '../../../../../../shared/FlancerController/FlancerEditsControllerShared/FlancerEditsController.shared'
import FlancerDescriptionBodyComponent from '../../../FlancerDescriptionBody/FlancerDescriptionBody.component'
import FlancerDescriptionTitleComponent from '../../../FlancerDescriptionTitle/FlancerDescriptionTitle.component'
import logoImageDefault from '../../../../../../assets/images/main-logo.svg'
import { useDispatch, useSelector } from 'react-redux'
import UserFeedBackShared from '../../../../../../shared/UserFeedBack/UserFeedBack.shared'
import { getMessages } from '../../../../../../core/redux/reducers/Messages/Messages.core'
const MyExpiredAdvertisingComponent = ({ data, loading, updateStatus, expiresRefesh }) => {
    const [messages] = useSelector((state) => [state.messages]);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleUpdateAdvs = (id) => {
        dispatch(getMessages({ messages: 'جارى ارسال طلب التحديث ', messageType: 'warning', messageClick: true }))
        advertisingLists._POST_UpdateAdvertising(id).then(res => {
            expiresRefesh(true)
            dispatch(getMessages({ messages: res.data.message, messageType: 'success', messageClick: true }))
        }).catch(err => {
            dispatch(getMessages({ messages: err.response.data.message, messageType: 'error', messageClick: true }))
        })
        expiresRefesh(false)
    }
    const handleDeleteAdvs = (id) => {
        dispatch(getMessages({ messages: 'جارى ارسال طلب الحذف ', messageType: 'warning', messageClick: true }))
        advertisingLists._Delete_Advertising(id).then(res => {
            expiresRefesh(true)
            dispatch(getMessages({ messages: res.data.message, messageType: 'success', messageClick: true }))
        }).catch(err => {
            expiresRefesh(true)
            dispatch(getMessages({ messages: err.response.data.message, messageType: 'error', messageClick: true }))
        })
        expiresRefesh(false)
    }

    const routeExpireAdvsDetails = (e, adsId) => {
        const btnTarget = e.target.innerText
        if (btnTarget !== 'حذف' && btnTarget !== 'تحديث') {
            navigate(`/advertising/advertise-details/${adsId}`)
        }
    }

    if (loading) return <div className='position-relative d-flex justify-content-center align-items-center w-100 h-100 py-4' >
        <div className="LT-logo-border-forwards-loading" ></div>
        <div className="iLT-shogol-logo App-logo-animation uLT-img-contain uLT-f-radius-sB img-fluid~ uLT-f-radius-sB" style={{ width: '120px', height: '120px' }}></div>
        <div className="LT-logo-border-backwards-loading" ></div>
    </div>
    return (
        <>
            <UserFeedBackShared message={messages.messages} type={messages?.messageType} clickMe={messages?.messageClick} />
            {updateStatus === 9 && data?.length !== 0 ?
                <>
                    {data?.map((adData, idx) => {
                        return <div key={idx} className="uLT-click" onClick={(e) => routeExpireAdvsDetails(e, adData.id)}>
                            <div className="LT-myAdvs-grid uLT-f-radius-sB uLT-bd-f-platinum-sA mb-3">
                                {/* List Card [Image] */}
                                {!adData?.document[0]?.file.match('.mp4') ?
                                    adData?.document[0]?.file ?
                                        <picture className='LT-myAdvs-image  '>
                                            <img src={adData?.document[0]?.file} alt="" className='uLT-bd-f-platinum-sA img-fluid uLT-f-radius-sB' style={{ width: '100%', height: '100%', aspectRatio: '1.5/1' }} />
                                        </picture>
                                        :
                                        <picture className='LT-myAdvs-image' >
                                            <img src={logoImageDefault} alt="" className=' uLT-f-radius-sB' style={{ width: '100%', height: '100%', aspectRatio: '4/1' }} />
                                        </picture>
                                    :
                                    <video width="100%" style={{ objectFit: 'fill', height: '100%', borderRadius: '15px' }} className='LT-myAdvs-image' controls autoPlay={true}>
                                        <source src={adData?.document[0]?.file} type="video/mp4" />
                                    </video>
                                }
                                {/* Details [Section] */}
                                <div className="LT-myAdvs-details">
                                    {/* Card title */}
                                    <div className="LT-myAdvs-title ">
                                        <FlancerDescriptionTitleComponent descriptionTitle={adData?.name} />
                                        <FlancerDescriptionBodyComponent descriptionBody={adData?.description} />
                                    </div>
                                    {/* Card Amenties */}
                                    <div className="LT-myAdvs-amenties">
                                        <AmentiesShared iconWithLocation={'priceIconWithLocation'}
                                            price={adData.price}
                                            currency={adData?.currency.name}
                                            locationName={`${adData?.user?.country?.name},${adData?.user?.city?.name} `}
                                            time={adData?.created_at_value}
                                        />
                                    </div>
                                    <div className="LT-myAdvs-controller">
                                        <FlancerEditsControllerShared
                                            deleteRequest={() => handleDeleteAdvs(adData?.id)}
                                            updateRequest={() => handleUpdateAdvs(adData?.id)}
                                            type={adData?.status?.id} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    })}
                </>
                :
                <div className="d-flex flex-column justify-content-center align-items-center w-100  " style={{ height: '100% ' }}>
                    <div className="imLT-main-logo uLT-img-contain uLT-f-radius-sB img-fluid uLT-f-radius-sB" style={{ width: '200px', height: '200px' }}></div>
                    <p className='mb-0 fLT-Bold-sD cLT-gray-text'>لا يوجد اعلانــــات</p>
                </div>
            }

        </>
    )
}

export default MyExpiredAdvertisingComponent