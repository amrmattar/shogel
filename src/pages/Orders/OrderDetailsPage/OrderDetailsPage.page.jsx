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
      setRequestData((getOfferData) => ({ ...getOfferData, [name]: value }));
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
      price: getOfferData.offerPrice,
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
  // Condition For Show Loading Style Untill Data Return From API
  if (!offerPriceTaskData)
    return (
      <div
        className="d-flex justify-content-center align-items-center w-100 "
        style={{ height: "100vh" }}
      >
        <div
          className="imLT-main-logo uLT-img-contain uLT-f-radius-sB img-fluid uLT-f-radius-sB"
          style={{ width: "200px", height: "200px" }}
        ></div>
      </div>
    );
  return (
    <>
      <UserFeedBackShared
        message={messages.messages}
        type={messages?.messageType}
        clickMe={messages?.messageClick}
      />
      <div className="d-flex flex-column flex-lg-row px-3 gap-3 px-lg-0 container-lg">
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
              <div className="d-flex gap-2 flex-wrap ">
                {offerPriceTaskData?.document?.length !== 0 ? (
                  <>
                    {offerPriceTaskData?.document?.map((file) => {
                      return (
                        <div
                          key={file.id}
                          className="uLT-click LT-document-grid-holder justify-content-start "
                          onClick={() => open(file?.file)}
                        >
                          <i
                            className={`iLT-file-download uLT-img-contain iLT-sA ms-2`}
                          ></i>
                          <p className="mb-0 cLT-support2-text LT-document-ellipsis fLT-Regular-sB">
                            {file?.file.slice(62)}
                          </p>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <p className="mb-0 fLT-Regular-sD w-100 text-center cLT-gray-text">
                    لا يوجد ملفات مرفقة
                  </p>
                )}
              </div>
              {havePermission &&
              !activeUserID &&
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
                false
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
                  لا يمكنك ان تقدم عرضا لهذا الطلب تاكد من{" "}
                  <button
                    onClick={() => setNextClick(!nextClick)}
                    className="btn px-0 cLT-secondary-text uLT-click"
                    style={{ color: "#1EAAAD" }}
                  >
                    تسجيل الدخول
                  </button>{" "}
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
        </div>
      </div>
    </>
  );
};

export default React.memo(OrderDetailsPage);
