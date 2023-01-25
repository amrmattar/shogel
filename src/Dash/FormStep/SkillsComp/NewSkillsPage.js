/* eslint-disable eqeqeq */
import { useContext, useEffect, useState } from "react";
import { API } from "../../../enviroment/enviroment/enviroment";
import { LabelContext } from "../LabelDataContext/labelDataContext";
import ChosedSkill from "./ChosedSkill";
import cls from "./Skills.module.scss";
import SkillTree from "./SkillTree";

import LTT from "list-to-tree";
import DrawerSkls from "./DrawerSkls";
import ButtonShare from "../../../shared/Button/Button.shared";

const listToTree = (items) => {
  const validateParendId = (items) => {
    const result = items.map((item, _, itemsArray) => {
      const findParent = itemsArray.find((currentItem) => {
        return currentItem.id === item.parentId;
      });

      return { ...item, parentId: findParent ? item.parentId : 0 };
    });

    return result;
  };
  items = validateParendId(items);

  const ltt = new LTT(items, {
    key_id: "id",
    key_parent: "parentId",
    key_child: "children",
    empty_children: true,
  });
  const tree = ltt.GetTree();

  return tree;
};

const treeToList = (tree) => {
  const array = [...tree];
  let result = [];

  const render = (arr) => {
    result.push({
      active: arr.active,
      id: arr.id,
      name: arr.name,
      type_work: arr.type_work,
      parentId: arr.parent_id || arr.parentId || 0,
    });

    arr?.children?.map((skl) => render(skl));
  };

  render({ children: array });
  delete result[0];

  return result.filter((res) => res);
};

