import React, { Fragment, useEffect, useState } from "react";
import FlancerCommunicatedComponent from "../../../components/FreeLancer/fLancerProfile/FlancerCommunicated/FlancerCommunicated.component";
import FlancerCoursesComponent from "../../../components/FreeLancer/fLancerProfile/FlancerCourses/FlancerCourses.component";
import FlancerDocumentationComponent from "../../../components/FreeLancer/fLancerProfile/FlancerDocumentation/FlancerDocumentation.component";
import FlancerLanguageComponent from "../../../components/FreeLancer/fLancerProfile/FlancerLanguage/FlancerLanguage.component";
import AmentiesShared from "../../../shared/Amenties/Amenties.shared";
import PerformanceShared from "../../../shared/Performance/Performance.shared";
import ButtonShare from "../../../shared/Button/Button.shared";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import cls from "./SideNavFlancer.module.scss";
import { BsFillStarFill } from "react-icons/bs";
import { GrStatusGood } from "react-icons/gr";
import { RiMessage2Fill } from "react-icons/ri";
import { BsPeopleFill } from "react-icons/bs";

const SideNavFlancerProfilePages = ({ data }) => {
  const navigate = useNavigate();
  const names = [
    {
      name: "جافا سكريبت",
      level: 5,
    },
    {
      name: "برمجة PHP ",
      level: 3,
    },
    {
      name: "لغة الجافا",
      level: 4,
    },
  ];
  const languages = [
    {
      lang: "اللغة العربية",
      level: 2,
    },
    {
      lang: "اللغة الانجليزية",
      level: 5,
    },
  ];
  const communicated = [
    {
      id: "whatsApp",
      iconName: "iLT-flancer-whatsApp",
    },
    {
      id: "email",
      iconName: "iLT-flancer-email",
    },
    {
      id: "mobile",
      iconName: "iLT-flancer-mobile",
    },
  ];
  console.log(data, "aa");
  const vistorUser = useSelector((state) => state.authentication.loggedIn);
  const handleChat = () => {
    navigate("/chat", {
      state: {
        id: data.id,
        avatar: data.avatar,
        name: data.username,
        role: data.role?.name,
      },
    });
  };
  // Get User Profile By ID
  const handleClick = (id, userInfo) => {
    if (id === "whatsApp") {
      window.open(
        `https://api.whatsapp.com/send/?phone=966592031195&text=${"start Chat"}`
      );
    }
    if (id === "email") {
      window.open(
        `https://mail.google.com/mail/mu/mp/159/#co/to=${userInfo?.email}`
      );
    }
    if (id === "mobile") {
      window.open(`tel:${userInfo?.mobile}`);
    }
  };
  const [isProfileOwner, setIsProfileOwner] = useState(false);
  useEffect(() => {
    const ownerProfile = localStorage.getItem("usID");
    const profileTimeOut = setTimeout(() => {
      if (data?.id == ownerProfile) {
        setIsProfileOwner(true);
      }
    }, 2);
    return () => clearTimeout(profileTimeOut);
  }, []);
  return (
    <div className="cLT-white-bg p-4 d-flex flex-column gap-3 ">
      <div className={cls.statsHolder}>
        <div className={cls.grid}>
          <BsFillStarFill />
          <p>التقييمات</p>
          <span>(22) 4.2</span>
        </div>
        <div className={cls.grid}>
          <GrStatusGood />
          <p>الشغل المنجز</p>
          <span>76</span>
        </div>
        <div className={cls.grid}>
          <RiMessage2Fill />
          <p>الطلبات</p>
          <span>200</span>
        </div>
        <div className={cls.grid}>
          <BsPeopleFill />
          <p>عدد العملاء</p>
          <span>88</span>
        </div>
      </div>
      {/* Flancer Communicated  */}
      {vistorUser && !isProfileOwner && (
        <div className="d-grid gap-3 uLT-bd-b-platinum-sA pb-4">
          <p className="mb-0 fLT-Bold-sA text-nowrap"> التواصل </p>
          <div className="d-flex align-items-center gap-3">
            {communicated.map((communicate, ix) => {
              return (
                <div key={ix} onClick={() => handleClick(communicate.id, data)}>
                  <FlancerCommunicatedComponent
                    iconName={communicate.iconName}
                    iconID={communicate.id}
                  />
                </div>
              );
            })}

            <div className="shadow  uLT-f-radius-sB">
              <ButtonShare
                onClick={handleChat}
                btnClasses="cLT-secondary-bg py-2 px-4  d-flex align-items-center gap-2 uLT-f-radius-sB"
                textClasses={`fLT-Regular-sB px-1 cLT-white-text `}
                innerText="CHAT"
                iconName={"iLT-work-case-white"}
              />
            </div>

            <NavLink
              to={`/freelancer-offer/${data?.id}`}
              className={"uLT-list-style"}
            >
              <div className="shadow  uLT-f-radius-sB">
                <ButtonShare
                  btnClasses="cLT-secondary-bg py-2 px-4  d-flex align-items-center gap-2 uLT-f-radius-sB"
                  textClasses={`fLT-Regular-sB px-1 cLT-white-text `}
                  innerText="شغلني"
                  iconName={"iLT-work-case-white"}
                />
              </div>
            </NavLink>
          </div>
        </div>
      )}
      {/* Flancer Areas Of Competence [Holder] */}
      <div className="d-grid gap-3 uLT-bd-b-platinum-sA pb-4">
        <p className="mb-0 fLT-Bold-sA text-nowrap">مجالات الاختصاص </p>
        <div className="d-flex gap-3 flex-wrap">
          {data?.category?.map((category) => {
            return (
              <AmentiesShared
                key={category.id}
                amenties={"areasOfCompetence"}
                areasOfCompetenceData={category?.name}
              />
            );
          })}
        </div>
      </div>
      {/* Flancer Courses [Holder] */}
      <div className="d-grid gap-3 uLT-bd-b-platinum-sA pb-4">
        <p className="mb-0 fLT-Bold-sA text-nowrap">الشهادات والدورات </p>
        {data?.skill?.length !== 0 ? (
          <Fragment>
            {data?.skill?.map((skill, ix) => {
              return (
                <div key={ix} className="d-flex justify-content-between">
                  <FlancerCoursesComponent innerText={skill.skill} />
                  <PerformanceShared
                    defaultNumber={skill.level.level}
                    status={true}
                  />
                </div>
              );
            })}
          </Fragment>
        ) : (
          <p className="mb-0 fLT-Bold-sA cLT-gray-text">
            لا يوجد شهادات ودورات
          </p>
        )}
      </div>
      {/* Flancer Language [Holder] */}
      <div className="d-grid gap-3 uLT-bd-b-platinum-sA pb-4">
        <p className="mb-0 fLT-Bold-sA text-nowrap">اللغات </p>
        {data?.language?.length !== 0 ? (
          <Fragment>
            {data?.language?.map((lang, ix) => {
              return (
                <div key={ix} className="d-flex justify-content-between">
                  <FlancerLanguageComponent innerText={lang?.skill} />
                  <PerformanceShared
                    defaultNumber={lang?.level?.level}
                    status={true}
                  />
                </div>
              );
            })}
          </Fragment>
        ) : (
          <p className="mb-0 fLT-Bold-sA cLT-gray-text">لا يوجد لغات</p>
        )}
      </div>
      {/* Flancer Documentation */}
      <div className="uLT-bd-b-platinum-sA pb-4">
        <p className="fLT-Bold-sA text-nowrap">توثيقات </p>
        <div className="d-flex align-items-center flex-wrap gap-3">
          {data?.reverse?.map((document, ix) => {
            return (
              <div key={ix}>
                <FlancerDocumentationComponent
                  status={document.status}
                  documentName={document.title}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="uLT-bd-b-platinum-sA pb-4">
        <p className="fLT-Bold-sA text-nowrap">اوسمة </p>
        <div className="d-flex align-items-center flex-wrap gap-3">
          {/* {data?.reverse?.map((document, ix) => {
            return (
              <div key={ix}>
                <FlancerDocumentationComponent
                  status={document.status}
                  documentName={document.title}
                />
              </div>
            );
          })} */}
          <p className="mb-0 fLT-Bold-sA cLT-gray-text">لا يوجداوسمة</p>
        </div>
      </div>
      <div className="uLT-bd-b-platinum-sA pb-4">
        <p className="fLT-Bold-sA text-nowrap">مواقع شغلي الاخري </p>
        <div className="d-flex align-items-center flex-wrap gap-3">
          {/* {data?.reverse?.map((document, ix) => {
            return (
              <div key={ix}>
              <FlancerDocumentationComponent
              status={document.status}
              documentName={document.title}
              />
              </div>
              );
            })} */}
          <p className="mb-0 fLT-Bold-sA cLT-gray-text">
            لا يوجد مواقع شغل اخري
          </p>
        </div>
      </div>
    </div>
  );
};

export default SideNavFlancerProfilePages;
