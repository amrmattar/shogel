import cls from "./SkillComp.module.scss";
import { GrFormClose } from "react-icons/gr";

const ChosedSkill = ({ skill, close }) => {
  return (
    <div className={cls.chosedH}>
      <div>
        <p>{skill.name}</p>
      </div>
      <GrFormClose onClick={close} />
    </div>
  );
};
export default ChosedSkill;
