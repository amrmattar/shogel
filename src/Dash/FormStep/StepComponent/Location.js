import React, { Fragment, useCallback, useContext, useEffect, useRef, useState } from "react";
import { LabelContext } from "../LabelDataContext/labelDataContext";
const Location = () => {
    const value = useContext(LabelContext);

    const getBack = () => {
        value.jumpPage(4)
      }
    return (
        <>
        <p>
        Location
        </p>
        <button  onClick={() => getBack()} style={{ margin: 25 }} name='undo'>
          Previous
        </button>
        </>
    )
}
export default Location