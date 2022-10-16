import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FlancerPersonalInformationComponent from "../../../components/FreeLancer/fLancerProfile/FlancerPersonalInformation/FlancerPersonalInformation.component";
import OrderDetailsFilterComponent from "../../../components/SideFiltration/OrderDetailsFilter/OrderDetailsFilter.component";
import TaskButtonControllerFilterComponent from "../../../components/SideFiltration/TaskButtonControllerFilter/TaskButtonControllerFilter.component";
import { getMessages } from "../../../core/redux/reducers/Messages/Messages.core";
import { cancelList } from "../../../core/services/CancelationServices/CancelationServices.core";
import { userOfferPrice } from "../../../core/services/OfferPriceService/OfferPriceService.core";
import CancelationShared from "../../../shared/Modal/Modal/Cancelation.shared";
import "./SideOrderDetails.page.scss";
import FreelancerTaskView from "./FreelancerTaskView/FreelancerTaskView";
import ClientTaskView from "./ClientTaskView/ClientTaskView";
const SideOrderDetailsPage = ({ data, isUser, offerRefresh }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userStatus] = useSelector((state) => [state.authentication.loggedIn]);

  const cancelTaskRef = useRef();
  const [cancelIsReason, setCancelReason] = useState([]);
  const [cancelTaskID, setTaskID] = useState();

  // TODO Function Execute To Stop Task ** [Action Button] **
  const handleStopTask = () => {
    cancelTaskRef.current.click();
    cancelList
      ._GET_CancelationList()
      .then((res) => {
        setCancelReason(res.data.data);
        setTaskID(data.id);
      })
      .catch((err) => {
        return err.response;
      });
  };
  // TODO Function Execute To Edit Task ** [Action Button] **
  const handleEditTask = () => {
    navigate(`/update-offer-price/${data?.id}`);
  };
  // TODO Function Execute To Delete Task ** [Action Button] **
  const handleDeleteTask = () => {
    dispatch(
      getMessages({
        messages: "جــارى إرســـال طلبـك",
        messageType: "warning",
        messageClick: true,
      })
    );
    userOfferPrice
      ._DELETE_TaskByID(data?.id)
      .then((res) => {
        dispatch(
          getMessages({
            messages: res.data.message,
            messageType: "success",
            messageClick: true,
          })
        );
        navigate(`/orders/page=1`);
        offerRefresh(true);
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

  // TODO Function Execute Check If Freelancer On Task Is Login Or Not  ** [ON Component Rendring] **
  const [myJob, setIsMyJob] = useState(false);
  useEffect(() => {
    const myID = localStorage.getItem("usID");
    if (data?.freelancer?.id == myID) {
      return setIsMyJob(true);
    }
  }, [data?.freelancer?.id]);

  // TODO Function Execute  View Is Owner For This Task OR Not ====> [Start] <====
  const HandleOwnerOfTaskView = useCallback(() => {
    const ownerTaskId = JSON.parse(localStorage.getItem("usID"));
    switch (data?.user?.id) {
      case ownerTaskId:
        return false;
      default:
        return (
          <div className="">
            <p className="fLT-Bold-sA text-nowrap">صاحب الطلب</p>
            <FlancerPersonalInformationComponent
              myData={data?.user}
              statusIcon={<div className="uLT-status-online"></div>}
            />
          </div>
        );
    }
  }, [data?.user?.id]);
  useEffect(() => {
    HandleOwnerOfTaskView();
  }, [HandleOwnerOfTaskView]);
  // TODO Function Execute View Is Owner For This Task OR Not ====> [End] <====

  // TODO Function Execute View Is Owner For This Job OR Not ====> [Start] <====
  const HandleOwnerOfJobView = useCallback(() => {
    const ownerTaskId = JSON.parse(localStorage.getItem("usID"));
    switch (data?.freelancer && data?.freelancer?.id) {
      case null:
        return false;
      case ownerTaskId:
        return false;
      default:
        return (
          <div className="">
            <p className="fLT-Bold-sA text-nowrap"> المشتغل</p>
            <FlancerPersonalInformationComponent
              myData={data?.freelancer}
              statusIcon={<div className="uLT-status-online"></div>}
            />
          </div>
        );
    }
  }, [data?.freelancer]);
  useEffect(() => {
    HandleOwnerOfJobView();
  }, [HandleOwnerOfJobView]);
  // TODO Function Execute View Is Owner For This Job OR Not ====> [End] <====

  // TODO Function Execute View This Controller Buton TO [Owner The Task] ====> [Start] <====
  const HandleControllerView = useCallback(() => {
    switch (data?.status?.name) {
      case "active":
      case "new":
      case "open":
      case "time out":
        return (
          <div className="">
            <TaskButtonControllerFilterComponent
              stopTask={() => handleStopTask()}
              editTask={() => handleEditTask()}
              deleteTask={() => handleDeleteTask()}
              myData={data?.user}
              statusIcon={<div className="uLT-status-online"></div>}
            />
          </div>
        );
      default:
        return false;
    }
  }, [data?.status?.name]);
  useEffect(() => {
    HandleControllerView();
  }, [HandleControllerView]);
  // TODO Function Execute View This Controller Buton TO [Owner The Task] ====> [End] <====

  // TODO Function Execute View Is Owner For This Task OR Not
  const HandleFreelancerJobView = useCallback(() => {
    const ownerTaskId = JSON.parse(localStorage.getItem("usID"));
    switch (data?.freelancer?.id && data?.status?.name) {
      case ownerTaskId:
      case "in progress":
      case true:
        return <FreelancerTaskView setLoading={offerRefresh} data={data} />;
      default:
        return false;
    }
  }, [data?.freelancer?.id, data?.status?.name]);
  useEffect(() => {
    HandleFreelancerJobView();
  }, [HandleFreelancerJobView]);

  // TODO Switch View Is Owner For This Task OR Not
  const HandleJobViewToClient = useCallback(() => {
    switch (data?.status?.name) {
      case "done by freelancer":
        return <ClientTaskView refresIfDone={offerRefresh} data={data} />;
      default:
        return false;
    }
  }, [data?.status?.name]);
  useEffect(() => {
    HandleJobViewToClient();
  }, [HandleJobViewToClient]);

  return (
    <>
      <CancelationShared
        cancelRefesh={offerRefresh}
        cancelType={"task"}
        refe={cancelTaskRef}
        reason={cancelIsReason}
        advsID={cancelTaskID}
        id={"openModal"}
        dataTarget={"#myAdvertising"}
        modalId={"myAdvertising"}
      />
      <div className="cLT-white-bg p-4 d-flex flex-column gap-3 LT-order-side-nav">
        <div className="">
          <p className="fLT-Bold-sA text-nowrap">التفاصيل</p>
          <OrderDetailsFilterComponent detailsData={data} />
        </div>
        <div className="uLT-bd-f-platinum-sA"></div>

        {isUser && userStatus === true && <HandleControllerView />}
        <HandleOwnerOfTaskView />
        <HandleOwnerOfJobView />

        {myJob && <HandleFreelancerJobView />}
        {isUser && <HandleJobViewToClient />}
      </div>
    </>
  );
};

export default SideOrderDetailsPage;

// https://biqle.com/
