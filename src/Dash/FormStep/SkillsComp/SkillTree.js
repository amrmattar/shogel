import SkillComp from "./SkillComp";

import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useEffect, useState } from "react";

const SkillTree = ({ parentHandler, skills }) => {
  const [data, setData] = useState({
    id: "root",
    name: "التصنيفات",
    children: skills,
  });

  const RenderTree = ({ nodes }) => {
    const addSkill = (id) => {
      parentHandler(id);
    };

    return (
      <TreeItem
        nodeId={nodes.id.toString()}
        key={nodes.id}
        className="treeItem-reverse-564asdas"
        label={
          nodes.id === "root" ? (
            <p className="m-0 me-3">{nodes.name}</p>
          ) : (
            <SkillComp clicked={addSkill} skill={nodes} noArrow />
          )
        }
      >
        {Array.isArray(nodes.children)
          ? nodes.children.map((nodes) => RenderTree({ nodes }))
          : null}
      </TreeItem>
    );
  };

  useEffect(() => {
    setData((prev) => ({ ...prev, children: skills }));
  }, [skills]);

  return skills.length ? (
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={["root"]}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      <RenderTree nodes={data} />
    </TreeView>
  ) : (
    <></>
  );
};
export default SkillTree;
