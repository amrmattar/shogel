import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
import cls from "./DynamicFilter.module.scss";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";

const CategoryHandler = ({ ele, changeState, isSub }) => {
  const [checked, setChecked] = useState(false);
  return (
    <div className={!isSub ? cls.checkHolder : cls.subHolder}>
      <Checkbox
        onClick={() => {
          setChecked(!checked);
          changeState(ele.id);
        }}
        checked={checked}
        defaultChecked
        color="default"
      />
      <p className={checked ? cls.check : ""}>{ele.name}</p>
      <div className={cls.icon}>
        {ele.parent && (checked ? <IoMdArrowDropup /> : <IoMdArrowDropdown />)}
      </div>
    </div>
  );
};
export default CategoryHandler;
