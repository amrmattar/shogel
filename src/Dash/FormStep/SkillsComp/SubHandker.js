import { useEffect, useState } from "react";
import SkillComp from "./SkillComp";

const SubHandler = ({ skill, subHandler, sub2Handler, parentId, checked }) => {
  const [open, setOpen] = useState(false);
  const handleClicked = () => {
    subHandler(parentId, skill.id);
    !open && setOpen(true);
  };
  useEffect(() => {
    skill.active && setOpen(true);
  }, [checked]);
  return (
    <div>
      <SkillComp
        open={open}
        dropClicked={() => setOpen(!open)}
        clicked={handleClicked}
        skill={skill}
      />
      <div style={{ marginRight: "2rem" }}>
        {open &&
          skill.children[0] &&
          skill.children.map((ele, indx) => (
            <>
              <SkillComp
                key={indx}
                clicked={() => sub2Handler(parentId, skill.id, ele.id)}
                skill={ele}
              />
            </>
          ))}
      </div>
    </div>
  );
};
export default SubHandler;
