import React from 'react'
import ButtonShare from '../../Button/Button.shared'
import './FlancerEditsController.shared.scss'
const FlancerEditsControllerShared = ({ type, stopRequest, deleteRequest, editRequest, updateRequest }) => {
    return (
        <>{type === 3 &&
            <div className='d-flex justify-content-between flex-wrap gap-3 '>
                <div className="LT-deleteButton-order ">
                    <ButtonShare onClick={deleteRequest} innerText="حذف" textClasses="fLT-Regular-sD px-4 py-1" btnClasses="p-0 uLT-f-radius-sB cLT-danger-hover cLT-support-text" />
                </div>
                <div className="LT-editButton-order d-flex gap-2 ">
                    <ButtonShare onClick={stopRequest} innerText="ايقاف" textClasses="px-4 py-1 fLT-Regular-sD cLT-secondary-text" btnClasses="p-0 uLT-bd-f-secondary-sA uLT-f-radius-sB" />
                    <ButtonShare onClick={editRequest} innerText="تعديل" textClasses="px-4 py-1 fLT-Regular-sD cLT-white-text" btnClasses="p-0 cLT-secondary-bg uLT-f-radius-sB" />
                </div>
            </div>
        }
            {type === 9 &&
                <div className='d-flex justify-content-center justify-content-lg-between align-items-center flex-wrap gap-3'>
                    <div className="LT-deleteButton-order w-100 d-flex gap-2 ">
                        <div className="order-2 order-lg-1 d-flex align-items-center gap-2">
                            <div className="iLT-attention uLT-img-contain iLT-sB" ></div>
                            <p className='mb-0 cLT-danger-text fLT-Regular-sB'>{'انتهاء 30 يوم فترة ظهور الاعلان'}</p>
                        </div>
                    </div>
                    <div className='LT-updateButton-order d-flex justify-content-center w-100 justify-content-sm-between flex-wrap gap-3 '>
                        <div className="">
                            <ButtonShare onClick={deleteRequest} innerText="حذف" textClasses="fLT-Regular-sD px-3" btnClasses="px-3 uLT-f-radius-sB cLT-danger-hover cLT-support-text" />
                        </div>
                        <div className=" d-flex gap-2 ">
                            <ButtonShare innerText="تحديث" onClick={updateRequest} textClasses="px-4 fLT-Regular-sD cLT-white-text" btnClasses="px-4 cLT-secondary-bg uLT-f-radius-sB" />

                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default React.memo(FlancerEditsControllerShared)
