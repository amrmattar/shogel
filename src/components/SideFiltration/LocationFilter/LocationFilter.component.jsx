import React from 'react';

const LocationFilterComponent = () => {
  return (
    <div className='d-flex align-items-c~enter uLT-bd-f-platinum-sA uLT-f-radius-sB  '>
      <input type='search' name='search' placeholder='ابحث هنا' className='w-100 fLT-Regular-sB cLT-smoke-text uLT-outline-0 uLT-border-0 uLT-f-radius-sB px-2 ' />
      <div className="d-flex justify-content-center align-items-center cLT-main-bg p-3 uLT-l-radius-sB">
        <i className='iLT-side-location iLT-sC uLT-img-cover' />
      </div>
    </div>
  )
};

export default LocationFilterComponent;
