import axios from "axios";
import React, { useMemo, useRef, useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FlancerAboutComponent from "../../../../components/FreeLancer/fLancerProfile/FlancerAbout/FlancerAbout.component";
import FlancerBusinessPhotosComponent from "../../../../components/FreeLancer/fLancerProfile/FlancerBusinessPhotos/FlancerBusinessPhotos.component";
import FlancerEditCertificatesComponent from "../../../../components/FreeLancer/fLancerProfile/flancerEditAccount/FlancerEditCertificates/FlancerEditCertificates.component";
import FlancerEditLocationComponent from "../../../../components/FreeLancer/fLancerProfile/flancerEditAccount/FlancerEditLocation/FlancerEditLocation.component";
import FlancerEditPersonalAccountComponent from "../../../../components/FreeLancer/fLancerProfile/flancerEditAccount/FlancerEditPersonalAccount/FlancerEditPersonalAccount.component";
import FlancerEditTagsComponent from "../../../../components/FreeLancer/fLancerProfile/flancerEditAccount/FlancerEditTags/FlancerEditTags.component";
import FlancerLanguageSkillsComponent from "../../../../components/FreeLancer/fLancerProfile/flancerEditAccount/FlancerLanguageSkills/FlancerLanguageSkills.component";
import FlancerOtherJobSitesComponent from "../../../../components/FreeLancer/fLancerProfile/FlancerOtherJobSites/FlancerOtherJobSites.component";
import { API } from "../../../../enviroment/enviroment/enviroment";
import ButtonShare from "../../../../shared/Button/Button.shared";
import PageTitle from "../../../../shared/PageTitle/PageTitle.shared";
import Upload from "../../../../shared/Upload/Upload.shared";

import { setAllCertificate } from "../../../../core/redux/reducers/CertificateSkillsReducer.core";
import { setAllLanguage } from "../../../../core/redux/reducers/LanguageSkillsReducer.core";
import { setConvertToFreeLancerMode } from "../../../../core/redux/reducers/convertToFreeLancerMode";

const FlancerMyEditAccountPage = ({
  handleClick,
  personalData,
  updateLoading,
  setCheck,
  onClick,
  fileUploads,
  Sdelet,
  setSocialData,
  socialLoading,
  setSelectedAreName,
  selectedAreName,
}) => {
  const dispatch = useDispatch();
  const [isSklsAdded, setIsSklsAdded] = useState(false);
  const [isLangsAdded, setIsLangsAdded] = useState(false);

  //TODO Data from Reducers
  const [
    coreData,
    userRole,
    messages,
    { convertToFreeLancerMode },
    activeUserId,
  ] = useSelector((state) => [
    state.coreData,
    state.userRole.userRole,
    state.messages,
    state.convertToFreeLancerMode,
    state.userData.id,
  ]);

  useEffect(() => {
    API.get("coredata/category/list").then((res) => {});
  }, []);

  const userLocation = useMemo(() => {
    if (personalData) {
      return {
        country: personalData?.country,
        city: personalData?.city,
        state: personalData?.state,
        area: personalData?.area,
      };
    }
  }, [personalData]);

  useEffect(() => {
    if (!isLangsAdded && personalData?.language?.length) {
      const langs = personalData?.language.map((lang) => ({
        skill: lang?.skill,
        id: lang?.id,
        level_id: lang?.level_id || lang?.level?.level,
        type: "language",
      }));

      setIsLangsAdded(true);
      dispatch(setAllLanguage(langs));
    }

    if (!isSklsAdded && personalData?.skill?.length) {
      const skls = personalData.skill.map((skl) => ({
        skill: skl.skill,
        id: skl.id,
        level_id: skl.level.level,
        type: "skill",
      }));

      setIsSklsAdded(true);
      dispatch(setAllCertificate(skls));
    }
  }, [
    personalData?.skill,
    personalData?.language,
    isSklsAdded,
    isLangsAdded,
    dispatch,
  ]);

  const onToFreelancerChange = (e) => {
    if (e.target.checked) {
      dispatch(setConvertToFreeLancerMode(true));
    } else {
      dispatch(setConvertToFreeLancerMode(false));
    }
  };

  return (
    <div className="d-flex flex-column gap-4 px-0">
      <>
        {/* Personal Account [Title] */}
        <PageTitle title={"معلوماتك الشخصية"} />
        {personalData?.role?.id == 2 && personalData?.id === activeUserId && (
          <>
            <div className="check-box d-flex justify-content-between align-items-center">
              <div className="d-flex justify-content-center align-items-center">
                <i
                  style={{ width: 50, height: 50 }}
                  className={`d-flex iLT-work-case-freelancer-btn gap-2 p-2  uLT-img-contain`}
                />
                <h2 className="fs-4 border-0 m-0 me-2 pb-0">اصبح مشتغل</h2>
              </div>

              <input
                onChange={onToFreelancerChange}
                style={{ width: 20, height: 20, accentColor: "#4b93b9" }}
                type="checkbox"
                name="be-freelancer"
                id="be-freelancer"
                className="mb-3"
              />
            </div>

            <span className="text-muted small">
              لتحويل حسابك علي منصه شغل برجاء التاكد من اختيار المجالات
            </span>
          </>
        )}

        {/* Personal Account [Component] */}
        <FlancerEditPersonalAccountComponent
          data={coreData}
          userProfileData={personalData}
          convertToFreeLancerMode={convertToFreeLancerMode}
        />
      </>
      <>
        {/* My Location [Title] */}
        <PageTitle title={" موقعك"} />
        {/* My Location [Component] */}
        <FlancerEditLocationComponent
          setSelectedAreName={setSelectedAreName}
          selectedAreName={selectedAreName}
          screenCol="6"
          claases={"mb-3"}
          userProfileLocation={userLocation ? userLocation : false}
        />
      </>

      {(personalData?.role?.id != "2" || convertToFreeLancerMode) && (
        <>
          {/* About Me [Section] */}
          <>
            {/* About Me [Title] */}
            <PageTitle title={"نبذة عني"} />
            {/* About Me [Component] */}
            <FlancerAboutComponent
              about={"editAbout"}
              data={personalData?.info}
            />
          </>
          {/* My Location [Section] */}

          {/* My Tags [Section] */}

          {/* My Tags [Title] */}
          <PageTitle title={" مجالات الاختصاص"} />
          {/* My Tags [Component] */}
          <FlancerEditTagsComponent
            hideInSm
            type={"Register"}
            tags={coreData?.category}
            userProfileTags={personalData?.category}
          />

          {/* Certificates [Section] */}
          <>
            {/* Certificates [Title] */}
            <PageTitle title={"الشهادات والدورات"} />
            {/* Certificates [Component] */}
            <FlancerEditCertificatesComponent data={personalData?.skill} />
          </>
          {/* Language [Section] */}
          <>
            {/* Language [Title] */}
            <PageTitle title={"اللغات "} />
            {/* Language [Component] */}
            <FlancerLanguageSkillsComponent />
          </>
          {/* Business Photos [Section] */}
          <>
            {/* Business Photos [Title] */}
            <PageTitle title={"صور الاعمال والشهادات "} />
            {/* Business Photos [Component] */}
            <FlancerBusinessPhotosComponent
              data={personalData}
              fileUpload={fileUploads}
              handleClick={onClick}
              Sdelet={Sdelet}
            />
          </>
          {/* Other Job Sites [Section] */}
          <>
            {/* Other Job Sites [Title] */}
            <PageTitle title={"مواقع شغلي الاخري "} />
            {/* Other Job Sites [Component] */}
            <FlancerOtherJobSitesComponent
              socialSite={coreData?.social}
              data={personalData?.social}
              setSocialData={setSocialData}
              socialLoading={socialLoading}
            />
          </>
        </>
      )}

      {/* Other Job Sites Save [Button] */}
      <div className="shadow uLT-f-radius-sB pb-4">
        <ButtonShare
          loading={updateLoading}
          onClick={handleClick}
          innerText={"حفظ"}
          btnClasses={"cLT-secondary-bg px-4 py-3 uLT-f-radius-sB  "}
          textClasses={"px-4 fLT-Regular-sD cLT-white-text"}
        />
      </div>
    </div>
  );
};

export default React.memo(FlancerMyEditAccountPage);
