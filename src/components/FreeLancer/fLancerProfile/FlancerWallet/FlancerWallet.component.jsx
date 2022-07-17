import React from 'react'
import ButtonShare from '../../../../shared/Button/Button.shared'

const FlancerWalletComponent = () => {
    return (
        // { Favorite Section [Holder] }
        <div className='uLT-f-radius-sB uLT-bd-f-platinum-sA p-4 d-flex flex-column d-md-flex flex-md-row justify-content-md-between align-items-md-center gap-3 p-0 mb-4' >
            {/* Favorite Info [Holder] */}
            <div className="pt-2 pb-0 d-flex flex-column align-items-center d-md-flex flex-md-row align-items-md-start justify-content-md-center gap-2">
                {/* Favorite [Icon] */}
                <div className="d-flex align-items-center justify-content-center mb-0 pt-3">
                    <i className={`iLT-favorite-sign-dollar uLT-img-contain iLT-sD`}></i>
                </div>
                {/* Favorite [Title And Description] */}
                <div className="">
                    <p className="mb-3 mb-md-0 fLT-Bold-sD cLT-secondary-text">35.00 <span className='fLT-Regular-sE'> ريال</span> </p>
                    <p className="m-0 fLT-Bold-sm-sB cLT-support2-text">المبلغ المراد دفعه للمنصة</p>
                </div>
            </div>
            {/* Favorite Calendar */}
            <div className="d-flex justify-content-center align-items-center">
                <ButtonShare innerText={'دفع'} btnClasses={'px-4'} textClasses={'px-4'} />
            </div>
        </div>
    )
}

export default FlancerWalletComponent
