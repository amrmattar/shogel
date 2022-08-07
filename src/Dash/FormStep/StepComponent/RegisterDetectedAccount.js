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
      onClose={handleClose}
    >
      <div className="LT-account-holder">
        <div className=" my-5 LT-account-logo d-flex flex-column p-3">
          <div
            className="imLT-main-logo uLT-img-contain w-100"
            style={{ padding: "2rem 2rem", margin: "3rem 0" }}
          >
            {" "}
          </div>
          <p className="m-0 fLT-Regular-sB cLT-main-text">
            {" "}
            حدد نوع الحساب لا تقلق ، يمكن تغيير هذا لاحقًا{" "}
          </p>
        </div>
        <div style={{ marginTop: "7rem" }} className="d-flex">
          <button
            className="btn LT-account-type"
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
            className="btn LT-freelancer-type"
            // onClick={() => handleChangeScreen()}
            // onFocus={value.handleChange("user")}
            id={3}
            name="freelancer"
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
      </div>
    </Dialog>
  );
};
export default RegisterDetectedAccount;
