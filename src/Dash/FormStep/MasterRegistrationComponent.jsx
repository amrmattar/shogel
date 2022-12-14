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
import StepperComp from "./StepComponent/StepperComp";
import PhoneNavbar from "./PhoneNavbar";

const MasterRegistrationComponent = () => {
  const value = useContext(LabelContext);
  const [first, setfirst] = useState(0);

  const handleRoute = useCallback(() => {
    switch (value?.accountType?.userKind) {
      case "client":
        return setfirst(2);

      default:
        return setfirst(5);
    }
  }, [value?.accountType?.userKind]);

  useEffect(() => handleRoute(), [handleRoute]);

  return (
    <div className="LT-stepper-style" dir="ltr">
      <PhoneNavbar steps={first} activeStep={value?.page} />

      {value.page > 2 && value?.accountType?.userKind !== "freelancer" && (
        <StepperComp hideInSm steps={first} activeStep={value?.page} />
      )}
      {/* <StepperComp steps={first} activeStep={value?.page} /> */}
      {value.page === 0 && <RegisterMobileStep />}
      {value.page === 1 && <RegisterOTPStep />}
      {value.page === 2 || value?.accountType?.userKind === "undo" ? (
        <RegisterDetectedAccount />
      ) : null}
      {value.page === 3 && value?.accountType?.userKind === "freelancer" && (
        <RegisterDetectedFreelancerAccount />
      )}
      {value.page === 3 && value?.accountType?.userKind !== "freelancer" && (
        <RegisterClientView />
      )}
      {value.page === 4 && value?.accountType?.userKind !== "client" && (
        <SkillsStep />
      )}
      {/* {value.page === 4 && value?.accountType?.userKind == "client" && (
        <DescriptionPage />
      )} */}
      {value.page === 4 && value?.accountType?.userKind === "client" && (
        <LocationClientPage />
      )}
      {value.page === 5 && value?.accountType?.userKind !== "client" && (
        <DescriptionPage />
      )}
      {value.page === 6 && <IdPage />}
      {value.page === 7 && value?.accountType?.userKind !== "client" && (
        <LocationPage />
      )}
      {/* <Chat /> */}
    </div>
  );
};

export default MasterRegistrationComponent;
