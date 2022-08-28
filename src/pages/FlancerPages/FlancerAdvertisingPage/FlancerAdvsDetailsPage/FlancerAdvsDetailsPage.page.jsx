import "./FlancerAdvsDetailsPage.page.scss";
import React, { useEffect, useMemo, useState } from "react";
import PageTitle from "../../../../shared/PageTitle/PageTitle.shared";
import FlancerCertificatesComponent from "../../../../components/FreeLancer/fLancerProfile/FlancerCertificates/FlancerCertificates.component";
import FlancerAdvsGridCards from "../../../../components/FreeLancer/FlancerAdvertisingComponent/FlancerAdvsGridCard/FlancerAdvsGridCard.component";
import AmentiesShared from "../../../../shared/Amenties/Amenties.shared";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { advertisingLists } from "../../../../core/services/AdvertisingOfferServices/AdvertisingOfferServices.core";
import defautFlag from "../../../../assets/icons/Advs-flag.svg";
import Toast from "react-bootstrap/Toast";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { AdvertisingFav } from "../../../../core/services/Favourite/AdvertisingFavourite/AdvertisingFavourite.core";
import UserFeedBackShared from "../../../../shared/UserFeedBack/UserFeedBack.shared";
import { getMessages } from "../../../../core/redux/reducers/Messages/Messages.core";
import { API } from "../../../../enviroment/enviroment/enviroment";
import { toast } from "react-toastify";

