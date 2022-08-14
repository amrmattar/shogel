import cls from "./SkillComp.module.scss";
import SkillComp from "./SkillComp";
import SubHandler from "./SubHandker";

const SkillTree = ({ skill, parentHandler, subHandler, sub2Handler }) => {
  return (
    <div>
      <SkillComp clicked={() => parentHandler(skill.id)} skill={skill} />
      <div className={cls.firstSub}>
        {skill.active &&
          skill.children[0] &&
          skill.children.map((ele) => (
            <SubHandler
              subHandler={subHandler}
              sub2Handler={sub2Handler}
                  skill={ele}
                  parentId={skill.id}
            />
          ))}
      </div>
    </div>
  );
};
export default SkillTree;
