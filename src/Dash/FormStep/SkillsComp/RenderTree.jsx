import SkillComp from "./SkillComp";
import TreeItem from "@mui/lab/TreeItem";

const RenderTree = ({
  nodes,
  addChosedSkils,
  customTree,
  checkedSkls,
  isActiveDebnd,
}) => {
  return (
    <TreeItem
      nodeId={nodes.id.toString()}
      key={nodes.id}
      className="treeItem-reverse-564asdas me-2"
      label={
        nodes.id === "root" ? (
          <p className="m-0 me-3">{nodes.name}</p>
        ) : (
          <SkillComp
            isActiveDebnd={isActiveDebnd}
            checkedSkls={checkedSkls}
            customTree={customTree}
            clicked={addChosedSkils}
            skill={nodes}
            noArrow
          />
        )
      }
    >
      {Array.isArray(nodes?.child || nodes?.children)
        ? (nodes?.child || nodes?.children).map((nodes, idx) => (
            <RenderTree
              isActiveDebnd={isActiveDebnd}
              key={idx}
              nodes={nodes}
              addChosedSkils={addChosedSkils}
              customTree={customTree}
              checkedSkls={checkedSkls}
            />
          ))
        : null}
    </TreeItem>
  );
};

export default RenderTree;
