import cls from "./SkillComp.module.scss";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import Checkbox from "@mui/material/Checkbox";
import { useEffect } from "react";
import { useState } from "react";

const SkillComp = ({
  skill,
  checkedSkls,
  customTree,
  clicked,
  dropClicked,
  open,
  noArrow,
  isActiveDebnd,
}) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!checkedSkls?.length) return setIsActive(false);

    const currentCheckbox = checkedSkls?.find(
      (skl) => (skl.id || skl) === skill.id
    );
    if (currentCheckbox) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [checkedSkls, skill.id]);

  return (
    <div className={cls.main}>
      <div className={cls.nameH}>
        <div
          style={{
            width: "3rem",
          }}
        >
          {customTree ? (
            <Checkbox
              onClick={() => clicked(skill.id)}
              checked={isActive}
              sx={{
                color: "#1EAAAD",
                "&.Mui-checked": {
                  color: "#1EAAAD",
                },
              }}
            />
          ) : (
            <Checkbox
              onClick={() => clicked(skill.id)}
              checked={isActiveDebnd ? isActive : skill.active}
              sx={{
                color: "#1EAAAD",
                "&.Mui-checked": {
                  color: "#1EAAAD",
                },
              }}
            />
          )}
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
