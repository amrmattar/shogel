import React, { useCallback, useEffect } from 'react'
import ButtonShare from '../../../shared/Button/Button.shared'

const FlancerOfferStatusComponent = ({ data, isMyTask, checkRejectLoading, setLoading, checkEditLoading, handleRejectOffer, onClick, handleAcceptOffer, handleDeleteMyOffer, checkEdit
    , change, saveChanged, isMyOffer
}) => {
    const HandleAceeptOrReject = useCallback(
        () => {
            switch (data?.status?.name) {
                case 'unApprove':
                    return <div className=" d-flex justify-content-center justify-content-md-end align-items-center cLT-support-text ">
                        <p className='fLT-Regular-sD m-0  uLT-f-radius-sB uLT-bd-f-gray-sA px-4 py-2'>تم الرفــــــض</p>
                    </div>
                case 'in progress':
                    <div className=" d-flex justify-content-center justify-content-md-end align-items-center cLT-support-text ">
                        <p className='fLT-Regular-sD m-0  uLT-f-radius-sB uLT-bd-f-gray-sA px-4 py-2'>تم التعــــاقد</p>
                    </div>
                    HandleOwnerActionButton()
                    HandleCheckOfferID()
                    break;
                case 'active':
                    HandleOwnerActionButton()
                    HandleCheckOfferID()
                    break;
                case 'new':
                    return (
                        HandleCheckOfferID(), HandleOwnerActionButton()
                    )
                default:
                    return false
            }
        },
        [data?.status?.name],
    )
    const HandleOwnerActionButton = useCallback(
        () => {
            switch (isMyTask) {
                case true:
                    return <div className="LT-Button-style d-flex justify-content-center align-items-center gap-2 ">
                        <ButtonShare loading={checkRejectLoading} onClick={handleRejectOffer} innerText="رفض العرض" textClasses="fLT-Regular-sB  px-3 cLT-support2-text" style={{ width: 'max-content' }} btnClasses="LT-delete-button cLT-platinum-bg p-2 justify-content-center d-flex align-items-center gap-2 uLT-f-radius-sB" />
                        {data?.change === 1 &&
                            <ButtonShare loading={setLoading} onClick={onClick} innerText="طلب تعديـــل" textClasses="fLT-Regular-sB  px-3 cLT-white-text" style={{ width: 'max-content' }} btnClasses=" LT-edit-button cLT-secondary-bg p-2 justify-content-center d-flex align-items-center gap-2 uLT-f-radius-sB" />
                        }
                        <ButtonShare loading={checkEditLoading} onClick={handleAcceptOffer} innerText="قبول" textClasses="fLT-Regular-sB  px-3 cLT-white-text" style={{ width: 'max-content' }} btnClasses=" LT-agree-button  cLT-secondary-bg p-2 justify-content-center d-flex align-items-center gap-2 uLT-f-radius-sB" />
                    </div>
                default:
                    return false
            }
        },
        [isMyTask, checkRejectLoading, handleRejectOffer, checkEditLoading, onClick, data?.change, handleAcceptOffer, setLoading],
    )
    const HandleCheckOfferID = useCallback(
        () => {
            switch (data?.user?.id == isMyOffer) {
                case true:
                    return <div className="LT-Button-style d-flex justify-content-center align-items-center gap-2">
                        <div className=" w-100">
                            <ButtonShare onClick={handleDeleteMyOffer} innerText="حذف" textClasses="fLT-Regular-sD" iconName={'LT-task-deleteIcon iLT-sA'}
                                btnClasses="p-2 d-flex justify-content-center align-items-center gap-2 uLT-f-radius-sB LT-task-deleteButton cLT-support-text" />
                        </div>
                        {data?.status?.id === 11 &&
                            <>
                                {checkEdit === false ?
                                    <div className="w-100">
                                        <ButtonShare onClick={change} innerText="تعديـــل" textClasses="fLT-Regular-sB px-3 cLT-white-text" style={{ width: 'max-content' }} btnClasses="h-100 cLT-secondary-bg p-2 justify-content-center d-flex align-items-center gap-2 uLT-f-radius-sB" />
                                    </div>
                                    :
                                    <div className="">
                                        <ButtonShare loading={checkEditLoading} onClick={saveChanged} innerText="حفظ التعديــــل" textClasses="fLT-Regular-sB px-3 cLT-white-text" style={{ width: 'max-content' }} btnClasses="h-100 cLT-secondary-bg p-2 justify-content-center d-flex align-items-center gap-2 uLT-f-radius-sB" />
                                    </div>
                                }
                            </>
                        }
                    </div>
                default:
                    return false
            }
        },
        [data?.user?.id, isMyOffer, checkEdit, change, checkEditLoading, data?.status?.id, handleDeleteMyOffer, saveChanged],
    )
    useEffect(() => {
        HandleAceeptOrReject()
    }, [HandleAceeptOrReject, HandleOwnerActionButton, HandleCheckOfferID])
    return (
        <div>
            <HandleAceeptOrReject />

        </div>
    )
}

export default FlancerOfferStatusComponent