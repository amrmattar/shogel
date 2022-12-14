import React from "react";

const FlancerDescriptionTitleComponent = ({ descriptionTitle, fontSize }) => {
  return (
    <div>
      <p className={`m-0 pb-2 ${fontSize} cLT-support2-text`}>
        {descriptionTitle}
      </p>
    </div>
  );
};

export default FlancerDescriptionTitleComponent;
