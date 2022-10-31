import Checkbox from "@mui/material/Checkbox";
import { useEffect, useState } from "react";
import cls from "./DynamicFilter.module.scss";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";

const CategoryHandler = ({ ele, changeState, isSub, isChecked }) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (isChecked !== undefined) {
      setChecked(isChecked);
    }
  }, [isChecked]);

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
