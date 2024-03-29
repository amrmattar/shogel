import "./FlancerAdvsDetailsPage.page.scss";
import React, { useEffect, useMemo, useState } from "react";
import PageTitle from "../../../../shared/PageTitle/PageTitle.shared";
import FlancerCertificatesComponent from "../../../../components/FreeLancer/fLancerProfile/FlancerCertificates/FlancerCertificates.component";
import FlancerAdvsGridCards from "../../../../components/FreeLancer/FlancerAdvertisingComponent/FlancerAdvsGridCard/FlancerAdvsGridCard.component";
import AmentiesShared from "../../../../shared/Amenties/Amenties.shared";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { advertisingLists } from "../../../../core/services/AdvertisingOfferServices/AdvertisingOfferServices.core";
import Toast from "react-bootstrap/Toast";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { AdvertisingFav } from "../../../../core/services/Favourite/AdvertisingFavourite/AdvertisingFavourite.core";
import UserFeedBackShared from "../../../../shared/UserFeedBack/UserFeedBack.shared";
import { getMessages } from "../../../../core/redux/reducers/Messages/Messages.core";
import { API } from "../../../../enviroment/enviroment/enviroment";
import { toast } from "react-toastify";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import { Box, Typography } from "@mui/material";

import useScreen from "../../../../utils/useScreen";

