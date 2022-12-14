import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./AsideFreelancerPage.Pages.scss";
import { updateProfile } from "../../core/services/userProfile/UpdateProfile/UpdateProfile.core";
import { getUserDataReducer } from "../../core/redux/reducers/UserDataReducer/UserDataReducer.core";
import { getMessages } from "../../core/redux/reducers/Messages/Messages.core";
import UserFeedBackShared from "../../shared/UserFeedBack/UserFeedBack.shared";
import { BsTelephoneFill } from "react-icons/bs";
import { MdEmail, MdLocationOn } from "react-icons/md";
import CompletionChart from "../../components/FreeLancer/FlancerEmployedComponent/CompletionChart";
import axios from "axios";
import { API } from "../../enviroment/enviroment/enviroment";

const AsideFreelancerPage = ({
  selector,
  userDataByParam,
  isHandleChange,
  setMarginTop,
  setMarginBottom,
  fullnameShowen,
}) => {
  const param = useParams();
  // const userID =  useSelector((state) => state.userData.id)
  const dispatch = useDispatch();
  const location = useLocation();
  // Get Full User Data By Redux
  const [userData, messages] = useSelector((state) => [
    state.userFullData,
    state.messages,
  ]);
  // Get User Edit Profile Data By ID
  const [userProfileData, setEditProfileData] = useState();
  const [changeStatusLoading, setChangeStatusLoading] = useState(false);
  const [status, setStatus] = useState(false);

  // TODO  Get Edit Profile Data After Check Location By ID
  const getEditProfileData = useMemo(() => {
    if (location.pathname.includes("/account_management/")) {
      if (userData) {
        setEditProfileData(userData);
      }
    }
  }, [location, userData]);
  useEffect(() => {
    return userData && getEditProfileData;
  }, [getEditProfileData, userData]);

  // TODO  Get Profile Data After Check Location By Param ID
  const getCoreData = useMemo(() => {
    if (location.pathname.includes(`employed/`)) {
      if (userDataByParam) {
        setEditProfileData(userDataByParam);
      }
    }
  }, [location, userDataByParam]);
  useEffect(() => {
    return !userDataByParam && getCoreData;
  }, [getCoreData, userDataByParam]);

  const handleChange = (e) => {
    dispatch(
      getMessages({
        messages: "?????????? ?????????????? ",
        messageType: "warning",
        messageClick: true,
      })
    );
    const requestOffer = new FormData();
    requestOffer.append("avatar", e.target.files[0]);
    updateProfile
      ._POST_UpdateProfile(userData?.id, requestOffer)
      .then((res) => {
        dispatch(
          getMessages({
            messages: res?.data?.message,
            messageType: "success",
            messageClick: true,
          })
        );
        localStorage.setItem("avatar", res?.data?.data?.avatar);
        setEditProfileData(res.data.data);
      });
  };
  // * Switch Between User Data By Location View
  const isUserData = useMemo(() => {
    if (userProfileData) {
      return userProfileData;
    }
  }, [userProfileData]);
  // Personal Info Show At User Profile View
  const sideNavPersonalInfo = [
    {
      iconName: "iLT-Listcard-location",
      title: isUserData?.country?.name,
      subTitle: isUserData?.city?.name,
    },
    {
      iconName: "iLT-email-address-black",
      title: isUserData?.email,
      subTitle: "",
    },
    {
      iconName: "iLT-cell-phone-black",
      title: isUserData?.mobile,
      subTitle: "",
    },
  ];

  const personalInfo = [
    {
      iconName: "iLT-Listcard-location",
      title: isUserData?.country?.name,
      subTitle: isUserData?.city?.name,
    },
  ];

  const changeStatus = (e) => {
    setChangeStatusLoading(true);
    dispatch(
      getMessages({
        messages: "?????????? ?????????? ????????????",
        messageType: "warning",
        messageClick: true,
      })
    );

    API.post("/user/convert/status")
      .then(() => {
        API.get(`/user/profile?id=${isUserData.id}`)
          .then(({ data }) => {
            setStatus(data.data.available ? true : false);
            setChangeStatusLoading(false);
            dispatch(
              getMessages({
                messages: "???? ?????????? ????????????",
                messageType: "success",
                messageClick: true,
              })
            );
          })
          .catch((err) => {
            console.log(err);
            setChangeStatusLoading(false);
            dispatch(
              getMessages({
                messages: "?????? ?????? ?????? ??????????",
                messageType: "error",
                messageClick: true,
              })
            );
          });
      })
      .catch((err) => {
        console.log(err);
        setChangeStatusLoading(false);
        dispatch(
          getMessages({
            messages: "?????? ?????? ?????? ??????????",
            messageType: "error",
            messageClick: true,
          })
        );
      });
  };

  useEffect(() => {
    setStatus(isUserData?.available === 1);
  }, [isUserData?.available]);

  //  console.log(userProfileData, "waae");
  //  console.log(userData, "wde");
  //  console.log(isUserData, "qawe");

  return (
    <>
      <UserFeedBackShared
        message={messages.messages}
        type={messages?.messageType}
        clickMe={messages?.messageClick}
      />
      <div className="d-flex flex-column align-items-center gap-3">
        {/* Profile Image Holder */}
        <div
          className="d-flex justify-content-center w-100 LT-imag-holder position-relative"
          style={{
            marginTop: `${setMarginTop}px`,
            marginBottom: `${setMarginBottom}px`,
          }}
        >
          {/* Image  */}
          {location.pathname.includes(`/employed/`) && (
            <div className="LT-advsDetails-image position-relative">
              <img
                src={userProfileData?.avatar}
                id="output"
                alt="test"
                className="uLT-f-radius img border rounded-4 px-3 py-3"
                style={{
                  width: "128px",
                  height: "128px",
                  backgroundColor: "#fff",
                }}
              />
              {userProfileData?.available === 1 ? (
                <div className="LT-freelancer-profile uLT-status-online"></div>
              ) : (
                <div className="LT-freelancer-profile uLT-status-offline"></div>
              )}
            </div>
          )}
          {location.pathname.includes("/account_management/") && (
            <div className="LT-advsDetails-image position-relative">
              {userProfileData?.avatar ? (
                <>
                  <img
                    src={userProfileData?.avatar}
                    id="output"
                    alt="test"
                    className="uLT-f-radius img border rounded-4 px-3 py-3"
                    style={{
                      width: "128px",
                      height: "128px",
                      backgroundColor: "#fff",
                    }}
                  />
                  <label htmlFor="attachment" className="position-absolute">
                    <i
                      className="uLT-click iLT-account-upload-img uLT-img-contain LT-upload-img uLT-f-radius"
                      style={{ width: "42px", height: "42px", left: "0px" }}
                    ></i>
                    <input
                      onChange={(e) => handleChange(e)}
                      type="file"
                      name="file[]"
                      accept=".pdf,.png,.jpg,.doc"
                      id="attachment"
                      style={{
                        visibility: "hidden",
                        position: "absolute",
                        width: "0px",
                      }}
                    />
                  </label>
                </>
              ) : (
                <div className="LT-aside-avatar-wire-frame"></div>
              )}
            </div>
          )}
        </div>

        {/* Profile Info Holder */}
        <div className="d-flex flex-column justify-content-center align-items-center gap-2">
          <div className="d-flex justify-content-between align-items-center">
            <p className="m-0 ps-3 card-text fLT-Bold-sA cLT-support2-text">
              {fullnameShowen
                ? userProfileData?.fullname
                : userProfileData?.username}{" "}
            </p>
            <i className={` iLT-Advs-flag uLT-img-contain iLT-sC`}></i>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <p className="m-0 ps-3 card-text cLT-support2-text">
              {userProfileData?.job_name_id?.name ||
                userProfileData?.role?.name}{" "}
            </p>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <MdLocationOn />
            <p className="m-0 ps-3 card-text cLT-support2-text">
              {userProfileData?.state?.country?.name}{" "}
            </p>
            <p className="m-0 ps-3 card-text cLT-support2-text">
              {userProfileData?.state?.city?.name}{" "}
            </p>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <MdEmail />
            <p className="m-0 ps-3 card-text cLT-support2-text">
              {userProfileData?.email}{" "}
            </p>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <BsTelephoneFill />
            <p className="m-0 ps-3 card-text cLT-support2-text">
              {userProfileData?.mobile}{" "}
            </p>
          </div>

          <p className="m-0 cLT-support2-text fLT-Regular-sB">
            {isUserData?.job_name_id?.name}
          </p>
          {/* Info Show At Profile View */}
          {location.pathname ===
            `/freelancer-profile/${param?.id && param?.id}` && (
            <>
              {sideNavPersonalInfo.map((info, ix) => {
                return (
                  <div
                    className="d-flex justify-content-center aling-items-center"
                    key={ix}
                  >
                    <i
                      className={`${info?.iconName} uLT-img-contain iLT-sA ms-2`}
                    ></i>
                    <p className="mb-0 cLT-support2-text fLT-Regular-sA">
                      {info?.title} {info?.subTitle && "," + info?.subTitle}
                    </p>
                  </div>
                );
              })}
              <p dir="ltr" className="mb-0  fLT-Regular-sA cLT-smoke-text">
                ?????? ?????????? ?????? 55 ??????????
              </p>
            </>
          )}
          {/* Info Show At Edit Account View */}
          {location.pathname ===
            `/account_management/my-edit-account/${
              isUserData?.id && isUserData?.id
            }` &&
            personalInfo.map((info, ix) => {
              return (
                <div
                  className="d-flex justify-content-center aling-items-center"
                  key={ix}
                >
                  <i
                    className={`${info?.iconName} uLT-img-contain iLT-sA ms-2`}
                  ></i>
                  <p className="mb-0 cLT-support2-text fLT-Regular-sA">
                    {info?.title} {info?.subTitle && "," + info?.subTitle}
                  </p>
                </div>
              );
            })}
          {/* Profile Performance */}

          {isUserData?.id === userData?.id && (
            <div className="status d-flex justify-content-between align-items-center w-100">
              <p className="m-0">????????????</p>
              <div className="form-check form-switch">
                <input
                  disabled={changeStatusLoading}
                  className="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckChecked"
                  checked={status}
                  onChange={changeStatus}
                />
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckChecked"
                >
                  {status ? "????????" : "?????? ????????"}
                </label>
              </div>
            </div>
          )}

          <CompletionChart value={isUserData?.complete_profile} />
        </div>
        {/* Side Navigator Selector Component */}
        <div className="w-100">{selector}</div>
      </div>
    </>
  );
};

export default AsideFreelancerPage;
