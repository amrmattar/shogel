import cls from "./SkillComp.module.scss";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import Checkbox from "@mui/material/Checkbox";

const SkillComp = ({ skill, clicked, dropClicked, open, noArrow }) => {
  return (
    <div className={cls.main}>
      <div className={cls.nameH}>
        <div
          style={{
            width: "3rem",
          }}
        >
          <Checkbox
            onClick={() => clicked(skill.id)}
            checked={skill.active}
            sx={{
              color: "#1EAAAD",
              "&.Mui-checked": {
                color: "#1EAAAD",
              },
            }}
          />
        </div>
        <div
          style={{
            lineHeight: "42px",
            fontSize: "14px",
          }}
        >
          {skill.name}
        </div>
      </div>
      {skill.children?.[0] && (
        <div>
          {!noArrow &&
            (open ? (
              <MdKeyboardArrowDown onClick={dropClicked} />
            ) : (
              <MdKeyboardArrowLeft onClick={dropClicked} />
            ))}
        </div>
      )}
    </div>
  );
};
export default SkillComp;