const CircularProgressWithLabel = ({
  className = "",
  isParentClass,
  ...props
}) => {
  return (
    <Box
      className={`${isParentClass ? className : ""}`}
      sx={{ position: "relative", display: "inline-flex" }}
    >
      <CircularProgress
        variant="determinate"
        {...props}
        className={!isParentClass ? className : ""}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
};

const sliceText = (txt, length) => {
  if (txt?.length > length) {
    return txt.slice(0, length) + "...";
  }

  return txt;
};

const FlancerAdvsDetailsPage = () => {
  const screenSize = useScreen();

  const navigate = useNavigate();
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
      `https://api.whatsapp.com/send/?phone=${`+${advsDataById?.user?.country_code}${advsDataById?.user?.mobile}`}&text=${"https://shogol.sa/"}`
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
    let data = { model: "ad" };
    API.post(`setting/report/${advsDataById?.id}`, data)
      .then((res) => {
        toast.success("تم ارسال البلاغ");
      })
      .catch((err) => {
        let ob = err.response?.data.message;
        if (ob) {
          for (const key in ob) {
            let ele = ob[key];

            toast.error(ele[0]);
          }
        } else {
          toast.error(err?.message || err?.msg || "حدث خطأ ما");
        }
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

  const handleChat = () => {
    navigate("/chat", {
      state: {
        id: advsDataById.user.id,
        avatar: advsDataById.user.avatar,
        name: advsDataById.user.username,
        role: advsDataById.user.role?.name,
      },
    });
  };

  const Description = () => {
    return (
      <>
        <div
          style={{
            fontSize: "0.9rem",
            fontWeight: 600,
            width: "80%",
            lineHeight: "1.5rem",
            whiteSpace: "break-spaces",
          }}
          className={`text-muted small mb-3`}
          dangerouslySetInnerHTML={{
            __html:
              advsDataById?.description !== "undefined"
                ? advsDataById?.description?.length > 620 && !showDescription
                  ? advsDataById?.description?.slice(0, 620) + " ..."
                  : advsDataById?.description
                : "لايوجد وصف للإعلان",
          }}
        />

        {advsDataById?.description?.length > 620 && (
          <span
            className="text-primary"
            style={{ cursor: "pointer" }}
            onClick={() => setShowDescription((prev) => !prev)}
          >
            {showDescription ? "عرض اقل" : "عرض المزيد"}
          </span>
        )}
      </>
    );
  };

  // ** User Feedback Loading UI Untill Response Return Data
  if (!advsDataById) {
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <p className="mb-0 fLT-Bold-sD cLT-gray-text text-center">Loading</p>{" "}
      </div>
    );
  }

  return (
    <div>
      <UserFeedBackShared
        message={messages.messages}
        type={messages?.messageType}
        clickMe={messages?.messageClick}
      />

      <div className="mDefault">
        <div className="d-flex my-3 "></div>
        {/* List Card Row [Holder] */}
        <div className="LT-advsDetails-grid cLT-white-bg uLT-f-radius-sB p-4">
          {/* List Card [Image] */}
          <div className="LT-advsDetails-image position-relative ms-2 ms-md-0">
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
                  src={advsDataById?.user?.nationality?.logo}
                  alt=""
                  width="40"
                  height="20"
                  className={" iLT-sC "}
                />
              </div>
              {/* List Card Rate */}
              <div className="d-flex justify-content-between align-items-start">
                {/* User Info [Holder] */}
                <div className="LT-performance-rate-holder">
                  <CircularProgressWithLabel
                    isParentClass
                    className="d-none d-md-flex"
                    value={80}
                  />

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
                    />
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
          <div className="d-none d-md-block LT-advsDetails-amenties">
            <AmentiesShared
              address={advsDataById?.address}
              iconWithLocation={"priceIconWithLocation"}
              locationName={`${advsDataById?.user?.country?.name} , ${advsDataById?.user?.city?.name}`}
              price={advsDataById?.price}
              currency={advsDataById?.currency?.name}
              time={advsDataById?.created_at_value}
            />
          </div>
        </div>

        <div
          style={{ backgroundColor: "#fff", textAlign: "end" }}
          className="d-md-none container-fluid"
        >
          <AmentiesShared
            iconWithLocation={"priceIconWithLocation"}
            phoneView
            time={advsDataById?.created_at_value}
            currency={advsDataById?.currency?.name}
            price={advsDataById?.price}
            locationName={`${advsDataById?.user?.country?.name}, ${advsDataById?.user?.city?.name}`}
          />
        </div>

        <div
          style={{ backgroundColor: "#fff", textAlign: "end" }}
          className="mb-3 pb-4 d-md-none"
        >
          <CircularProgressWithLabel value={80} />
        </div>
      </div>

      <div className="mb-3 mDefault pb-5" style={{ backgroundColor: "white" }}>
        <div className="p-4">
          <PageTitle title="تفاصيل الاعلان" />
          <div className="d-flex">
            <div className="w-100">
              <Description />
            </div>
            {/* <div className="d-flex align-items-end p-0">
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
          </div> */}
          </div>
        </div>
        <div style={{ overflow: "hidden", margin: "auto" }}>
          <FlancerCertificatesComponent
            clickable
            certificatesData={advsDataById?.document}
          />
        </div>
      </div>
      {vistorUser && (
        <div className="container-md px-4 mt-5">
          <div className="d-flex align-items-center justify-content-center marginC gap-3 flex-wrap m-0 m-md-auto">
            <div
              onClick={handleChat}
              className="uLT-advs-contact hova uLT-click d-flex justify-content-center align-items-center uLT-bd-f-secondary-sA uLT-f-radius-sB p-2"
            >
              <i className={`iLT-flancer-email uLT-img-contain iLT-sC`}></i>
              <p
                className={`text-muted ${
                  screenSize.with <= 770 ? "d-none" : ""
                }`}
              >
                الدردشه
              </p>
            </div>
            <div
              onClick={() =>
                copyPhoneNumber(
                  `+${advsDataById?.user?.country_code}${advsDataById?.user?.mobile}`
                )
              }
              className="uLT-advs-contact hova uLT-click d-flex justify-content-center align-items-center uLT-bd-f-secondary-sA uLT-f-radius-sB p-2"
            >
              <i className={`iLT-flancer-mobile uLT-img-contain iLT-sC`}></i>
              <p
                className={`text-muted ${
                  screenSize.with <= 770 ? "d-none" : ""
                }`}
              >
                اتصال
              </p>
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
              <p
                className={`text-muted ${
                  screenSize.with <= 770 ? "d-none" : ""
                }`}
              >
                واتساب
              </p>
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
              <p
                className={`text-muted ${
                  screenSize.with <= 770 ? "d-none" : ""
                }`}
              >
                مفضله
              </p>
            </div>
            <CopyToClipboard text={`${window.location.href}`}>
              <div
                onClick={() => startShare()}
                className="uLT-advs-contact uLT-click hova  d-flex justify-content-center align-items-center uLT-bd-f-secondary-sA uLT-f-radius-sB p-2"
              >
                <i className={`iLT-flancer-share uLT-img-contain iLT-sC`}></i>
                <p
                  className={`text-muted ${
                    screenSize.with <= 770 ? "d-none" : ""
                  }`}
                >
                  مشاركة
                </p>
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
              <p
                className={`text-muted ${
                  screenSize.with <= 770 ? "d-none" : ""
                }`}
              >
                {" "}
                ارسال بلاغ{" "}
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="mDefault d-flex flex-column pb-4 flex-wrap">
        <PageTitle title="إعلانات مشابهة" />
        <div
          style={{ height: "30rem", overflowY: "hidden" }}
          className="LT-list-Of-AdvsCategory "
        >
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