const SkillsStep = () => {
  const value = useContext(LabelContext);

  const [skills, setSkills] = useState([]);
  const [isOpenSklsPopup, setIsOpenSklsPopup] = useState(false);
  const [chosedSkills, setChosedSkills] = useState([]);
  const [inpV, setInpV] = useState("");
  const [searchRes, setSearchRes] = useState([]);

  const getBack = () => {
    value.prevPage();
  };

  const getNext = () => {
    value.setSkills(chosedSkills);
    value.jumpPage(5);
  };

  // skills controller
  const handleRemoveChosedSkills = (id) => {
    setChosedSkills((prev) => {
      const dataWithoutSklId = prev.filter((skl) => skl.id !== id);

      return [...dataWithoutSklId];
    });

    setSkills((skls) => {
      const listOfSkls = treeToList(skls);
      const targetSkl = listOfSkls.find((skl) => skl.id === id);
      const activeStatus = !targetSkl.active;
      listOfSkls.find((skl) => skl.id === id).active = false;

      return listToTree(listOfSkls);
    });
  };

  const addChosedSkils = (id) => {
    setSkills((prev) => {
      const listOfSkls = treeToList(prev);
      const targetSkl = listOfSkls.find((skl) => skl.id === id);
      const activeStatus = !targetSkl.active;
      listOfSkls.find((skl) => skl.id === id).active = activeStatus;

      // set or unset from chosed skills
      setChosedSkills((chosedSkills) => {
        if (activeStatus) {
          chosedSkills.push(targetSkl);
          return [...chosedSkills];
        }

        chosedSkills = chosedSkills.filter((skl) => skl.id !== targetSkl.id);

        return [...chosedSkills];
      });

      return listToTree(listOfSkls);
    });
  };

  const openSklsPopup = () => {
    setIsOpenSklsPopup(true);
  };

  const getChildFromList = (currentSkls, listSkls) => {
    const result = [];

    const renderSkl = (parentSkl) => {
      const children = listSkls.filter((skl) => skl.parentId === parentSkl.id);
      result.push(...[...children, parentSkl]);

      children.forEach(renderSkl);
    };
    currentSkls.forEach(renderSkl);

    return result;
  };

  const getUniqOfSkils = (items) => {
    const result = [];

    items.forEach((item) => {
      if (result.find((res) => res?.id === item.id)) return;

      result.push(item);
    });

    return result;
  };

  // get First Skills
  useEffect(() => {
    API.get(`coredata/category/list`)
      .then(({ data }) => {
        const listOfSkls = treeToList(data.data);
        const listWithActive = listOfSkls.map((skl) => ({
          ...skl,
          active: false,
        }));

        const treeWithActive = listToTree(listWithActive);
        setSkills(treeWithActive);
      })
      .catch((err) => {
        console.log(err?.message);
      });
  }, []);

  // search
  useEffect(() => {
    if (!inpV) return;

    // get query skls
    const listSkls = treeToList(skills);
    const filterdSkills = listSkls.filter((skl) => skl.name.includes(inpV));

    // skls with children
    const filterdSklsChildren = getChildFromList(filterdSkills, listSkls);
    const result = getUniqOfSkils(filterdSklsChildren);

    const sklsTree = listToTree(result);
    setSearchRes(sklsTree);
  }, [inpV, skills]);

  return (
    <div className={cls.main + " pb-md-0 pb-5"}>
      <DrawerSkls
        handleRemoveChosedSkills={handleRemoveChosedSkills}
        setChosedSkills={setChosedSkills}
        chosedSkills={chosedSkills}
        setIsOpenSklsPopup={setIsOpenSklsPopup}
        isOpenSklsPopup={isOpenSklsPopup}
      />

      <p className={cls.title}>اخبرنا عن مهاراتك</p>
      <div className={cls.head}>
        <input
          type="text"
          placeholder="ابحث هنا"
          value={inpV}
          onChange={(e) => setInpV(e.target.value)}
        />
        <p>
          او <span>اختار المهارة</span>
        </p>
      </div>
      <div className={cls.contain}>
        <div className={cls.gride}>
          <div
            className={`${cls.skillTitle} d-flex justify-content-between align-items-center`}
          >
            <p className="m-0">اختيار التصنيف</p>
            <button
              onClick={openSklsPopup}
              style={{ cursor: "pointer", color: "#1eaaad" }}
              className="m-0 btn btn-link text-decoration-none fw-bold d-md-none transparent-hover"
            >
              {chosedSkills?.length || 0} مهارات
            </button>
          </div>
          {skills.length ? (
            <SkillTree
              isActiveDebnd
              checkedSkls={chosedSkills}
              addChosedSkils={addChosedSkils}
              skills={inpV ? searchRes : skills}
            />
          ) : (
            <p className="text-center">جاري التحميل...</p>
          )}
        </div>

        <div className={cls.grid + " d-none d-md-grid"}>
          <div className={cls.messageH}>
            <p className={cls.h}>{chosedSkills.length} مهارات</p>
            <p className={cls.p}>
              اختار علي الأقل مهارة واحدة لنساعدك علي ترشيح الوظائف المناسبة
              إليك
            </p>
          </div>

          <div className={cls.gridF}>
            {chosedSkills.map((skill, idx) => (
              <ChosedSkill
                key={idx}
                close={() => handleRemoveChosedSkills(skill.id)}
                skill={skill}
              />
            ))}
          </div>
        </div>
      </div>

      <div
        className={`${cls.handelBtns} d-none d-md-flex align-items-center justify-content-around gap-2 mb-3 flex-row-reverse flex-md-row`}
      >
        <div className="">
          <ButtonShare
            type={!chosedSkills.length}
            onClick={getNext}
            innerText={"التـــالى"}
            btnClasses={"cLT-secondary-bg br14"}
            textClasses={"py-1 px-5 cLT-white-text fLT-Regular-sB"}
          />
        </div>
        <div className="">
          <ButtonShare
            smBtn
            onClick={getBack}
            innerText={"رجــــوع"}
            btnClasses={"three cLT-secondary-bg"}
            textClasses={"py-1 px-3 px-md-5 rounded-5"}
          />
        </div>
      </div>

      <div
        className={`${cls.handelBtns} d-md-none bg-light px-3 border py-2 rounded-3 d-flex align-items-center justify-content-around gap-2 mb-3 flex-row-reverse flex-md-row`}
      >
        <div className="">
          <ButtonShare
            type={!chosedSkills.length}
            onClick={getNext}
            innerText={"التـــالى"}
            btnClasses={"cLT-secondary-bg br14"}
            textClasses={"py-1 px-5 cLT-white-text fLT-Regular-sB"}
          />
        </div>
        <div className="">
          <ButtonShare
            smBtn
            onClick={getBack}
            innerText={"رجــــوع"}
            btnClasses={"three cLT-secondary-bg"}
            textClasses={"py-1 px-3 px-md-5 rounded-5"}
          />
        </div>
      </div>
    </div>
  );
};
export default SkillsStep;
