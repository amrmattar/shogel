import React, { useCallback, useContext, useEffect, useState } from "react";
import Stepper from "react-stepper-horizontal";
import { LabelContext } from "./LabelDataContext/labelDataContext";
import RegisterMobileStep from "./StepComponent/RegisterMobileStep";
import RegisterOTPStep from "./StepComponent/RegisterOTPStep";
import RegisterDetectedFreelancerAccount from "./StepComponent/RegisterDetectedFreelancerAccount";
import "./NewStyle.scss";
import RegisterDetectedAccount from "./StepComponent/RegisterDetectedAccount";
import RegisterClientView from "./StepComponent/RegisterClientView";
import RegisterCompanyDetails from "./StepComponent/RegisterCompanyDetails";
import RegisterFreelancerPersonalDetails from "./StepComponent/RegisterFreelancerPersonalDetails";
import Location from "./StepComponent/Location";
import CompanyLocation from "./StepComponent/CompanyLocation";
import RegisterClientOptionDetails from "./StepComponent/RegisterClientOptionDetails";
import SkillsStep from "./SkillsComp/NewSkillsPage";
import DescriptionPage from "./NewModules/DefscriptionPage";
import IdPage from "./NewModules/IdPage";
import LocationPage from "./NewModules/LocationPage";
import LocationClientPage from "./NewModules/LocationClientPage";
const MasterRegistrationComponent = () => {
  const value = useContext(LabelContext);

  const [first, setfirst] = useState([]);
  const handleRoute = useCallback(() => {
    switch (value?.accountType?.userKind) {
      case "client":
        return setfirst([
          { title: "رقم الجوال" },
          { title: "رمز التحقق" },
          { title: "نــوع الحســاب" },
          { title: "البيانات الشخصية" },
          { title: "إنشــاء حــساب" },
        ]);
      case "freelancer":
        return setfirst([
          { title: "رقم الجوال" },
          { title: "رمز التحقق" },
          { title: "نــوع الحســاب" },
          { title: "نــوع المشتغل" },
        ]);
      case "worker":
        return setfirst([
          { title: "رقم الجوال" },
          { title: "رمز التحقق" },
          { title: "نــوع الحســاب" },
          { title: "نــوع المشتغل" },
          { title: "إنشــاء حــساب مشتغل" },
        ]);
      case "company":
        return setfirst([
          { title: "رقم الجوال" },
          { title: "رمز التحقق" },
          { title: "نــوع الحســاب" },
          { title: "نــوع المشتغل" },
          { title: "إنشــاء حــساب منشأه" },
        ]);

      case "undo":
        return setfirst([
          { title: "رقم الجوال" },
          { title: "رمز التحقق" },
          { title: "نــوع الحســاب" },
        ]);
      default:
        return setfirst([
          { title: "رقم الجوال" },
          { title: "رمز التحقق" },
          { title: "نــوع الحســاب" },
        ]);
    }
  }, [value?.accountType?.userKind]);
  useEffect(() => {
    handleRoute();
  }, [handleRoute]);

  return (
    <div className="LT-stepper-style" dir="ltr">
      {value.page !== 9 && (
        <Stepper
          steps={first}
          activeStep={value?.page}
          defaultColor={"#E9E9E9"}
          activeTitleColor={"#1EAAAD"}
          completeColor={"#02385A"}
          activeColor={"#1EAAAD"}
          defaultTitleColor={"#E9E9E9"}
          titleFontSize={16}
        />
      )}
      {value.page === 0 && <RegisterMobileStep />}
      {value.page === 1 && <RegisterOTPStep />}
      {value.page === 2 || value?.accountType?.userKind === "undo" ? (
        <RegisterDetectedAccount />
      ) : null}
      {value.page === 3 && value?.accountType?.userKind === "worker" && (
        <RegisterClientView />
      )}
      {value.page === 3 && value?.accountType?.userKind === "client" && (
        <RegisterClientView />
      )}
      {value.page === 3 && value?.accountType?.userKind === "freelancer" && (
        <RegisterDetectedFreelancerAccount />
      )}
      {value.page === 4 && value?.accountType?.userKind === "client" && (
        <RegisterClientOptionDetails />
      )}
      {value.page === 4 && value?.accountType?.userKind === "worker" && (
        <RegisterFreelancerPersonalDetails />
      )}
      {value.page === 4 && value?.accountType?.userKind === "company" && (
        <RegisterClientView />
      )}
      {value.page === 5 && <SkillsStep />}
      {value.page === 6 && <DescriptionPage />}

      {value.page === 7 && <IdPage />}
      {value.page === 8 && value?.accountType?.userKind !== "client" && (
        <LocationPage />
      )}
      {value.page === 8 && value?.accountType?.userKind === "client" && (
        <LocationClientPage />
      )}
     
    </div>
  );
};

export default MasterRegistrationComponent;
