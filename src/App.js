import "./App.scss";
import { BrowserRouter as Router } from "react-router-dom";
import ViewLayout from "./layout/View.layout";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useMemo, useState } from "react";
import { RegisterServices } from "./core/services/AuthServices/Method_RegisterData/Method_RegisterData.core";
import { getCoreDataReducer } from "./core/redux/reducers/CoreDataReducer/CoreDataReducer";
// import { getMessaging, onMessage } from '@firebase/messaging'
// import { newMessaging } from "./core/firebase/firebase";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  const [locationID] = useSelector((state) => [state.locationID]);
  const dispatch = useDispatch();

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
  const [data, setData] = useState([]);
  // newMessaging.getToken().then((payload) => {
  //   localStorage.setItem('FCM', payload)
  // })
  // function showNotification() {
  //   const messaging = getMessaging()
  //   onMessage(messaging, (payload) => {
  //     const notification = new Notification(payload?.notification.title, {
  //       title: payload?.notification.title,
  //       body: payload?.notification.body,
  //       icon: "https://shogol.sa/static/media/main-logo.ffac0435bf528ae63128.svg",

  //     })
  //     // setfirst(notification)
  //     notification.onclick = function (ev) {
  //       ev.preventDefault()
  //       window.open("http://localhost:3000/")
  //     }
  //     if (payload.notification) {
  //       setData(data => [...data, payload.notification])
  //     }
  //   })

  // }
  // useEffect(() => {
  //   if (Notification.permission === 'granted') {
  //     showNotification()
  //   } else if (Notification.permission !== 'denied') {
  //     Notification.requestPermission().then(permission => {
  //       if (permission === 'granted') {
  //         showNotification()
  //       }
  //     })
  //   }
  // }, [])

  return (
    <Router>
      <div className="" style={{ height: "100vh" }}>
        <ViewLayout />
        <ToastContainer theme="colored" />
      </div>
    </Router>
  );
}

export default React.memo(App);
