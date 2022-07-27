import { useState } from "react";
import CategoryHandler from "./CategoryHandler";
const CategoryMain = ({ ele }) => {
  const [checked, setChecked] = useState(false);
  return (
    <div>
      <div>
        <CategoryHandler changeState={() => setChecked(!checked)} ele={ele} />
      </div>

      {ele.subs &&
        checked &&
        ele.subs.map((el) => <CategoryHandler isSub={true} ele={el} />)}
    </div>
  );
};
export default CategoryMain;
