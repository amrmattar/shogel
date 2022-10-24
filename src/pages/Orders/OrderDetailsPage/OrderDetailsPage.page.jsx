import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import FlancerEmployedListCard from "../../../components/FreeLancer/FlancerEmployedComponent/FlancerEmployedListCard.component";
import OrderListCardComponent from "../../../components/OrdersComponent/OrderListCard/OrderListCard.component";
import { userOfferPrice } from "../../../core/services/OfferPriceService/OfferPriceService.core";
import AmentiesShared from "../../../shared/Amenties/Amenties.shared";
import PageTitle from "../../../shared/PageTitle/PageTitle.shared";
import { Col, Form, Row } from "react-bootstrap";
import SideOrderDetailsPage from "../../sideNavPage/SideOrderDetails.page/SideOrderDetails.page";
import UserFeedBackShared from "../../../shared/UserFeedBack/UserFeedBack.shared";
import "./OrderDetailsPage.page.scss";
import ButtonShare from "../../../shared/Button/Button.shared";
import { userOfferRequest } from "../../../core/services/OfferRequestServices/OfferRequest.core";
import { getMessages } from "../../../core/redux/reducers/Messages/Messages.core";
import OfferRequestForm from "./OfferRequestForm";
import FlancerEmployedOfferComponent from "../../../components/FreeLancer/FlancerEmployedOfferComponent/FlancerEmployedOfferComponent.component";
import AuthComponent from "../../../components/auth/Auth.component";
import { CopyToClipboard } from "react-copy-to-clipboard";

import Toast from "react-bootstrap/Toast";
import { toast } from "react-toastify";

import {
  arNumberConverter,
  testNumbers,
} from "../../../utils/arNumberConverter";

