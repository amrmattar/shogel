import { Dialog } from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonShare from "../../../shared/Button/Button.shared";
import { LabelContext } from "../LabelDataContext/labelDataContext";
import "../NewStyle.scss";
import "./RegisterDetectedAccount.scss";
import Logo from "../../../assets/Register-Icons/Logo.svg";
import Logo2 from "../../../assets/Register-Icons/Logo2.svg";

const RegisterDetectedAccount = (props) => {
  const value = useContext(LabelContext);
  const navigate = useNavigate();

  const handleChangeScreen = () => {
    switch (value?.accountType?.userKind) {
      case "client":
        return value.jumpPage(3);
      case "freelancer":
        return value.jumpPage(3);
      default:
        return null;
    }
  };
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    navigate("/");
  };

  return (
    <div className="DialogSim">
      <div style={{ padding: "2rem" }}>
        <div className="LT-login-holder">
          <div
            style={{
              width: "9rem",
              alignSelf: "center",
              margin: "0rem auto 0rem auto",
            }}
            className="imLT-main-logo uLT-img-contain one img"
          />
        </div>
        <div className=" LT-account-logo d-flex flex-column p-3">
          <p className="regiTitle"> نوع الحساب</p>
          <p className="mt-3 fLT-Regular-sB cLT-main-text">
            {" "}
            حدد نوع الحساب لا تقلق ، يمكن تغيير هذا لاحقًا{" "}
          </p>
        </div>
        <div
          style={{ margin: "1rem 0 2rem 0", justifyContent: "space-between" }}
          className="d-flex"
        >
          <button
            onClick={() => handleChangeScreen()}
            onFocus={value.handleChange("user")}
            id={3}
            name="freelancer"
            style={{
              backgroundColor: "#F8FAFC",
              height: "8rem",
              width: "9rem",
              border: "0",
            }}
          >
            <i
              className={` LT-freelancer-icon iLT-freelancer-icon uLT-img-contain `}
              name="freelancer"
            ></i>
            <img src={Logo} />
            <p
              className="m-0 mb-2 fLT-Bold-sA cLT-main-text LT-freelancer-title"
              name="freelancer"
            >
              {" "}
              حســاب مشتغل
            </p>
          </button>
          <button
            style={{
              backgroundColor: "#F8FAFC",
              height: "8rem",
              width: "9rem",
              border: "0",
            }}
            onClick={() => handleChangeScreen()}
            onFocus={value.handleChange("user")}
            id={2}
            name="client"
          >
            <i
              className={` LT-account-icon iLT-client-icon uLT-img-contain `}
              name="client"
            >
              <div className="LT-placeholder" name="client"></div>
              <div
                className="imLT-main-logo uLT-img-contain LT-logo-on-icon"
                name="client"
              >
                {" "}
              </div>
            </i>
            <img src={Logo2} />
            <p
              className="m-0 mb-2 fLT-Bold-sA cLT-main-text LT-account-title"
              name="client"
            >
              {" "}
              حســاب مستخدم
            </p>
          </button>
        </div>
        <div style={{ width: "30%" }}>
          <ButtonShare
            // type={!validation}
            // loading={nextLoading}
            onClick={value.prevPage}
            innerText={"رجوع"}
            btnClasses={"three cLT-secondary-bg"}
            textClasses={"py-1 px-4 cLT-white-text fLT-Regular-sB"}
          />
        </div>
      </div>
    </div>
  );
};
export default RegisterDetectedAccount;
