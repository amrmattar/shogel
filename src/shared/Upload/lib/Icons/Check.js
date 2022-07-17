import * as React from "react";

function SvgCheck(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}
    >
      <path
        fill="#6cc08a"
        d="M10.265 18l9.9-9.9-2.2-2.1-7.792 7.792-3.8-3.9-2.2 2.1L8.065 15.9l2.2 2.1"
      />
    </svg>
  );
}

export default SvgCheck;
