import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "../../../core/redux/reducers/Messages/Messages.core";
import { advertisingLists } from "../../../core/services/AdvertisingOfferServices/AdvertisingOfferServices.core";
import UserFeedBackShared from "../../UserFeedBack/UserFeedBack.shared";
import "./Cancelation.shared.scss";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { cancelList } from "../../../core/services/CancelationServices/CancelationServices.core";
import { useNavigate } from "react-router-dom";
const CancelationShared = ({
  refe,
  reason,
  advsID,
  cancelRefesh,
  cancelType,
}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [messages] = useSelector((state) => [state.messages]);

  const [cancelReasonData, setCancelReasonData] = useState("");
  const [show, setShow] = useState(false);
  const [sendStatus, setSendStatus] = useState(false);

  const handleClose = () => {
    setLoading(false);
    setShow(false);
    setCancelReasonData("");
  };

  const handleShow = () => {
    setShow(true);
  };
  const handleSend = () => {
    dispatch(
      getMessages({
        messages: "جاري إرسال طلبك",
        messageType: "warning",
        messageClick: true,
      })
    );
    setLoading(true);
    setSendStatus(true);
    const cancelData = {
      cancellation_id: cancelReasonData?.id && cancelReasonData?.id,
      comment: cancelReasonData?.value && cancelReasonData?.value,
    };
    cancelList
      ._POST_Cancel(advsID, cancelData, cancelType)
      .then((res) => {
        dispatch(
          getMessages({
            messages: res.data.message,
            messageType: "success",
            messageClick: true,
          })
        );
        const resTimeOut = setTimeout(() => {
          setLoading(false);
          setCancelReasonData("");
          setShow(false);
          cancelRefesh(true);
          setSendStatus(false);
          if (cancelType === "task") {
            navigate(`/orders/page=${1}`);
          }
        }, 1200);
        return () => clearTimeout(resTimeOut);
      })
      .catch((err) => {
        dispatch(
          getMessages({
            messages: err.response.data.message,
            messageType: "error",
            messageClick: true,
          })
        );
        setCancelReasonData("");
        setLoading(false);
        setSendStatus(false);
      });
    cancelRefesh(false);
  };

  return (
    <>
      <UserFeedBackShared
        message={messages.messages}
        type={messages?.messageType}
        clickMe={messages?.messageClick}
      />
      <Button
        ref={refe}
        variant="primary"
        className="d-none"
        onClick={handleShow}
      ></Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>سبب إلغاء الاعلان</Modal.Title>
        </Modal.Header>
        {reason ? (
          <Modal.Body>
            <div className="d-flex flex-column align-items-start gap-3">
              {reason?.map((cancelReason, idx) => {
                return (
                  <div
                    key={idx}
                    className="d-flex flex-column align-items-start"
                  >
                    <label
                      htmlFor={cancelReason?.id}
                      className="d-flex gap-2 align-items-center "
                    >
                      <input
                        type="radio"
                        id={cancelReason?.id}
                        name="cancelReason"
                        value={cancelReason?.name}
                        onChange={(e) => setCancelReasonData(e.target)}
                      />
                      <p className="mb-0 p-0">{cancelReason?.name}</p>
                    </label>
                  </div>
                );
              })}
            </div>
          </Modal.Body>
        ) : (
          <div
            className="position-relative d-flex justify-content-center align-items-center w-100 h-100 py-4"
            style={{ height: "100vh" }}
          >
            <div className="App-logo-border-loading"></div>
            <div
              className="imLT-main-logo App-logo-animation uLT-img-contain uLT-f-radius-sB img-fluid uLT-f-radius-sB"
              style={{ width: "150px", height: "150px" }}
            ></div>
          </div>
        )}
        <Modal.Footer>
          <Button
            variant="secondary"
            className={"cLT-white-bg cLT-support2-text fLT-Regular-sB"}
            onClick={handleClose}
          >
            إلغـــاء
          </Button>
          <Button
            disabled={sendStatus}
            variant="primary"
            onClick={() => handleSend()}
            className={
              "d-flex gap-3 justify-content-center align-items-center cLT-secondary-bg cLT-white-text fLT-Regular-sB"
            }
          >
            {loading && <span className="spinner"></span>}
            <p className="mb-0 text-center">إرســـال</p>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default React.memo(CancelationShared);
