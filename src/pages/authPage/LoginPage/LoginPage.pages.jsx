import React, { useState } from "react";
import { Button, Dialog } from "@mui/material";
import LoginComponent from "../../../components/auth/Login/Login.component";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import UserFeedBackShared from "../../../shared/UserFeedBack/UserFeedBack.shared";
import { getAuthentication } from "../../../core/redux/reducers/Authentication/AuthenticationReducer.core";
import { LoginServices } from "../../../core/services/AuthServices/Method_LoginData/Method_LoginData.core";
import { getMessages } from "../../../core/redux/reducers/Messages/Messages.core";
import { getUserLoginData } from "../../../core/redux/reducers/UserLoginData/UserLoginData.core";
import { Navigate } from "react-router-dom";
import { getRoleUser } from "../../../core/redux/reducers/Role/RoleReducer.core";
import { NavLink } from "react-router-dom";

const LoginPage = ({
  open,
  setLoginOpen,
  setSignupOpen,
  setMobileOpen,
  forgetPass,
}) => {
  const location = useLocation();
  const routeTo = location.state?.routeTo;

  const [stateLoginData, messages] = useSelector((state) => [
    state.login,
    state.messages,
  ]);
  const [loginCheck, setLoginCheck] = useState(false);
  let navigate = useNavigate();

  const switchSignup = () => {
    setMobileOpen(true);
    setSignupOpen(false);
    setLoginOpen(false);
  };
  const handleClose = () => {
    setLoginOpen(false);
    setSignupOpen(false);
  };
  const dispatch = useDispatch();

  const formSubmit = async (e) => {
    e.preventDefault();
    setLoginCheck(true);
    const dataWithToken = {
      ...stateLoginData,
    };

    LoginServices._POST_LoginData(dataWithToken)
      .then((res) => {
        if (res?.data?.status === 1) {
          setLoginCheck(false);
          dispatch(
            getMessages({
              messages: res?.data?.message,
              messageType: "success",
              messageClick: true,
            })
          );
          localStorage.setItem("UI", res?.data?.data?.id);
          const data = {
            avatar: res?.data?.data?.avatar,
            id: res?.data?.data?.id,
            username: res?.data?.data?.username,
            profileValidation: res?.data?.data?.profile_validation,
            userRole: res?.data?.data?.role,
          };

          dispatch(getUserLoginData(data));
          const userToken = res?.data?.data.token;
          localStorage.setItem("userTK", JSON.stringify(userToken));
          dispatch(getAuthentication(true));
          localStorage.setItem("usID", res?.data?.data?.id);
          localStorage.setItem("userRL", res?.data?.data?.role?.id);
          localStorage.setItem("valid", res?.data?.data?.profile_validation);
          dispatch(getRoleUser(true));
          if (res?.data?.data?.role.id == 3 || res?.data?.data?.role?.id == 4) {
            const routTimeOut = setTimeout(() => {
              navigate(routeTo);
              setLoginOpen(false);
            }, 800);

            return () => clearTimeout(routTimeOut);
          }
        } else {
          setLoginCheck(false);
        }
      })
      .catch((err) => {
        setLoginCheck(false);
        if (stateLoginData?.email !== "" && stateLoginData?.password !== "") {
          dispatch(
            getMessages({
              messages: err?.response?.data?.message,
              messageType: "error",
              messageClick: true,
            })
          );
        } else if (stateLoginData?.password === "") {
          dispatch(
            getMessages({
              messages: err.response.data.message.password[0],
              messageType: "error",
              messageClick: true,
            })
          );
        } else if (stateLoginData?.email === "") {
          dispatch(
            getMessages({
              messages: err?.response?.data?.message,
              messageType: "error",
              messageClick: true,
            })
          );
        } else {
          dispatch(
            getMessages({
              messages: err?.response?.data?.message,
              messageType: "error",
              messageClick: true,
            })
          );
        }
      });
  };

  return (
    <>
      <UserFeedBackShared
        message={messages.messages}
        type={messages?.messageType}
        clickMe={messages?.messageClick}
      />
      <Dialog
        aria-labelledby="simple-dialog-title1"
        open={open ? open : false}
        onClose={handleClose}
      >
        <Form onSubmit={formSubmit}>
          <LoginComponent
            loginCheck={loginCheck}
            forgetPassword={() => setLoginOpen(false)}
          />
          <div
            className="d-flex align-items-center justify-content-center py-3 gap-1"
            style={{ paddingBottom: "3rem" }}
          >
            <p className="m-0 fLT-Bold-sm-sA cLT-main-text"> ليس لديك حساب </p>
            {/* <Button onClick={switchSignup} className='px-0'>
                            <p className='uLT-list-style fLT-Bold-sm-sA cLT-secondary-text '>إنشاء حساب جديد</p>
                        </Button> */}
            <NavLink
              to={"/register"}
              onClick={() => setLoginOpen(false)}
              className="uLT-list-style fLT-Bold-sm-sA cLT-secondary-text"
            >
              إنشاء حساب جديد
            </NavLink>
          </div>
        </Form>
      </Dialog>
    </>
  );
};

export default LoginPage;
