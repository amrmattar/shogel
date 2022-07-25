import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
import cls from "./DynamicFilter.module.scss";
const CategoryHandler = ({ ele }) => {
  const [checked, setChecked] = useState(false);
  return (
    <div className={cls.checkHolder}>
      <Checkbox
        onClick={() => setChecked(!checked)}
        checked={checked}
        defaultChecked
        color="default"
      />
      <p className={checked ? cls.check : ""}>{ele.title}</p>
    </div>
  );
};
export default CategoryHandler;
