import React, { Fragment, useCallback, useContext, useEffect, useRef, useState } from "react";
import ButtonShare from "../../../shared/Button/Button.shared";
import { LabelContext } from "../LabelDataContext/labelDataContext";
import "../NewStyle.scss";
const RegisterDetectedFreelancerAccount = () => {
  const value = useContext(LabelContext);

  const handleFreelancerScreen =  (e) => {
    e.preventDefault()
    value.jumpPage(4)
  }
  const handleCompanyScreen =  (e) => {
    e.preventDefault()
    value.jumpPage(5)
  }
  
  const getBack = () => {
    value.prevPage()
  }
  return (
    <Fragment>
    <div className="container my-4 px-0 d-flex flex-column justify-content-center align-items-center" >
      <div className="LT-account-holder">
       <div className=" LT-account-logo d-flex flex-column p-3">
       <div className="imLT-main-logo uLT-img-contain w-100" style={{height:'50px'}}> </div>
          <p className="m-0 fLT-Regular-sB cLT-main-text"> حدد نوع الحساب لا تقلق ، يمكن تغيير هذا لاحقًا </p>
       </div>
        <button  className="btn LT-account-type"  onClick={value.handleChange('user')}  name='worker'>
            <i className={` LT-account-icon iLT-client-icon uLT-img-contain `} name='worker'>
            <div className="LT-placeholder" name='worker'></div>
            <div className="imLT-main-logo uLT-img-contain LT-logo-on-icon" name='worker'> </div>
            </i>
            <p className="m-0 fLT-Bold-sA cLT-main-text LT-account-title" name='worker'> حســاب مشتغل</p>
            <i name='worker' className={`LT-account-arrow-icon iLT-long-right-arrow uLT-img-contain iLT-sC mt-1`}></i>
        </button>
        <button className="btn LT-freelancer-type"  onClick={value.handleChange('user')}  name='company'>
          <i className={` LT-freelancer-icon iLT-freelancer-icon uLT-img-contain `} name='company'></i>
          <p className="m-0 fLT-Bold-sA cLT-main-text LT-freelancer-title" name='company'> حســاب شــركه</p>
          <i className={`LT-freelancer-arrow-icon iLT-long-right-arrow uLT-img-contain iLT-sC mt-1`} name='company'></i>
        </button>
      </div>
    </div>
       <div className="d-flex justify-content-center ">
       <div className="w-25">
          <ButtonShare attrName={'undo'} onFocus={value.handleChange('user')} onClick={() => getBack()} innerText={'رجــــوع'} btnClasses={'three cLT-secondary-bg'} textClasses={'py-1 px-4 cLT-white-text fLT-Regular-sB'} />
        </div>
       </div>
  </Fragment>
  );
};
export default RegisterDetectedFreelancerAccount;
