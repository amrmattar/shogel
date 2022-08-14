import cls from "./SkillComp.module.scss";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import Checkbox from "@mui/material/Checkbox";

const SkillComp = ({ skill, clicked }) => {
  return (
    <div onClick={clicked} className={cls.main}>
      <div className={cls.nameH}>
        <div
          style={{
            width: "3rem",
          }}
        >
          <Checkbox
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
          {skill.active ? <MdKeyboardArrowDown /> : <MdKeyboardArrowLeft />}
        </div>
      )}
    </div>
  );
};
export default SkillComp;
