import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import { footerPages } from "../../core/services/PagesServices/PagesServices.core";
import cls from "./polices.module.scss";
const PoliciesPage = () => {
  const [policies, setPolicies] = useState();
  useEffect(() => {
    let cancel = false;
    if (cancel) return;
    footerPages._GET_FooterPagesSections().then((res) => {
      res.data.data.filter(function (el) {
        return el.name == "polices" && setPolicies(el);
      });
    });
    return () => {
      cancel = true;
    };
  }, []);

  return (
    <div className={`${cls.policesHolder} vh-100`}>
      <h3>شروط الأستخدام</h3>

      {policies?.description ? (
        <div
          className="policies"
          dangerouslySetInnerHTML={{ __html: policies?.description }}
        />
      ) : (
        <p>جاري التحميل...</p>
      )}
    </div>
  );
};

export default PoliciesPage;
