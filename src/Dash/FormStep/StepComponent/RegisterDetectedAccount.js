import React, { Fragment, useCallback, useContext, useEffect, useRef, useState } from "react";
import { LabelContext } from "../LabelDataContext/labelDataContext";

import "../NewStyle.scss";
import './RegisterDetectedAccount.scss'
const RegisterDetectedAccount = (props) => {
  const value = useContext(LabelContext);

  const handleChangeScreen =  () => {
      switch (value?.accountType?.userKind) {
        case 'client':
         return value.jumpPage(3) 
        case 'freelancer':
          return value.jumpPage(3)
        default:
          return  null
      }
    }

  return (
    <Fragment>
      <div className="container my-4 px-0 d-flex flex-column justify-content-center align-items-center" >
        <div className="LT-account-holder">
         <div className=" LT-account-logo d-flex flex-column p-3">
         <div className="imLT-main-logo uLT-img-contain w-100" style={{height:'50px'}}> </div>
            <p className="m-0 fLT-Regular-sB cLT-main-text"> حدد نوع الحساب لا تقلق ، يمكن تغيير هذا لاحقًا </p>
         </div>
          <button  className="btn LT-account-type" onClick={() => handleChangeScreen()}  onFocus={value.handleChange('user')} id={2} name='client'>
              <i className={` LT-account-icon iLT-client-icon uLT-img-contain `} name='client'>
              <div className="LT-placeholder" name='client'></div>
              <div className="imLT-main-logo uLT-img-contain LT-logo-on-icon" name='client'> </div>
              </i>
              <p className="m-0 fLT-Bold-sA cLT-main-text LT-account-title" name='client'> حســاب عمــيل</p>
              <i name='client' className={`LT-account-arrow-icon iLT-long-right-arrow uLT-img-contain iLT-sC mt-1`}></i>
          </button>
          <button className="btn LT-freelancer-type" onClick={() => handleChangeScreen()}  onFocus={value.handleChange('user')} id={3} name='freelancer'>
            <i className={` LT-freelancer-icon iLT-freelancer-icon uLT-img-contain `} name='freelancer'></i>
            <p className="m-0 fLT-Bold-sA cLT-main-text LT-freelancer-title" name='freelancer'> حســاب مشتغل</p>
            <i className={`LT-freelancer-arrow-icon iLT-long-right-arrow uLT-img-contain iLT-sC mt-1`} name='freelancer'></i>
          </button>
        </div>
      </div>
    </Fragment>
  );
};
export default RegisterDetectedAccount;
