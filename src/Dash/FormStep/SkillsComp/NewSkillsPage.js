import { SettingsInputSvideo } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import { API } from "../../../enviroment/enviroment/enviroment";
import { LabelContext } from "../LabelDataContext/labelDataContext";
import ChosedSkill from "./ChosedSkill";
import SkillComp from "./SkillComp";
import cls from "./Skills.module.scss";
const SkillsStep = () => {
  const value = useContext(LabelContext);
  const [inpV, setInpV] = useState("");
  const [skills, setSkills] = useState([]);
  const [subs, setSubs] = useState([]);
  const [chosenSubs, setChosenSubs] = useState([]);
  const findSub = (id) => {
    let arr = skills.filter((ele) => ele.id == id);
    if (arr[0].children?.[0]) {
      setSubs(arr[0].children);
      setChosenSubs([]);
      value.setSkills([]);
    } else {
      let arr2 = skills.filter((ele) => ele.id != id);
      setSkills(arr2);
      setChosenSubs([...chosenSubs, arr[0]]);
      value.setSkills([...chosenSubs, arr[0]]);
    }
  };
  const handleChosedSub = (id) => {
    let arr = subs.filter((ele) => ele.id == id);
    let arr2 = subs.filter((ele) => ele.id != id);

    setSubs(arr2);
    setChosenSubs([...chosenSubs, arr[0]]);
    value.setSkills([...chosenSubs, arr[0]]);
  };
  const handleCancel = (id) => {
    let arr = chosenSubs.filter((ele) => ele.id == id);
    let arr2 = chosenSubs.filter((ele) => ele.id != id);
    if (arr[0]?.parent == true) {
      setSkills([...skills, arr[0]]);
      setChosenSubs(arr2);
      value.setSkills(arr2);
    } else {
      setSubs([...subs, arr[0]]);
      setChosenSubs(arr2);
      value.setSkills(arr2);
    }
  };
  useEffect(() => {
    API.get("coredata/category/list")
      .then((res) => {
        let arr = res.data.data?.map((ele) => {
          ele.parent = true;
          return ele;
        });
        setSkills(arr);
      })
      .catch((e) => {});
  }, []);
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
      <button
        onClick={() => value.jumpPage(6)}
        disabled={!chosenSubs[0]}
        className={cls.next}
      >
        {" "}
        التالي
      </button>
    </div>
  );
};
export default SkillsStep;
