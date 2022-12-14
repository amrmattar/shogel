import React, { Fragment, useEffect, useRef, useState } from "react";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "../../../../core/redux/reducers/Messages/Messages.core";
import { MobileServices } from "../../../../core/services/AuthServices/Method_MobileValidation/Method_MobileValidation.core";
import UserFeedBackShared from "../../../../shared/UserFeedBack/UserFeedBack.shared";

const ReSendOTPComponent = ({ mobileNumber }) => {
  const dispatch = useDispatch();
  const [messages] = useSelector((state) => [state.messages]);
  const intervalRef = useRef(null);
  const [timer, setTimer] = useState("00:00");
  const getTimeRemining = (endTime) => {
    const total = Date.parse(endTime) - Date.parse(new Date());
    const second = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    return {
      total,
      minutes,
      second,
    };
  };
  const startTimer = (deadLine) => {
    let { total, minutes, second } = getTimeRemining(deadLine);
    if (total >= 0) {
      setTimer(
        (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (second > 9 ? second : "0" + second)
      );
    } else {
      clearInterval(intervalRef.current);
    }
  };
  const clearTimer = (endTime) => {
    setTimer("01:30");
    if (intervalRef.current) clearInterval(intervalRef.current);
    const id = setInterval(() => {
      startTimer(endTime);
    }, 1000);
    intervalRef.current = id;
  };
  const getDeadLineTime = () => {
    let deadLine = new Date();
    deadLine.setSeconds(deadLine.getSeconds() + 90);
    return deadLine;
  };
  useEffect(() => {
    clearTimer(getDeadLineTime());
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const onClickResetBtn = () => {
    dispatch(
      getMessages({
        messages: "جــارى إرســال طلبك",
        messageType: "warning",
        messageClick: true,
      })
    );
    if (intervalRef.current) clearInterval(intervalRef.current);
    clearTimer(getDeadLineTime());
    MobileServices._POST_ResendOTP({ mobile: mobileNumber })
      .then((res) => {
        dispatch(
          getMessages({
            messages: res.data.message,
            messageType: "success",
            messageClick: true,
          })
        );
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
  return (
    <Fragment>
      <UserFeedBackShared
        message={messages.messages}
        type={messages?.messageType}
        clickMe={messages?.messageClick}
      />
      <div className="d-flex align-items-center justify-content-between gap-2 gap-sm-4">
        <Button
          disabled={timer == "00:00" ? false : true}
          className="px-0"
          onClick={() => onClickResetBtn()}
        >
          <p
            className={`uLT-list-style fLT-Bold-sm-sA ${
              timer == "00:00" ? "cLT-secondary-text" : "cLT-gray-text"
            } `}
          >
            اعادة الإرســــال
          </p>
        </Button>
        <div className="cLT-secondary-text">{timer}</div>
      </div>
    </Fragment>
  );
};

export default ReSendOTPComponent;
