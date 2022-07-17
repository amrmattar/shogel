import React, { Fragment, useCallback, useContext, useEffect, useRef, useState } from "react";
import { LabelContext } from "../LabelDataContext/labelDataContext";
const CompanyLocation = () => {
    const value = useContext(LabelContext);

    const getBack = () => {
        value.jumpPage(4)
      }
    return (
        <>
        <p>
        CompanyLocation
        </p>
        <button  onClick={() => getBack()} style={{ margin: 25 }} >
          Previous
        </button>
        </>
    )
}
export default CompanyLocation