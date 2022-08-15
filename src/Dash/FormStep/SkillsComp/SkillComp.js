import cls from "./SkillComp.module.scss";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import Checkbox from "@mui/material/Checkbox";

const SkillComp = ({ skill, clicked, dropClicked,open }) => {
  return (
    <div className={cls.main}>
      <div className={cls.nameH}>
        <div
          style={{
            width: "3rem",
          }}
        >
          <Checkbox
            onClick={clicked}
            checked={skill.active || false}
            sx={{
              color: "#1EAAAD",
              "&.Mui-checked": {
                color: "#1EAAAD",
              },
            }}
          />
        </div>
        <p>{skill.name}</p>
      </div>
      {skill.children?.[0] && (
        <div>
          {open ? (
            <MdKeyboardArrowDown onClick={dropClicked} />
          ) : (
            <MdKeyboardArrowLeft onClick={dropClicked} />
          )}
        </div>
      )}
    </div>
  );
};
export default SkillComp;
