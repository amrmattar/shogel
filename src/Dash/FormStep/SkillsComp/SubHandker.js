import SkillComp from "./SkillComp";

const SubHandler = ({ skill, subHandler, sub2Handler, parentId }) => {
  return (
    <div>
      <SkillComp clicked={() => subHandler(parentId, skill.id)} skill={skill} />
      <div style={{ marginRight: "2rem" }}>
        {skill.active &&
          skill.children[0] &&
          skill.children.map((ele) => (
            <SkillComp
              clicked={() => sub2Handler(parentId, skill.id, ele.id)}
              skill={ele}
            />
          ))}
      </div>
    </div>
  );
};
export default SubHandler;
