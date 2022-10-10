/* eslint-disable eqeqeq */
import { useContext, useEffect, useState } from "react";
import { API } from "../../../enviroment/enviroment/enviroment";
import { LabelContext } from "../LabelDataContext/labelDataContext";
import ChosedSkill from "./ChosedSkill";
import cls from "./Skills.module.scss";
import SkillTree from "./SkillTree";

import LTT from "list-to-tree";

const SkillsStep = () => {
  const value = useContext(LabelContext);
  const storeSkills = value.labelInfo.skills;
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
    API.get(`coredata/category/list`)
      .then((res) => {
        let arr = res.data.data?.map((ele) => {
          let activeChilds = [];
          let Tele = storeSkills.filter((e) => e.id == ele.id);
          Tele[0] ? (ele.active = true) : (ele.active = false);
          ele.children[0] &&
            ele.children.forEach((child) => {
              let activeSubChilds = [];
              let Tchild = storeSkills.filter((e) => e.id == child.id);
              Tchild[0] ? (child.active = true) : (child.active = false);
              Tchild[0] && activeChilds.push(child.id);
              ele.active =
                activeChilds.length == ele.children.length ? true : false;
              child.children[0] &&
                child.children.forEach((child2) => {
                  let Tchild2 = storeSkills.filter((e) => e.id == child2.id);

                  Tchild2[0] ? (child2.active = true) : (child2.active = false);
                  Tchild2[0] && activeSubChilds.push(child2.id);
                  if (activeSubChilds.length == child.children.length) {
                    child.active = true;
                    activeChilds.push(child.id);
                    if (activeChilds.length == ele.children.length) {
                      ele.active = true;
                    }
                  }
                });
            });

          return ele;
        });

        setSkills(arr);
      })
      .catch((err) => {
        console.log(err?.message);
      });
  }, []);

  const getBack = () => {
    value.prevPage();
  };

  const choosedSkills = () => {
    let arr = [...skills];
    let chosed = [];
    arr.forEach((parent) => {
      parent.active && !parent.children?.[0] && chosed.push(parent);

      parent?.children?.forEach((sub) => {
        sub.parentId = parent.id;
        sub.active && !sub.children?.[0] && chosed.push(sub);

        sub?.children?.forEach((sub2) => {
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
    const result = [];

    const renderTree = (arr) => {
      result.push({
        active: arr.active,
        id: arr.id,
        name: arr.name,
        type_work: arr.type_work,
        parentId: arr.parentId || 0,
      });

      arr?.children?.map((skl) => renderTree(skl));
    };

    const listToTree = (items) => {
      const ltt = new LTT(items, {
        key_id: "id",
        key_parent: "parentId",
      });

      const tree = ltt.GetTree();

      return tree;
    };

    renderTree({ children: skills });

    delete result[0];
    let arr = result;

    let currentResult = [];
    // parent
    const parent = arr.find((skl) => skl?.id == id);
    parent.active = !parent.active;
    currentResult.push(parent);

    // children
    let children = arr.filter((skl) => {
      return skl.parentId == id;
    });
    children.forEach((child) => {
      child.active = parent.active;
      currentResult.push(child);
    });

    // collect
    arr.forEach((arrSkl) => {
      if (!currentResult.find((skl) => skl.id == arrSkl?.id)) {
        currentResult.push(arrSkl);
      }
    });

    currentResult = listToTree(currentResult).map((skl) => {
      const chlid = skl.child;
      delete skl.child;
      delete skl.__depth;
      if (skl.parentId === 0) delete skl.parentId;
      if (!chlid) return { ...skl };

      return { ...skl, children: chlid };
    });

    setSkills(currentResult);
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
          placeholder={"ابحث هنا"}
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
          <SkillTree
            parentHandler={handleParent}
            subHandler={handleSub}
            sub2Handler={handle2Sub}
            skills={skills}
          />
        </div>

        <div className={cls.grid}>
          <div className={cls.messageH}>
            <p className={cls.h}>{chosenSubs.length} مهارات</p>
            <p className={cls.p}>
              اختار علي الأقل مهارة واحدة لنساعدك علي ترشيح الوظائف المناسبة
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
      <button onClick={getBack} className={cls.back}>
        رجوع
      </button>
      <button
        onClick={() => value.jumpPage(5)}
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
