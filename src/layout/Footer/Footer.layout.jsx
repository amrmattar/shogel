import { NavLink } from "react-router-dom";
import "./Footer.layout.scss";
import React, { useEffect, useState } from "react";
import AuthComponent from "../../components/auth/Auth.component";
import { useSelector } from "react-redux";
import { homePages } from "../../core/services/HomeServices/Home.core";
const Footer = () => {
  const user = useSelector((state) => state.authentication);
  const [socialMedia, setSocialMedia] = useState()
  useEffect(() => {
    let cancel = false
      if(cancel) return;
      homePages._GET_HomePagesSections().then(res => {
              setSocialMedia(res.data?.data)
            })
    return () => {
      cancel = true
    }
  }, [])
  const [resault, setResault] = useState({facebook:'', linkedin: '', youtube:''})
  useEffect(() => {
    socialMedia?.filter(function (el) {
      switch (el?.id) {
        case 15:
          return setResault(resault => ({...resault, facebook:el?.value}))
          case 16:
          return setResault(resault => ({...resault, linkedin:el?.value}))
          case 17:
          return setResault(resault => ({...resault, youtube:el?.value}))
        default:
          return false
      }
      // return el?.id == socailId && setResault(el);
  })
  }, [socialMedia])
  const [click, setClick] = useState(false)
  return (
    <div className="LT-footer d-flex flex-column h-100 px-3 px-sm-4 px-lg-0">
      {/* Footer-Logo */}
      <div className="container-lg imLT-main-logo-footer w-100 uLT-img-position-contain LT-footer-logo px-0 my-4"></div>
      {/* content-section */}
      <div className="container-lg px-0 LT-content-sections">
        {/* Info-section */}
        <div className="LT-info-sec pe-0 ">
          <ul className="nav flex-column ">
            {/* معلومات عن شغل */}
            <li className="nav-item  h-100">
              <div className="px-0 pt-0 pb-2 fLT-Bold-sA nav-link" >
                <span className="cLT-white-text text-nowrap">معلومات عن شغل</span>
              </div>
            </li>
            {/* الأسئلة الشائعة */}
            <li className="nav-item  h-100">
              <NavLink className=" px-0 pt-0 pb-2 fLT-Bold-sA nav-link" to="/questions">
                <span className="cLT-white-text">الأسئلة الشائعة</span>
              </NavLink>
            </li>
            {/* ضمان حقوقك */}
            {/* <li className="nav-item  h-100">
              <NavLink className=" px-0 pt-0 pb-2 fLT-Bold-sA nav-link" to="/">
                <span className="cLT-white-text">ضمان حقوقك</span>
              </NavLink>
            </li> */}
            {/* شروط الاستخدام */}
            <li className="nav-item  h-100">
              <NavLink className=" px-0 pt-0 pb-2 fLT-Bold-sA nav-link" to="/policies">
                <span className="cLT-white-text">شروط الاستخدام</span>
              </NavLink>
            </li>
          </ul>
        </div>
        {/* Links-section */}
        {/* <div className="LT-link-sec">
          <div className="px-0 pt-0 pb-2 nav-link">
            <p className="mb-0 cLT-secondary-text fLT-Bold-sA">روابط</p>
          </div>
          <ul className="uLT-list-style">
            <li className="nav-item">
            </li>
            <li className="nav-item">
              <NavLink
                className="px-0 pt-0 pb-2 fLT-Regular-sB nav-link"
                to="/"
              >
                <span className="cLT-white-text">الشركاء</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="px-0 pt-0 pb-2 fLT-Regular-sB nav-link"
                to="/"
              >
                <span className="cLT-white-text">المقالات</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="px-0 pt-0 pb-2 fLT-Regular-sB nav-link"
                to="/"
              >
                <span className="cLT-white-text text-nowrap">مركز المساعدة</span>
              </NavLink>
            </li>
          </ul>
        </div> */}
        {/* Pages-section */}
        <div className="LT-page-sec">
          <ul className="uLT-list-style">
            {/* صفحات */}
            <li className="nav-item">
              <div className="px-0 pt-0 pb-2 nav-link">
                <p className="mb-0 cLT-secondary-text fLT-Bold-sA">صفحات</p>
              </div>
            </li>
            {/* تسجيل جديد */}
            <li className="nav-item">
                <button disabled={user?.loggedIn} className="btn LT-btn-hover p-0 mb-3 cLT-white-text" onClick={() => setClick(!click)} >تسجيل جديد</button>
              <div className="d-none">
                <AuthComponent clickMe={click} clickStatus={click} />
              </div>
            </li>
            {/* قدم كشريك */}
            {/* <li className="nav-item">
              <NavLink
                className="px-0 pt-0 pb-2 fLT-Regular-sB nav-link"
                to="/"
              >
                <span className="cLT-white-text">قدم كشريك</span>
              </NavLink>
            </li> */}
            {/* تصفح كل الفئات */}
            {/* <li className="nav-item">
              <NavLink
                className="px-0 pt-0 pb-2 fLT-Regular-sB nav-link"
                to="/"
              >
                <span className="cLT-white-text">تصفح كل الفئات</span>
              </NavLink>
            </li> */}
            {/* اتصل بنا */}
            <li className="nav-item">
              <NavLink
                className="px-0 pt-0 pb-2 fLT-Regular-sB nav-link"
                to="/"
              >
                <span className="cLT-white-text" onClick={()=> window.scrollTo({ top: 3500, behavior: 'smooth' })}>اتصل بنا</span>
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Download By */}
        {/* <div className="LT-store-sec">
          <ul className="uLT-list-style">
            <li className="nav-item">
              <div className="px-0 pt-0 pb-2 nav-link">
                <p className="mb-0 cLT-secondary-text fLT-Bold-sA">
                  حمل تطبيق شغل
                </p>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link px-0 pt-0 pb-3 mx-0 " href="https://www.apple.com" aria-label="apple">
                <div className="iLT-apple-store uLT-img-cover m-0 uLT-f-radius" style={{ width: "164px", height: "55px" }}></div>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link px-0 py-0" href="https://www.googleplay.com" aria-label="google-play">
                <div className="iLT-google-play uLT-img-cover uLT-f-radius" style={{ width: "164px", height: "55px" }}></div>
              </a>
            </li>
          </ul>
        </div> */}
        {/* Social Media */}
        <div className="LT-social-sec">
          <ul className="uLT-list-style">
            {/* تابعنا */}
            <li className="nav-item">
              <div className="px-0 pt-0 pb-2 nav-link">
                <p className="mb-0 cLT-secondary-text fLT-Bold-sA">تابعنا</p>
              </div>
            </li>
          </ul>
          <div className="d-flex justify-content-start align-items-center">
            <ul className="uLT-list-style d-flex">
              {/* Snapchat */}
              <li className="nav-item">
                <a className="px-0 pt-0 pb-2" href="https://www.snapchat.com" aria-label="snapchat">
                  <div className="ms-3 iLT-snapchat iLT-sC uLT-img-contain uLT-f-radius"></div>
                </a>
              </li>
              {/* Instagram */}
              <li className="nav-item">
                <a className="px-0 pt-0 pb-2" href={resault?.youtube} aria-label="instagram">
                  <div className="ms-3 iLT-instagram iLT-sC uLT-img-contain uLT-f-radius"></div>
                </a>
              </li>
              {/* Twitter */}
              <li className="nav-item">
                <a className="px-0 pt-0 pb-2" href={resault?.linkedin} aria-label="twitter">
                  <div className="ms-3 iLT-twitter iLT-sC uLT-img-contain uLT-f-radius"></div>
                </a>
              </li>
              {/* Facebook */}
              <li className="nav-item">
                <a className="px-0 pt-0 pb-2" href={resault?.facebook} aria-label="facebook">
                  <div className="iLT-facebook iLT-sC uLT-img-contain uLT-f-radius"></div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Copy Right */}
      <div className="w-100 LT-copyRight imLT-copy-right-shape uLT-img-cover">
        <p className="mb-0 py-4 d-flex h-100 justify-content-center text-center align-items-center cLT-white-text fLT-Bold-sA">
          Copyright &copy;2021 All rights reserved | Shogl Platform
        </p>
      </div>
    </div>
  );
};

export default React.memo(Footer);
