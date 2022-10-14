import SkillComp from "./SkillComp";
import TreeItem from "@mui/lab/TreeItem";

const RenderTree = ({ nodes, addChosedSkils }) => {
  return (
    <TreeItem
      nodeId={nodes.id.toString()}
      key={nodes.id}
      className="treeItem-reverse-564asdas"
      label={
        nodes.id === "root" ? (
          <p className="m-0 me-3">{nodes.name}</p>
        ) : (
          <SkillComp clicked={addChosedSkils} skill={nodes} noArrow />
        )
      }
    >
      {Array.isArray(nodes?.child || nodes?.children)
        ? (nodes?.child || nodes?.children).map((nodes, idx) => (
            <RenderTree
              key={idx}
              nodes={nodes}
              addChosedSkils={addChosedSkils}
            />
          ))
        : null}
    </TreeItem>
  );
};

export default RenderTree;
