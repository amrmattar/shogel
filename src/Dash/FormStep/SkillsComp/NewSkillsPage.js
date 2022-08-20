import { useContext, useEffect, useState } from "react";
import { API } from "../../../enviroment/enviroment/enviroment";
import { LabelContext } from "../LabelDataContext/labelDataContext";
import ChosedSkill from "./ChosedSkill";
import cls from "./Skills.module.scss";
import SkillTree from "./SkillTree";

const SkillsStep = () => {
  const value = useContext(LabelContext);
  const [inpV, setInpV] = useState("");
  const [skills, setSkills] = useState([]);
  const [chosenSubs, setChosenSubs] = useState([]);

  const handleCancel = (id, parentId, subId) => {
    let arr2 = chosenSubs.filter((ele) => ele.id != id);
    setChosenSubs(arr2);
    value.setSkills(arr2);
    if (parentId && subId) {
      handle2Sub(parentId, subId, id);
    } else {
      parentId ? handleSub(parentId, id) : handleParent(id);
    }
  };
  useEffect(() => {
    API.get("coredata/category/list?search=s")
      .then((res) => {
        let arr = res.data.data?.map((ele) => {
          ele.active = false;
          return ele;
        });
        setSkills(arr);
      })
      .catch((e) => {});
  }, []);
  const getBack = () => {
    value.prevPage();
  };
  const choosedSkills = () => {
    let arr = [...skills];
    let chosed = [];
    arr.forEach((parent) => {
      parent.active && !parent.children[0] && chosed.push(parent);

      parent.children.forEach((sub) => {
        sub.parentId = parent.id;
        sub.active && !sub.children[0] && chosed.push(sub);

        sub.children.forEach((sub2) => {
          sub2.parentId = parent.id;
          sub2.subId = sub.id;
          sub2.active && chosed.push(sub2);
        });
      });
    });
    setChosenSubs(chosed);
    value.setSkills(chosed);
  };
  const handleParent = (id) => {
    let arr = [...skills];

    arr.forEach((parent) => {
      if (parent.id == id) {
        parent.active = !parent.active;
        parent.children.forEach((sub) => {
          sub.active = parent.active;

          sub.children.forEach((sub2) => {
            sub2.active = parent.active;
          });
        });
      }
    });
    setSkills(arr);
  };
  const handleSub = (id, subId) => {
    let arr = [...skills];
    arr.forEach((parent) => {
      if (parent.id == id) {
        let activeChilds = [];

        parent.children.forEach((sub) => {
          if (sub.id == subId) {
            sub.active = !sub.active;
            if (!sub.active) parent.active = false;

            sub.active && activeChilds.push(sub);
            if (activeChilds.length == parent.children.length)
              parent.active = true;

            sub.children.forEach((sub2) => {
              sub2.active = sub.active;
            });
          }
        });
      }
    });
    setSkills(arr);
  };
  const handle2Sub = (id, subId, sub2Id) => {
    let arr = [...skills];
    arr.forEach((parent) => {
      if (parent.id == id) {
        let activeChilds = [];

        parent.children.forEach((sub) => {
          if (sub.id != subId) sub.active && activeChilds.push(sub);
          if (sub.id == subId) {
            let activeSubChilds = [];

            sub.children.forEach((sub2) => {
              if (sub2.id == sub2Id) {
                sub2.active = !sub2.active;
              }
              if (!sub2.active) {
                parent.active = false;
                sub.active = false;
              }
              sub2.active && activeSubChilds.push(sub2);
              sub.active && activeChilds.push(sub);
              if (activeSubChilds.length == sub.children.length)
                sub.active = true;
              if (activeChilds.length == parent.children.length)
                parent.active = true;
            });
          }
        });
      }
    });
    setSkills(arr);
  };
  useEffect(() => {
    choosedSkills();
  }, [skills]);
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
        <div className={cls.gride}>
          <p className={cls.skillTitle}>اختيار التصنيف</p>
          {skills
            .filter((ele) => ele.name.includes(inpV))
            .map((ele, indx) => (
              <SkillTree
                key={indx}
                parentHandler={handleParent}
                subHandler={handleSub}
                sub2Handler={handle2Sub}
                skill={ele}
              />
            ))}
        </div>

        <div className={cls.grid}>
       
            <div className={cls.messageH}>
              <p className={cls.h}>{chosenSubs.length} مهارات</p>
              <p className={cls.p}>
                اختار علي الأقل مهارة واحدة لنساعدك علي ترشيح الوظائق المناسبة
                إليك
              </p>
            </div>
       
          <div className={cls.gridF}>
            {chosenSubs.map((ele, indx) => (
              <ChosedSkill
                close={() => handleCancel(ele.id, ele.parentId, ele.subId)}
                skill={ele}
                key={indx}
              />
            ))}
          </div>
        </div>
      </div>
      <button
        onClick={() => value.jumpPage(5)}
        disabled={!chosenSubs[0]}
        className={cls.next}
      >
        {" "}
        التالي
      </button>
      {/* <button onClick={getBack} className={cls.back}>
        رجوع
      </button> */}
    </div>
  );
};
export default SkillsStep;
