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
  const vistorUser = useSelector((state) => state.authentication.loggedIn);
  const handleChat = () => {
    navigate("/chat", {
      state: { id: data.id, avatar: data.avatar, name: data.username },
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
            <button onClick={handleChat}>CHAT</button>
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
    </div>
  );
};

export default SideNavFlancerProfilePages;
