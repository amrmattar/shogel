import cls from "./SkillComp.module.scss";
import { BsArrowLeftShort } from "react-icons/bs";
import { BsInboxes } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";

const SkillComp = ({ skill, findSub, isSub, chosenSub, cancel }) => {
  return (
    <div onClick={findSub || chosenSub || cancel} className={cls.main}>
      <div className={cls.nameH}>
        {!isSub && <BsInboxes />}
        <p>{skill.name}</p>
      </div>
      {isSub ? <AiOutlinePlus /> : <BsArrowLeftShort />}
    </div>
  );
};
export default SkillComp;
