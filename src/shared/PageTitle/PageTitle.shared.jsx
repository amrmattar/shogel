import React from "react";

const PageTitle = React.memo(
  ({
    title,
    smallUnderTitle = "",
    titleColor = "cLT-dark-text",
    smallColor = "cLT-gray-text",
  }) => {
    return (
      <div className="  pb-md-2 pb-2 m-0">
        <p className={`m-0 fLT-Bold-sA ${titleColor}`}>{title}</p>
        {smallUnderTitle !== "" ? (
          <p className="mb-0 mt-2 mx-2 fCT-Regular-sD">
            <small className={smallColor}>{smallUnderTitle}</small>
          </p>
        ) : (
          <div
            style={{ height: "3px" }}
            className={`cLT-secondary-bg uLT-f-radius d-inline-block px-3`}
          ></div>
        )}
      </div>
    );
  }
);

export default PageTitle;
