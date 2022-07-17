import React from 'react';
import './Filtration.shared.scss'
const FiltrationShared = ({ sideNavComponent = {} }) => {
    return (
        <>
            {/* Toggle Filtration [Button] */}
            <div className="d-flex justify-content-center align-items-center uLT-bd-f-platinum-sA" style={{ borderRadius: '25px', width: '50px', height: '50px' }}
                type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">
                <i className='iLT-nav-Filter iLT-sC uLT-img-cover '></i>
            </div>
            <div className="offcanvas offcanvas-top" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                {/* Header */}
                <div className="offcanvas-header">
                    {/* Close [Button] */}
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                {/* Body */}
                <div className="offcanvas-body">
                    <div className="d-flex flex-column gap-3">
                        {sideNavComponent}
                    </div>
                </div>
            </div>
        </>
    )
};

export default FiltrationShared;
