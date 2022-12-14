import React, { useState } from "react";
import "./MagazinesFilter.component.scss";
const MagazinesFilterComponent = ({ APIs }) => {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="d-flex flex-column justify-content-center align-items-start ">
      <label className="d-flex align-items-center gap-3 justify-content-start w-100 uLT-click ">
        <input
          type="checkbox"
          onChange={(e) =>
            e.target.checked ? setToggle(true) : setToggle(false)
          }
          name="one"
        />
        <span className="fLT-Regular-sB cLT-support2-text">{APIs?.title}</span>
        <i
          className={`${APIs?.iconName} uLT-img-contain iLT-sA me-auto ${
            toggle ? "arrow-transition" : ""
          }`}
        ></i>
      </label>
      <div
        className={`px-4 pb-2 fLT-Regular-sA cLT-smoke-text  ${
          toggle ? "show" : "closed"
        }`}
      >
        {APIs?.subTitle?.map((elm, ix) => {
          return (
            <div key={ix}>
              <p className="mb-2 px-3 fLT-Regular-sB cLT-support2-text">
                {elm?.name}
              </p>
              <div>
                {elm?.list?.map((el, ix) => {
                  return (
                    <p key={ix} className="pe-4">
                      {el?.name}
                    </p>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MagazinesFilterComponent;
