import { Dialog } from "@mui/material";
import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import ButtonShare from "../../../shared/Button/Button.shared";
import { LabelContext } from "../LabelDataContext/labelDataContext";

import "../NewStyle.scss";
import "./RegisterDetectedAccount.scss";
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
    <Dialog
      aria-labelledby="simple-dialog-title1"
      open={open ? open : false}
      // onClose={handleClose}
    >
      <div>
        <div className="LT-login-holder">
          <div
            style={{
              width: "6rem",
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
            <p
              className="m-0 fLT-Bold-sA cLT-main-text LT-account-title"
              name="client"
            >
              {" "}
              حســاب مستخدم
            </p>
          </button>
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
            <p
              className="m-0 fLT-Bold-sA cLT-main-text LT-freelancer-title"
              name="freelancer"
            >
              {" "}
              حســاب مشتغل
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
    </Dialog>
  );
};
export default RegisterDetectedAccount;
