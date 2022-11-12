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

function App() {
  const dispatch = useDispatch();
  const userData = useSelector(({ userData }) => userData);

  const [notification, setNotification] = useState({});

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

  return (
    <Router>
      <div className="" style={{ minHeight: "100vh" }}>
        <ViewLayout />
        <NotificationToast
          notification={notification}
          setNotification={setNotification}
        />
        <ToastContainer theme="colored" />
      </div>
    </Router>
  );
}

export default React.memo(App);
