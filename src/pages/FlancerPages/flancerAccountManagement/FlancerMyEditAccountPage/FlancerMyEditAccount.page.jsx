import axios from "axios";
import React, { useMemo, useRef, useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
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

const FlancerMyEditAccountPage = ({
  handleClick,
  personalData,
  updateLoading,
  setCheck,
  onClick,
  fileUploads,
  Sdelet,
}) => {
  //TODO Data from Reducers
  const [coreData, userRole, messages] = useSelector((state) => [
    state.coreData,
    state.userRole.userRole,
    state.messages,
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
  return (
    <div className="d-flex flex-column gap-4 px-0">
      <>
        {/* Personal Account [Title] */}
        <PageTitle title={"معلوماتك الشخصية"} />
        {/* Personal Account [Component] */}
        <FlancerEditPersonalAccountComponent
          data={coreData}
          userProfileData={personalData}
        />
      </>
      {/* About Me [Section] */}
      <>
        {/* About Me [Title] */}
        <PageTitle title={"نبذة عني"} />
        {/* About Me [Component] */}
        <FlancerAboutComponent
          about={"editAbout"}
          data={personalData?.description}
        />
      </>
      {/* My Location [Section] */}
      <>
        {/* My Location [Title] */}
        <PageTitle title={" موقعك"} />
        {/* My Location [Component] */}
        <FlancerEditLocationComponent
          screenCol="6"
          claases={"mb-3"}
          userProfileLocation={userLocation ? userLocation : false}
        />
      </>
      {/* My Tags [Section] */}
      {userRole !== "2" && (
        <>
          {/* My Tags [Title] */}
          <PageTitle title={" مجالات الاختصاص"} />
          {/* My Tags [Component] */}
          <FlancerEditTagsComponent
            type={"Register"}
            tags={coreData?.category}
            userProfileTags={personalData?.category}
            tagDescription={
              "هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها."
            }
          />
        </>
      )}
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
          checkupdate={setCheck}
        />
      </>
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
