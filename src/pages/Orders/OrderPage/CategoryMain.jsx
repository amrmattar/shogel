import { useState } from "react";
import CategoryHandler from "./CategoryHandler";
const CategoryMain = ({ ele, setCategory }) => {
  const [checked, setChecked] = useState(false);
  const stateHandler = (id) => {
    setChecked(!checked);
    setCategory(id, !checked);
  };
  return (
    <div>
      <div>
        <CategoryHandler changeState={stateHandler} ele={ele} />
      </div>

      {ele.parent &&
        checked &&
        ele.children.map((el) => <CategoryHandler isSub={true} ele={el} />)}
    </div>
  );
};
export default CategoryMain;
