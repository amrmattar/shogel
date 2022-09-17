import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ReactQuill from "react-quill";
import { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./TextEditor.shared.scss";
const TextEditorShared = ({
  data,
  setDescription,
  setMaxLength,
  characterLength,
}) => {
  const desInput = useRef();
  const [state, setState] = useState({ value: "" });
  const recivedData = JSON.parse(localStorage.getItem("TD"));
  const handleChange = (e) => {
    setState({ value: e.target.value });
    setMaxLength(desInput?.current?.value?.length - 1);
    setDescription(e.target.value);
  };
  const getLength = useCallback(() => {
    setMaxLength(desInput?.current?.value.length - 1);
  }, [desInput?.current?.value]);
  useEffect(() => {
    const timeOut = setTimeout(() => {
      getLength();
    }, 1000);
    return () => clearTimeout(timeOut);
  }, [getLength]);
  // const handleChange = (value) => {
  //   setState({ value });
  //   setMaxLength(desInput?.current?.unprivilegedEditor?.getLength() - 1);
  //   setDescription(value);
  // };
  // const getLength = useCallback(() => {
  //   setMaxLength(desInput?.current?.unprivilegedEditor.getText()?.length - 1);
  // }, [desInput?.current?.unprivilegedEditor.getText()]);
  // useEffect(() => {
  //   const timeOut = setTimeout(() => {
  //     getLength();
  //   }, 1000);
  //   return () => clearTimeout(timeOut);
  // }, [getLength]);

  const checkCharacterCount = (event) => {
    const unprivilegedEditor = desInput.current.unprivilegedEditor;
    if (
      unprivilegedEditor.getLength() > characterLength &&
      event.key !== "Backspace"
    )
      event.preventDefault();
  };
  // Add sizes to whitelist and register them
  const Size = Quill.import("formats/size");
  Size.whitelist = ["extra-small", "small", "medium", "large"];
  Quill.register(Size, true);

  const modules = {
    toolbar: {
      container: "#toolbar",
    },
  };
  return (
    <div className="container-fluid container-lg px-0" dir="ltr">
      <div id="toolbar"></div>
      <div className="w-100 " dir="rtl">
        {/* <ReactQuill
          style={{ maxWidth: "100%", overflow: "hidden" }}
          className="h-100 w-100 inpBG "
          onKeyDown={checkCharacterCount}
          theme="snow"
          placeholder="التفــاصيل :"
          value={state.value ? state.value || recivedData?.description : data}
          onChange={handleChange}
          modules={modules}
          ref={desInput}
        /> */}
        <textarea
          ref={desInput}
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
