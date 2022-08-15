import cls from "./SkillComp.module.scss";
import SkillComp from "./SkillComp";
import SubHandler from "./SubHandker";
import { useState } from "react";

const SkillTree = ({ skill, parentHandler, subHandler, sub2Handler }) => {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const handleClicked = (e) => {
    parentHandler(skill.id);
    if (e.target.checked) {
      setOpen(true);
      setChecked(true);
    } else {
      setChecked(false);
    }
  };
  return (
    <div>
      <SkillComp
        open={open}
        dropClicked={() => setOpen(!open)}
        clicked={handleClicked}
        skill={skill}
      />
      <div className={cls.firstSub}>
        {open &&
          skill.children[0] &&
          skill.children.map((ele, indx) => (
            <SubHandler
              key={indx}
              subHandler={subHandler}
              sub2Handler={sub2Handler}
              skill={ele}
              parentId={skill.id}
              checked={checked}
            />
          ))}
      </div>
    </div>
  );
};
export default SkillTree;
