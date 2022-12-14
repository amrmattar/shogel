import React from "react";

const FlancerCommunicatedComponent = ({ iconName, iconID }) => {
  return (
    <div
      id={iconID}
      className="d-flex uLT-advs-contact uLT-click justify-content-center align-items-center uLT-bd-f-secondary-sA uLT-f-radius-sB p-2"
    >
      <i className={`d-flex  ${iconName} iLT-sC uLT-img-contain`}></i>
    </div>
  );
};

export default FlancerCommunicatedComponent;