const OrderDetailsPage = () => {
  const dispatch = useDispatch();
  const [userStatus, messages, userRole, userPermission] = useSelector(
    (state) => [
      state.authentication.loggedIn,
      state.messages,
      state.userRole.userRole,
      state.userData,
    ]
  );
  const errMessage = messages[0]?.messages;
  const param = useParams();
  const navigate = useNavigate();
  //  Use MEMO Function To Store Whte API Return Advertising List Data
  const [offerPriceTaskData, setOfferPriceTaskData] = useState();
  const [refreshTasks, setRefreshTasks] = useState(false);

  const offerDataById = useCallback(() => {
    return userOfferPrice
      ._GET_OffersPriceTaskByID(param.id)
      .then((res) => {
        setOfferPriceTaskData(res.data.data);
      })
      .catch((err) => {
        return err.response;
      });
  }, [param.id]);

  // Fire UseMemo Function One Time And Listen To State Value If Change So Fire Again And Get New Response
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!offerPriceTaskData) {
        return offerDataById();
      } else if (refreshTasks) {
        return offerDataById() && setRefreshTasks(false);
      }
    }, 1000);
    return () => clearTimeout(timeout);
  }, [offerDataById, refreshTasks]);

  const open = (url) => {
    window.open(url, "_blank").focus();
  };

  const [getOfferData, setRequestData] = useState({
    offerPrice: "",
    description: "",
    offerTime: "",
  });

  const getOfferDataValue = useMemo(() => {
    return (e) => {
      const { name, value } = e?.target;

      // only price number
      if (name === "offerPrice" && value && testNumbers(value)) return;

      setRequestData((getOfferData) => ({
        ...getOfferData,
        [name]: value,
      }));
    };
  }, []);
  // TODO  Send My Offer To This Task
  const [offerRequest, setOfferRequest] = useState(false);
  const sendOffer = (e) => {
    e.preventDefault();
    setOfferRequest(true);
    dispatch(
      getMessages({
        messages: "جاري إرســـال طلب عرضك",
        messageType: "warning",
        messageClick: true,
      })
    );
    const RequestOfferData = {
      price: arNumberConverter(getOfferData.offerPrice),
      time: getOfferData.offerTime,
      description: getOfferData.description,
      task_id: offerPriceTaskData?.id,
    };
    userOfferRequest
      ._POST_RequestOfOffer(RequestOfferData)
      .then((res) => {
        dispatch(
          getMessages({
            messages: res.data.message,
            messageType: "success",
            messageClick: true,
          })
        );
        setOfferRequest(false);
        setRefreshTasks(true);
        setRequestData((getOfferData) => ({
          ...getOfferData,
          description: "",
          offerPrice: "",
          offerTime: "",
        }));
      })
      .catch((err) => {
        dispatch(
          getMessages([
            {
              messages: err.response.data.message,
              messageType: "error",
              messageClick: true,
            },
          ])
        );
        setOfferRequest(false);
        setRefreshTasks(true);
      });
  };

  // TODO  Get All Lists Of Offer Fro This Task
  const [taskOfferData, setTaskOfferData] = useState();
  const [taskBoolenOfferData, setTaskBoolenOfferData] = useState(false);
  const [myOfferStatus, setmyOfferStatus] = useState();
  const [activeUserID, setActiveUserID] = useState(Boolean);
  const myId = JSON.parse(localStorage.getItem("usID"));

  const checkIsImg = (url) => {
    const ext = url?.split(".")?.at(-1);

    switch (ext?.toLowerCase()) {
      case "png":
        return true;

      case "jpg":
        return true;

      case "jpeg":
        return true;
      case "TIFF":
        return true;

      default:
        return false;
    }
  };

  useEffect(() => {
    if (myId == offerPriceTaskData?.user?.id) {
      setActiveUserID(true);
    }
  }, [offerPriceTaskData, myId]);

  useEffect(() => {
    const myofferId = JSON.parse(localStorage.getItem("usID"));
    offerPriceTaskData?.offer?.map((element) => {
      setmyOfferStatus(element.status);
      if (myofferId == element?.user?.id) {
        setTaskOfferData(element?.user?.id);
        setTaskBoolenOfferData(true);
      }
    });
  }, [offerPriceTaskData, myId]);

  const [havePermission, setHavePermission] = useState();
  const offerPermission = useCallback(() => {
    userPermission?.permission?.filter(function (el) {
      return el?.name == "offer-create" && setHavePermission(el?.name);
    });
  }, [userPermission]);

  useEffect(() => {
    if (!havePermission) {
      return offerPermission();
    }
  }, [offerPermission, havePermission]);

  const [nextClick, setNextClick] = useState(false);
  const [mobileCopy, setCopyMobile] = useState(false);
  const [urlCopy, setCopyUrl] = useState(false);

  // Condition For Show Loading Style Untill Data Return From API
  if (!offerPriceTaskData) {
    return (
      <div
        className="d-flex justify-content-center align-items-center w-100 "
        style={{ height: "100vh" }}
      >
        <div
          className="imLT-main-logo uLT-img-contain uLT-f-radius-sB img-fluid uLT-f-radius-sB"
          style={{ width: "200px", height: "200px" }}
        />
      </div>
    );
  }

  // helper
  const sendEmail = () => {
    window.open(
      `https://mail.google.com/mail/mu/mp/159/#co/to=${offerPriceTaskData?.user?.email}`
    );
  };

  const copyPhoneNumber = (num) => {
    setCopyMobile(true);
    window.open(`tel:${num}`);
  };

  const startChat = () => {
    window.open(
      `https://api.whatsapp.com/send/?phone=${
        offerPriceTaskData?.user?.mobile
      }&text=${"https://shogol.sa/"}`
    );
  };

  const startShare = () => {
    setCopyUrl(true);
  };

  return (
    <>
      <UserFeedBackShared
        message={messages.messages}
        type={messages?.messageType}
        clickMe={messages?.messageClick}
      />

      <div
        className="d-flex flex-column flex-lg-row px-3 gap-3 px-lg-0 pt-5 container-lg"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100">
          {/* Order Details [Holder] */}
          <div className="">
            <OrderListCardComponent
              amentiesSelector={
                <AmentiesShared
                  amenties="amenties"
                  orderData={offerPriceTaskData}
                />
              }
              orderTitle={offerPriceTaskData?.name}
              orderDescription={offerPriceTaskData?.description}
              orderStatus={offerPriceTaskData?.status?.name}
            />
          </div>
          {userStatus ? (
            <>
              <PageTitle smallUnderTitle=" " title="الملفات المرفقة" />
              <div className="d-flex flex-wrap row">
                {offerPriceTaskData?.document?.length ? (
                  offerPriceTaskData?.document?.map((file) => {
                    return (
                      <div
                        key={file.id}
                        style={{ width: "fit-content" }}
                        className="uLT-click col-md-3 LT-document-grid-holder"
                        onClick={() => open(file?.file)}
                      >
                        {checkIsImg(file?.file) ? (
                          <div
                            style={{ maxWidth: "100px" }}
                            className="flex-center flex-column mb-2"
                          >
                            <div
                              style={{
                                width: "100px",
                                height: "100px",
                              }}
                              className="img"
                            >
                              <img
                                style={{
                                  objectFit: "cover",
                                }}
                                className="w-100 h-100 rounded-3"
                                src={file?.file}
                                alt=""
                              />
                            </div>
                            <p className="mb-0 mt-2 text-center cLT-support2-text LT-document-ellipsis fLT-Regular-sB">
                              {file?.file.slice(62)}
                            </p>
                          </div>
                        ) : (
                          <div className="flex-center flex-column mb-2">
                            <i
                              className={`iLT-file-download uLT-img-contain iLT-sA ms-2`}
                            ></i>
                            <p className="mb-0 cLT-support2-text LT-document-ellipsis fLT-Regular-sB">
                              {file?.file.slice(62)}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <p className="mb-0 fLT-Regular-sD w-100 text-center cLT-gray-text">
                    لا يوجد ملفات مرفقة
                  </p>
                )}
              </div>

              {activeUserID ? (
                <div
                  style={{
                    border: "1px solid gray",
                    borderRight: "none",
                    borderLeft: "none",
                    padding: "1rem 0 1rem 0",
                    margin: "1rem 0 1rem 0",
                  }}
                >
                  <h3 className="fs-4">لا يمكنك أضافة عرض</h3>
                  <p className="small text-muted">
                    لا يمكن اضفة عرض سعر علي طلباتك
                  </p>
                </div>
              ) : havePermission &&
                !taskBoolenOfferData &&
                offerPriceTaskData?.status?.name !== "in progress" ? (
                <>
                  <PageTitle smallUnderTitle=" " title="أضف عرضك الآن" />
                  <OfferRequestForm
                    errMessage={errMessage}
                    handleCLick={sendOffer}
                    handleChange={getOfferDataValue}
                    offerIsRequest={offerRequest}
                    formValue={getOfferData}
                  />
                </>
              ) : (
                <div
                  style={{
                    border: "1px solid gray",
                    borderRight: "none",
                    borderLeft: "none",
                    padding: "1rem 0 1rem 0",
                    margin: "1rem 0 1rem 0",
                  }}
                >
                  <h3 className="fs-4">لا يمكنك أضافة عرض</h3>
                  <p className="small text-muted">
                    يجب ان تكون مشتغل لتضيف عرض سعر
                  </p>
                </div>
              )}
              {/*  All freelancer offers */}
              <PageTitle smallUnderTitle=" " title="العروض المقدمة" />
              {offerPriceTaskData?.offer?.length !== 0 ? (
                <>
                  {offerPriceTaskData?.offer?.map((offerList, idx) => {
                    return (
                      <div className="" key={idx}>
                        <FlancerEmployedOfferComponent
                          setLoading={refreshTasks}
                          data={offerList}
                          isMyTask={activeUserID}
                          isMyOffer={taskOfferData}
                          isComment={setRefreshTasks}
                        />
                      </div>
                    );
                  })}
                </>
              ) : (
                <div className="d-flex flex-column justify-content-center align-items-center w-100 ">
                  <div
                    className="imLT-main-logo uLT-img-contain uLT-f-radius-sB img-fluid uLT-f-radius-sB"
                    style={{ width: "150px", height: "100px" }}
                  ></div>
                  <p className="mb-0 fLT-Bold-sB cLT-gray-text">
                    لا يوجد عـــــروض
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="">
              {/* Add Your Offer */}
              <PageTitle smallUnderTitle=" " title="أضف عرضك الآن" />
              <div className="d-flex justify-content-start align-items-center cLT-platinum-bg uLT-f-radius-sB p-4">
                <p className="mb-0 cLT-support2-text fLT-Bold-sA ">
                  لا يمكنك ان تقدم عرضا لهذا الطلب تاكد من
                  <button
                    onClick={() => setNextClick(!nextClick)}
                    className="btn px-0 cLT-secondary-text uLT-click"
                    style={{ color: "#1EAAAD" }}
                  >
                    تسجيل الدخول
                  </button>
                  اولا
                </p>
              </div>
              <div className="d-none">
                <AuthComponent clickMe={nextClick} clickStatus={nextClick} />
              </div>
            </div>
          )}
        </div>

        <div>
          <SideOrderDetailsPage
            offerRefresh={setRefreshTasks}
            data={offerPriceTaskData}
            isUser={activeUserID}
          />

          <div className="mt-5">
            <div className="d-flex align-items-center marginC p-0 m-0 justify-content-center gap-3 flex-wrap">
              <div
                onClick={() => sendEmail()}
                className="uLT-advs-contact hova uLT-click d-flex justify-content-center align-items-center uLT-bd-f-secondary-sA uLT-f-radius-sB p-2"
              >
                <i className={`iLT-flancer-email uLT-img-contain iLT-sC`} />
                <p>رسالة</p>
              </div>
              <div
                onClick={() =>
                  copyPhoneNumber(offerPriceTaskData?.user?.mobile)
                }
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
                <i
                  className={`iLT-flancer-whatsApp uLT-img-contain iLT-sC`}
                ></i>
                <p>واتساب</p>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(OrderDetailsPage);
