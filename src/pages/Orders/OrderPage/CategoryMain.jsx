import { useEffect, useState } from "react";
import CategoryHandler from "./CategoryHandler";

const CategoryMain = ({ ele, setCategory, activesId }) => {
  const [checked, setChecked] = useState(false);

  const stateHandler = (id) => {
    setChecked(!checked);
    setCategory(id, !checked);
  };

  useEffect(() => {
    setChecked(activesId?.includes(ele.id));
  }, [activesId, ele.id]);

  return (
    <div>
      <div>
        <CategoryHandler
          isChecked={checked}
          changeState={stateHandler}
          ele={ele}
        />
      </div>

      {ele.parent &&
        checked &&
        ele.children.map((el) => (
          <CategoryHandler isChecked={checked} isSub={true} ele={el} />
        ))}
    </div>
  );
};
export default CategoryMain;
