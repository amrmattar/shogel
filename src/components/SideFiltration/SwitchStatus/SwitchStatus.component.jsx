import React from "react";
import "./SwitchStatusComponent.scss";
const SwitchStatusComponent = () => {
  return (
    <>
      <div className="form-check form-switch d-flex align-items-center gap-3  ">
        <input
          className="form-check-input uLT-click"
          type="checkbox"
          id="flexSwitchCheckChecked"
        />
        <label
          className="form-check-label fLT-Regular-sB cLT-gray-text"
          htmlFor="flexSwitchCheckChecked"
        >
          مشتغلين متصلين بالانترنت فقط
        </label>
      </div>
    </>
  );
};

export default SwitchStatusComponent;
