import React, { useEffect, useState } from "react";
import { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./TextEditor.shared.scss";
const TextEditorShared = ({ data, setDescription, setMaxLength }) => {
  const [state, setState] = useState({ value: "" });
  const recivedData = JSON.parse(localStorage.getItem("TD"));

  const handleChange = (e) => {
    setState({ value: e.target.value });
    setDescription(e.target.value);
  };

  useEffect(() => {
    setMaxLength(state.value.length);
  }, [state.value.length, setMaxLength]);

  // Add sizes to whitelist and register them
  const Size = Quill.import("formats/size");
  Size.whitelist = ["extra-small", "small", "medium", "large"];
  Quill.register(Size, true);

  return (
    <div className="container-fluid container-lg px-0" dir="ltr">
      <div id="toolbar"></div>
      <div className="w-100 " dir="rtl">
        <textarea
          maxLength={5000}
          onChange={handleChange}
          placeholder="التفــاصيل :"
          value={state.value ? state.value || recivedData?.description : data}
          className="sharedInp"
        />
      </div>
    </div>
  );
};

export default TextEditorShared;
