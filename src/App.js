import React, { useEffect, useMemo } from "react";

import ViewLayout from "./layout/View.layout";
import NotificationToast from "./components/NotificationToast";

import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RegisterServices } from "./core/services/AuthServices/Method_RegisterData/Method_RegisterData.core";
import { getCoreDataReducer } from "./core/redux/reducers/CoreDataReducer/CoreDataReducer";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";

import { addUserToken } from "./core/redux/reducers/UserLoginData/UserLoginData.core";
import { onMessageListener, fetchToken } from "./firebase";
import { useState } from "react";
import { API } from "./enviroment/enviroment/enviroment";

const App = () => {
  const dispatch = useDispatch();
  const userData = useSelector(({ userData }) => userData);

  const [notification, setNotification] = useState({});
  const [isNotification, setIsNotification] = useState(true);
  const [notificayionNums, setNotificayionNums] = useState(0);

  const addToken = (token) => {
    if (!userData.FCMToken) {
      dispatch(addUserToken(token));
    }
  };

  fetchToken(addToken);
  onMessageListener()
    .then((payload) => {
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
      });
    })
    .catch((err) => {
      console.log("error: ", err);
    });

  const [locationID] = useSelector((state) => [state.locationID]);
  const getCoreData = useMemo(() => {
    let modal = [
      "country",
      "city",
      "state",
      "area",
      "category",
      "gender",
      "nationality",
      "jobName",
      "social",
      "status",
    ];
    return RegisterServices.GET_RegisterData(
      modal,
      locationID?.countriesID,
      locationID?.citiesID
    ).then((res) => {
      dispatch(getCoreDataReducer(res.data.data));
    });
  }, [dispatch, locationID?.countriesID, locationID?.citiesID]);

  useEffect(() => {
    return getCoreData;
  }, [getCoreData]);

  // notication listener
  useEffect(() => {
    const notification_isShowen = localStorage.getItem("notification_isShowen");
    const notification_count = localStorage.getItem("notification_count");
    const hour_of_mil_sec = 1000 * 60 * 60;

    if (!notification_isShowen == null || !notification_count == null) {
      localStorage.setItem("notification_count", 0);
      localStorage.setItem("notification_isShowen", true);
    }

    const getNotification = async () => {
      const { data } = await API.get("/setting/notification/list");

      if (+data?.data?.length > +notification_count) {
        localStorage.setItem("notification_isShowen", false);
        localStorage.setItem("notification_count", data?.data?.length || 0);
        setIsNotification(true);
        setNotificayionNums(+data?.data?.length - +notification_count);
      }
    };

    getNotification();
    setInterval(() => getNotification(), hour_of_mil_sec);
  }, []);

  return (
    <Router>
      <div className="" style={{ minHeight: "100vh" }}>
        <ViewLayout
          isNotification={isNotification}
          setIsNotification={setIsNotification}
          notificayionNums={notificayionNums}
        />
        <NotificationToast
          notification={notification}
          setNotification={setNotification}
        />
        <ToastContainer theme="colored" />
      </div>
    </Router>
  );
};

export default React.memo(App);
