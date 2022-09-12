import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import { footerPages } from "../../core/services/PagesServices/PagesServices.core";
import QueComp from "./QuestionsComp";
const questions = [
  {
    q: "لا أتذكر كلمة المرور الخاصة بي؟",
    a: `الإجابة: لقد قمت بالفعل بإنشاء حساب ولكن لا يمكنك تذكر كلمة المرور الخاصة بك؟ انقر فوق "تسجيل الدخول / تسجيل" ثم انقر فوق "هل نسيت كلمة المرور؟". املأ رقم هاتفك وسيتم إرسال استرداد كلمة المرور إليك عبر الهاتف.`,
  },
  {
    q: "كيف يمكنني إنشاء حساب على",
    a: `الإجابة: لقد قمت بالفعل بإنشاء حساب ولكن لا يمكنك تذكر كلمة المرور الخاصة بك؟ انقر فوق "تسجيل الدخول / تسجيل" ثم انقر فوق "هل نسيت كلمة المرور؟". املأ رقم هاتفك وسيتم إرسال استرداد كلمة المرور إليك عبر الهاتف.`,
  },
  {
    q: "ما هي ساعات التسليم",
    a: `الإجابة: لقد قمت بالفعل بإنشاء حساب ولكن لا يمكنك تذكر كلمة المرور الخاصة بك؟ انقر فوق "تسجيل الدخول / تسجيل" ثم انقر فوق "هل نسيت كلمة المرور؟". املأ رقم هاتفك وسيتم إرسال استرداد كلمة المرور إليك عبر الهاتف.`,
  },
  {
    q: "أريد فاتورة لطلبي؟",
    a: `الإجابة: لقد قمت بالفعل بإنشاء حساب ولكن لا يمكنك تذكر كلمة المرور الخاصة بك؟ انقر فوق "تسجيل الدخول / تسجيل" ثم انقر فوق "هل نسيت كلمة المرور؟". املأ رقم هاتفك وسيتم إرسال استرداد كلمة المرور إليك عبر الهاتف.`,
  },
];
const CommonQuestionsPage = () => {
  const [commonQuestions, setCommonQuestions] = useState();
  useEffect(() => {
    let cancel = false;
    if (cancel) return;
    footerPages._GET_FooterPagesSections().then((res) => {
      res.data.data.filter(function (el) {
        return el.name == "about us" && setCommonQuestions(el);
      });
    });
    return () => {
      cancel = true;
    };
  }, []);
  return (
    <div className="container px-0">
   
      {questions.map((ele) => (
        <QueComp ele={ele} />
      ))}
    </div>
  );
};

export default CommonQuestionsPage;
