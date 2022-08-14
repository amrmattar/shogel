import { useContext, useEffect, useState } from "react";
import { API } from "../../../enviroment/enviroment/enviroment";
import { LabelContext } from "../LabelDataContext/labelDataContext";
import ChosedSkill from "./ChosedSkill";
import cls from "./Skills.module.scss";
import SkillTree from "./SkillTree";
const skilo = [
  { id: 1, chosed: false, children: [], name: "test1" },
  {
    id: 2,
    chosed: false,
    children: [
      { id: 1, chosed: false, children: [], name: "subtest1" },
      { id: 2, chosed: false, children: [], name: "subtest3" },
      {
        id: 4,
        chosed: false,
        children: [
          { id: 1, chosed: false, children: [], name: "3rdSub" },
          { id: 2, chosed: false, children: [], name: "3rdSub" },
          { id: 3, chosed: false, children: [], name: "4rdSub" },
        ],
        name: "subtest2",
      },
      { id: 3, chosed: false, children: [], name: "subtest4" },
    ],
    name: "test2",
  },
  { id: 3, chosed: false, children: [], name: "test3" },
];
const SkillsStep = () => {
  const value = useContext(LabelContext);
  const [inpV, setInpV] = useState("");
  const [skills, setSkills] = useState(skilo);
  const [chosenSubs, setChosenSubs] = useState([]);

  const handleCancel = (id) => {
    let arr2 = chosenSubs.filter((ele) => ele.id != id);

    setChosenSubs(arr2);
    value.setSkills(arr2);
  };
  // useEffect(() => {
  //   API.get("coredata/category/list")
  //     .then((res) => {
  //       let arr = res.data.data?.map((ele) => {
  //         ele.active = false;
  //         return ele;
  //       });
  //       setSkills(arr);
  //     })
  //     .catch((e) => {});
  // }, []);
  const choosedSkills = () => {
    let arr = [...skills];
    let chosed = [];
    arr.forEach((parent) => {
      parent.active && chosed.push(parent);

      parent.children.forEach((sub) => {
        sub.active && chosed.push(sub);

        sub.children.forEach((sub2) => {
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
        parent.children.forEach((sub) => {
          if (sub.id == subId) {
            sub.active = !sub.active;

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
        parent.children.forEach((sub) => {
          if (sub.id == subId) {
            sub.children.forEach((sub2) => {
              if (sub2.id == sub2Id) {
                sub2.active = !sub2.active;
              }
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
          {skills
            .filter((ele) => ele.name.includes(inpV))
            .map((ele) => (
              <SkillTree
                parentHandler={handleParent}
                subHandler={handleSub}
                sub2Handler={handle2Sub}
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