const FlancerAdvsDetailsPage = () => {
  const [vistorUser, messages] = useSelector((state) => [
    state.authentication.loggedIn,
    state.messages,
  ]);
  const dispatch = useDispatch();
  const [isFavourate, setIsFavourate] = useState(false);
  const [mobileCopy, setCopyMobile] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [urlCopy, setCopyUrl] = useState(false);
  const location = useLocation();
  const param = useParams();
  // TODO API Retuen Only My Advertising By ID
  const [advsDataById, setAdsById] = useState();
  const getAdvsById = useMemo(() => {
    return advertisingLists
      ._GET_MyAdvsById(param?.id)
      .then((res) => {
        setAdsById(res.data.data);
      })
      .catch((err) => {});
  }, [param?.id, isFavourate]);
  useEffect(() => {
    if (!advsDataById) {
      window.scrollTo({ top: 220, behavior: "smooth" });
      return getAdvsById;
    }
    if (isFavourate) {
      window.scrollTo({ top: 220, behavior: "smooth" });
      return getAdvsById;
    }
  }, [advsDataById, isFavourate, getAdvsById]);

  const [advsCategory, setCategory] = useState();
  const getUserAdsCategory = useMemo(() => {
    advsDataById?.category?.map((cate) => setCategory(cate.id));
  }, [advsDataById?.category]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!advsCategory) {
        return getUserAdsCategory;
      }
    }, 1200);
    return () => clearTimeout(timeout);
  }, [advsCategory, getUserAdsCategory]);

  // TODO API Retuen Only My Advertising By Catgeoryt
  const [advsDataByCategory, setAdsByCategory] = useState([]);
  const getAdvsByCategory = useMemo(() => {
    if (advsCategory) {
      return advertisingLists
        ._GET_AdvertisingByCategory(4, true, advsCategory, advsDataById?.id)
        .then((res) => {
          setAdsByCategory(res.data.data);
        })
        .catch((err) => {});
    }
  }, [advsCategory, advsDataById?.id]);
  useEffect(() => {
    if (!advsDataByCategory) {
      return getAdvsByCategory;
    }
  }, [advsDataByCategory, getAdvsByCategory]);

  const startChat = () => {
    window.open(
      `https://api.whatsapp.com/send/?phone=${
        advsDataById?.user?.mobile
      }&text=${"https://shogol.sa/"}`
    );
  };
  const sendEmail = () => {
    // window.open(`https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${advsDataById?.user?.email}`);
    window.open(
      `https://mail.google.com/mail/mu/mp/159/#co/to=${advsDataById?.user?.email}`
    );
  };
  const copyPhoneNumber = (num) => {
    setCopyMobile(true);
    window.open(`tel:${num}`);
  };
  const startShare = () => {
    setCopyUrl(true);
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 220,
      behavior: "smooth",
    });
  };
  const sendReport = () => {
    console.log(advsDataById);
    let data = { model: "ad" };
    API.post(`setting/report/${advsDataById?.id}`, data)
      .then((res) => {
        toast.success("تم ارسال البلاغ");
      })
      .catch((e) => {
        toast.error("حدث خطأ ما");
      });
  };
  const addFavourite = () => {
    AdvertisingFav._POST_AdvsFavourite(advsDataById?.id)
      .then((res) => {
        dispatch(
          getMessages({
            messages: res.data.message,
            messageType: "success",
            messageClick: true,
          })
        );
        setIsFavourate(!isFavourate);
      })
      .catch((err) => {
        dispatch(
          getMessages({
            messages: err.response.data.message,
            messageType: "error",
            messageClick: true,
          })
        );
      });
  };
  // ** User Feedback Loading UI Untill Response Return Data
  if (!advsDataById)
    return (
      <div>
        {" "}
        <p className="mb-0 fLT-Bold-sD cLT-gray-text text-center">
          Loading
        </p>{" "}
      </div>
    );
  return (
    <div>
      <UserFeedBackShared
        message={messages.messages}
        type={messages?.messageType}
        clickMe={messages?.messageClick}
      />
      <div className="mb-3 container-md px-2 px-sm-3 px-md-4">
        {/* List Card Row [Holder] */}
        <div className="LT-advsDetails-grid cLT-white-bg uLT-f-radius-sB ">
          {/* List Card [Image] */}
          <div className="LT-advsDetails-image position-relative">
            <img
              src={advsDataById?.user?.avatar}
              alt="myPic"
              className={"w-100 h-100 iLT-sF uLT-f-radius"}
            />
            {advsDataById?.user?.available === 1 ? (
              <div className="LT-advsDetails-status uLT-status-online"></div>
            ) : (
              <div className="LT-advsDetails-status uLT-status-offline"></div>
            )}
          </div>
          {/* List Card User [Holder] */}
          <div className="LT-advsDetails-list-card">
            {/*  User [Icon - Name - Flag - Title] */}
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex justify-content-between pe-sm-2">
                <p className="m-0 ps-2 ps-sm-3 card-text fLT-Bold-sm-sA cLT-support2-text text-nowrap">
                  {advsDataById?.user?.fullname}
                </p>
                <img
                  src={
                    advsDataById?.nationality?.logo
                      ? advsDataById?.nationality?.logo
                      : defautFlag
                  }
                  alt=""
                  className={" iLT-sC "}
                />
              </div>
              {/* List Card Rate */}
              <div className="d-flex justify-content-between align-items-start">
                {/* User Info [Holder] */}
                <div className="LT-performance-rate-holder">
                  {/* User Rate */}
                  <div className="d-flex align-items-center LT-rate-font-size">
                    <p className="m-0 card-text cLT-support2-text ">
                      ({advsDataById?.user?.rate?.count})
                    </p>
                    <p className="m-0 card-text cLT-support2-text ">
                      {advsDataById?.user?.rate?.rate}
                    </p>
                    <i
                      className={` iLT-Rate-star uLT-img-contain LT-rate-icon-size me-sm-2`}
                    ></i>
                  </div>
                </div>
              </div>
            </div>
            {/* Card title */}
            <div className="">
              <p className="m-0 LT-advsDetails-title cLT-support2-text">
                {advsDataById?.name}
              </p>
            </div>
          </div>
          {/* Card Amenties */}
          <div className="LT-advsDetails-amenties">
            <AmentiesShared
              iconWithLocation={"priceIconWithLocation"}
              locationName={`${advsDataById?.user?.country?.name} , ${advsDataById?.user?.city?.name}`}
              price={advsDataById?.price}
              currency={advsDataById?.currency?.name}
              time={advsDataById?.created_at_value}
            />
          </div>
        </div>
      </div>
      <div className="container-md mb-4  px-2 px-sm-3 px-md-4">
        <PageTitle title="تفاصيل الاعلان" />
        <div className="d-flex">
          <div className="">
            <p
              className={`m-0 fLT-Regular-sB cLT-smoke-text ${
                showDescription === true ? "" : "text-ellipsis3"
              }  ${
                location.pathname ===
                `/advertising/advertise-details/${param?.id}`
                  ? ""
                  : "text-ellipsis3"
              }`}
              dangerouslySetInnerHTML={{
                __html:
                  advsDataById?.description !== "undefined"
                    ? advsDataById?.description
                    : "لايوجد وصف للإعلان",
              }}
            ></p>
          </div>
          <div className="d-flex align-items-end p-0">
            {location.pathname ===
              `/advertising/advertise-details/${param?.id}` && (
              <div
                onClick={() => setShowDescription(!showDescription)}
                className="d-flex justify-content-center align-items-center gap-2 LT-readMore-holder-button cLT-platinum-b~g uLT-f-radius px-2  uLT-click"
              >
                {showDescription === false ? (
                  <>
                    <div className="p-0 fLT-Regular-sA cLT-secondary-text text-nowrap">
                      {" "}
                      المزيد
                    </div>
                    <i
                      className={` iLT-read-arrow-down uLT-img-contain  LT-read-more-arrow `}
                      style={{ width: "10px", height: "10px" }}
                    ></i>
                  </>
                ) : (
                  <>
                    <div className="p-0 fLT-Regular-sA cLT-secondary-text text-nowrap">
                      {" "}
                      إخفاء
                    </div>
                    <i
                      className={` iLT-read-arrow-up uLT-img-contain  LT-read-more-arrow `}
                      style={{ width: "10px", height: "10px" }}
                    ></i>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="">
        <FlancerCertificatesComponent
          certificatesData={advsDataById?.document}
        />
      </div>
      {vistorUser && (
        <div className="container-md px-4 mt-5">
          <div className="d-flex align-items-center marginC gap-3 flex-wrap  ">
            <div
              onClick={() => sendEmail()}
              className="uLT-advs-contact hova uLT-click d-flex justify-content-center align-items-center uLT-bd-f-secondary-sA uLT-f-radius-sB p-2"
            >
              <i className={`iLT-flancer-email uLT-img-contain iLT-sC`}></i>
              <p>رسالة</p>
            </div>
            <div
              onClick={() => copyPhoneNumber(advsDataById?.user?.mobile)}
              className="uLT-advs-contact hova uLT-click d-flex justify-content-center align-items-center uLT-bd-f-secondary-sA uLT-f-radius-sB p-2"
            >
              <i className={`iLT-flancer-mobile uLT-img-contain iLT-sC`}></i>
              <p>اتصال</p>
            </div>
            <Toast
              onClose={() => setCopyMobile(false)}
              show={mobileCopy}
              delay={2000}
              autohide
            >
              <Toast.Body>The Phone Number Is copied</Toast.Body>
            </Toast>
            <div
              onClick={() => startChat()}
              className="uLT-advs-contact hova uLT-click d-flex justify-content-center align-items-center uLT-bd-f-secondary-sA uLT-f-radius-sB p-2"
            >
              <i className={`iLT-flancer-whatsApp uLT-img-contain iLT-sC`}></i>
              <p>واتساب</p>
            </div>

            <div
              onClick={() => addFavourite()}
              className="uLT-advs-contact hova uLT-click d-flex justify-content-center align-items-center uLT-bd-f-secondary-sA uLT-f-radius-sB p-2"
            >
              <i
                className={`${
                  advsDataById.is_favourite !== 0
                    ? "iLT-flancer-red-heart"
                    : "iLT-flancer-heart"
                } uLT-img-contain iLT-sC`}
              ></i>
              <p>مفضله</p>
            </div>
            <CopyToClipboard text={`${window.location.href}`}>
              <div
                onClick={() => startShare()}
                className="uLT-advs-contact uLT-click hova  d-flex justify-content-center align-items-center uLT-bd-f-secondary-sA uLT-f-radius-sB p-2"
              >
                <i className={`iLT-flancer-share uLT-img-contain iLT-sC`}></i>
                <p>مشاركة</p>
              </div>
            </CopyToClipboard>
            <Toast
              className="s"
              onClose={() => setCopyUrl(false)}
              show={urlCopy}
              delay={2000}
              autohide
            >
              <Toast.Body>The Link Is copied</Toast.Body>
            </Toast>
            <div
              onClick={sendReport}
              className="uLT-advs-contact hova uLT-click d-flex justify-content-center align-items-center uLT-bd-f-platinum-sA uLT-f-radius-sB p-2 "
            >
              <i
                className={`   iLT-flancer-report uLT-img-contain iLT-sC `}
              ></i>
              <p> ارسال بلاغ </p>
            </div>
          </div>
        </div>
      )}
      <div className="container-md d-flex flex-column px-2 px-sm-3 px-md-4 flex-wrap">
        <PageTitle title="إعلانات مشابهة" />
        <div className="LT-list-Of-AdvsCategory ">
          {/* List Card Component [Loop]  */}
          {advsDataByCategory?.map((advs, ix) => {
            return (
              <NavLink
                onClick={() => scrollToTop()}
                className="uLT-list-style"
                to={`/advertising/advertise-details/${advs?.id}`}
                key={ix}
              >
                {" "}
                <FlancerAdvsGridCards data={advs} />{" "}
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default React.memo(FlancerAdvsDetailsPage);
