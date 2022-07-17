import * as React from "react";

function SvgClose(props, isClick) {
 
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      className="uLT-click"
      {...props}
    >
      <path
      className="uLT-click"
        fill="#ed665f"
        d="M18 15.9L14.1 12 18 8.1 15.8 6l-3.9 3.9L8.1 6 5.9 8.1 9.8 12l-3.9 3.9L8.1 18l3.8-3.9 3.9 3.9z"
      />
    </svg>
  );
}

export default SvgClose;
