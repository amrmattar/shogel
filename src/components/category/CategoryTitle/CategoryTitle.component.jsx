import React, { useCallback, useEffect, useState } from "react";
import cls from "./CategoryTitle.component.module.scss";

const images = [
  {
    file: "http://dev.shogol.sa/Admin/public/images/setting/51/1662806867icons.svg",
    title: "الالكترونية",
  },
  {
    file: "http://dev.shogol.sa/Admin/public/images/setting/51/166280686710.svg",
    title: "اشغال تقنية",
  },
  {
    file: "http://dev.shogol.sa/Admin/public/images/setting/51/1662806867icons.svg",
    title: "الالكترونية",
  },
  {
    file: "http://dev.shogol.sa/Admin/public/images/setting/51/166280686710.svg",
    title: "اشغال تقنية",
  },
  {
    file: "http://dev.shogol.sa/Admin/public/images/setting/51/1662806867icons.svg",
    title: "الالكترونية",
  },
];
const CategoryTitleComponent = ({ data }) => {
  const [title, setTitle] = useState("");
  const handleSectionOne = useCallback(() => {
    data?.map((homeData) => {
      if (homeData?.section === "3") {
        switch (homeData?.key) {
          case "home_section_3_title":
            return setTitle(homeData.value);

          default:
            return false;
        }
      }
    });
  }, [data]);
  useEffect(() => {
    let cancel = false;
    if (cancel) return;
    handleSectionOne();
    return () => {
      cancel = true;
    };
  }, [handleSectionOne]);
  return (
    <>
      {/* Title Holder */}
      <div className={cls.main}>
        <p className={cls.title1}>بعض مهام شغل</p>
        <p className={cls.title2}>تعرف اكثر علي اشغال موقع شغل</p>
        {/* Title line */}
        <div className={cls.iconSec}>
          {images.map((ele) => (
            <div className={cls.iconHolder}>
              <img src={ele.file} />
              <p>{ele.title}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoryTitleComponent;
