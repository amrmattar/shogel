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
    <div className={cls.policesHolder}>
      <h3>شروط الأستخدام</h3>{" "}
      <p>
        هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي
        القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة
        التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ
        طبيعياَ -إلى حد ما- للأحرف عوضاً عن استخدام "هنا يوجد محتوى نصي، هنا
        يوجد محتوى نصي" فتجعلها تبدو (أي الأحرف) وكأنها نص مقروء. العديد من
        برامح النشر المكتبي وبرامح تحرير صفحات الويب تستخدم لوريم إيبسوم بشكل
        إفتراضي كنموذج عن النص، وإذا قمت بإدخال "lorem ipsum" في أي محرك بحث
        ستظهر العديد من المواقع الحديثة العهد في نتائج البحث. على مدى السنين
        ظهرت نسخ جديدة ومختلفة من نص لوريم إيبسوم، أحياناً عن طريق الصدفة،
        وأحياناً عن عمد كإدخال بعض العبارات الفكاهية إليها.
      </p>
      <span>
        هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي
        القارئ عن التركيز .
      </span>
      <span>
        هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي
        القارئ عن التركيز .
      </span>
      <span>
        هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي
        القارئ عن التركيز .
      </span>
    </div>
  );
};

export default PoliciesPage;
