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
        {/* Title line */}
        <div className={cls.iconSec + " w-100"}>
          <img src="/MicrosoftTeams-image.png" className="w-100 h-100" alt="" />
        </div>
      </div>
    </>
  );
};

export default CategoryTitleComponent;
