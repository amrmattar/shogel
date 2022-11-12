/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";

import { collection, onSnapshot, query, where } from "firebase/firestore";

import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getFirestore } from "firebase/firestore";
import firebaseApp from "../../firebase";

const types = { message: "chat", default_notification: "default_notification" };

const sliceText = (msg, amount) => {
  return msg?.length > amount ? msg?.slice(0, amount) + "..." : msg;
};

const firestore = getFirestore(firebaseApp);

const NotificationToast = ({ notification, setNotification }) => {
  const navigate = useNavigate();

  const { loggedIn } = useSelector((state) => state.authentication);

  // Notification & user data
  const [notificationData, setNotificationData] = useState({});
  const [user] = useSelector((state) => [state.userFullData]);
  const { FCMToken } = useSelector(({ userData }) => userData);

  // message lisinter
  useEffect(() => {
    if (!Object.keys(user).length) return;

    const q = query(
      collection(firestore, "messages"),
      where("recevierId", "==", user.id)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (snapshot.docChanges().length > 1) return;

        snapshot.docChanges().forEach((change) => {
          const msg = change.doc.data();

          if (msg.recevierId == user.id) {
            const payload = {
              type: types.message,
              text: msg.text,
              sender: {
                avatar: msg.senderAvatar,
                name: msg.senderName,
                id: msg.senderId,
                roleName: msg.senderRole,
              },
            };

            setNotificationData(payload);
          }
        });
      },
      (err) => {
        console.log(err);
      }
    );

    // clean up
    return () => unsubscribe();
  }, [user]);

  // default notification lisinter
  useEffect(() => {
    if (!loggedIn || !Object.keys(notification).length) return;

    const payload = {
      type: types.default_notification,
      text: notification.title,
      body: notification.body,
    };

    setNotificationData(payload);
  }, [user, notification, FCMToken, loggedIn]);

  // lisint any notification
  useEffect(() => {
    // Check if there is a notification
    if (!Object.keys(notificationData).length) return;

    // msg notification
    if (notificationData.type === types.message) {
      const msg = (
        <article dir="rtl">
          <p className="m-0">
            <span>
              رساله جديده: من {sliceText(notificationData.sender.name, 10)}
            </span>
            <span className="text-primary d-block overflow-hidden">
              {sliceText(notificationData.text, 20)}
            </span>
          </p>
        </article>
      );

      const openChat = () => {
        navigate("/chat", {
          state: {
            id: notificationData.sender.id,
            avatar: notificationData.sender.avatar,
            name: notificationData.sender.name,
            role: notificationData.sender.roleName,
          },
        });
      };

      toast(msg, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        onClick: openChat,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        icon: () => <img src={notificationData.sender.avatar} alt="" />,
      });
    }

    // default notification
    if (notificationData.type === types.default_notification) {
      const notification = (
        <article dir="rtl">
          <p className="m-0">
            <span>{sliceText(notificationData.text, 10)}</span>
            <span className="text-primary d-block overflow-hidden">
              {sliceText(notificationData.body, 20)}
            </span>
          </p>
        </article>
      );

      const openNotificationsPage = () => {
        navigate(`/account_management/my-notification/${user.id}`);
      };

      toast(notification, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        onClick: openNotificationsPage,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    // empty notification after showen
    setNotificationData({});
    setNotification({});
  }, [notificationData, navigate, setNotification, user.id]);

  return <></>;
};

export default NotificationToast;
