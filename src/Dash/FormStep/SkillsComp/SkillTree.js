import TreeView from "@mui/lab/TreeView";
import RenderTree from "./RenderTree";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useEffect, useState } from "react";

const SkillTree = ({ skills, addChosedSkils }) => {
  const [data, setData] = useState({
    id: "root",
    name: "التصنيفات",
    children: skills,
    child: skills,
  });

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      children: skills,
      child: skills,
    }));
  }, [skills]);

  return skills.length ? (
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={["root"]}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      <RenderTree addChosedSkils={addChosedSkils} nodes={data} />
    </TreeView>
  ) : (
    <></>
  );
};
export default SkillTree;
