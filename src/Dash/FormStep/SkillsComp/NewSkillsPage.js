import { SettingsInputSvideo } from "@mui/icons-material";
import { useContext, useState } from "react";
import { LabelContext } from "../LabelDataContext/labelDataContext";
import ChosedSkill from "./ChosedSkill";
import SkillComp from "./SkillComp";
import cls from "./Skills.module.scss";
const skillss = [
  {
    id: 1,
    name: "aa",
    subs: [
      { id: 1, name: "bb" },
      { id: 2, name: "ss" },
      { id: 3, name: "ss" },
      { id: 4, name: "ss" },
      { id: 5, name: "ss" },
      { id: 6, name: "ss" },
      { id: 7, name: "ss" },
      { id: 8, name: "ss" },
      { id: 9, name: "ss" },
      { id: 11, name: "ss" },
      { id: 12, name: "ss" },
      { id: 13, name: "ss" },
      { id: 14, name: "ss" },
      { id: 15, name: "ss" },
      { id: 16, name: "ss" },
      { id: 17, name: "ss" },
      { id: 51, name: "ss" },
      { id: 511, name: "ss" },
      { id: 5111, name: "ss" },
      { id: 51111, name: "ss" },
      { id: 5111111, name: "ss" },
      { id: 51111111111, name: "ss" },
      { id: 511111111111111, name: "ss" },
    ],
  },
  {
    id: 2,
    name: "aa",
    subs: [
      { id: 1, name: "ss" },
      { id: 2, name: "ss" },
      { id: 3, name: "ss" },
      { id: 4, name: "ss" },
      { id: 5, name: "ss" },
    ],
  },
  {
    id: 3,
    name: "aa",
    subs: [
      { id: 1, name: "ss" },
      { id: 2, name: "ss" },
      { id: 3, name: "ss" },
      { id: 4, name: "ss" },
      { id: 5, name: "ss" },
    ],
  },
  {
    id: 4,
    name: "qq",
    subs: [
      { id: 1, name: "ss" },
      { id: 2, name: "ss" },
      { id: 3, name: "ss" },
      { id: 4, name: "ss" },
      { id: 5, name: "ss" },
    ],
  },
];

const SkillsStep = () => {
  const value = useContext(LabelContext);

  const [inpV, setInpV] = useState("");
  const [skills, setSkills] = useState(skillss);
  const [subs, setSubs] = useState([]);
  const [chosenSubs, setChosenSubs] = useState([]);
  const findSub = (id) => {
    let arr = skills.filter((ele) => ele.id == id);

    setSubs(arr[0].subs);
    setChosenSubs([]);
  };
  const handleChosedSub = (id) => {
    let arr = subs.filter((ele) => ele.id == id);
    let arr2 = subs.filter((ele) => ele.id != id);

    setSubs(arr2);
    setChosenSubs([...chosenSubs, arr[0]]);
  };
  const handleCancel = (id) => {
    let arr = chosenSubs.filter((ele) => ele.id == id);
    let arr2 = chosenSubs.filter((ele) => ele.id != id);

    setSubs([...subs, arr[0]]);
    setChosenSubs(arr2);
  };
  return (
      <div className={cls.main}>
        <p className={cls.title}>اخبرنا عن مهاراتك</p>
        <div className={cls.head}>
          <input
            type={"text"}
            value={inpV}
            onChange={(e) => setInpV(e.target.value)}
          />
          <p>
            او <span>اختار المهارة</span>
          </p>
        </div>
        <div className={cls.contain}>
          <div className={cls.grid}>
            {skills
              .filter((ele) => ele.name.includes(inpV))
              .map((ele) => (
                <SkillComp findSub={() => findSub(ele.id)} skill={ele} />
              ))}
          </div>
          <div className={cls.grid}>
            {subs.map((ele) => (
              <SkillComp
                chosenSub={() => handleChosedSub(ele.id)}
                isSub={true}
                skill={ele}
              />
            ))}
          </div>
          <div className={cls.grid}>
            {chosenSubs[0] && (
              <div className={cls.messageH}>
                <p className={cls.h}>{chosenSubs.length} مهارات</p>
                <p className={cls.p}>
                  اختار علي الأقل مهارة واحدة لنساعدك علي ترشيح الوظائق المناسبة
                  إليك
                </p>
              </div>
            )}
            <div className={cls.gridF}>
              {chosenSubs.map((ele) => (
                <ChosedSkill close={() => handleCancel(ele.id)} skill={ele} />
              ))}
            </div>
          </div>
        </div>
      <button onClick={() => value.jumpPage(6)} disabled={!chosenSubs[0]} className={cls.next}>
        {" "}
        التالي
      </button>
      </div>
    
  );
};
export default SkillsStep;
