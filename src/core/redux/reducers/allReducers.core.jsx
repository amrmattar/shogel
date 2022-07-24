import { combineReducers } from "@reduxjs/toolkit";
import CertificateSkillsReducer from "./CertificateSkillsReducer.core";
import LanguageSkillsReducer from "./LanguageSkillsReducer.core";
import SocialMediaReducer from "./SocialMediaReducer.core";

import RegisterReducerCore from "./RegisterReducer/RegisterReducer.core";
import RegisterLocationIDReducer from "./RegisterReducer/RegisterLocationID.core";
import CategoryReducerCore from "./CategoryReducer.core";
import FotterReducer from "./FotterReducer.core";
import LoginReducerCore from "./LoginReducer/LoginReducer.core";
import AuthenticationReducerCore from "./Authentication/AuthenticationReducer.core";
import MessagesReducerCore from './Messages/Messages.core'
import MobileOTPReducerCore from './MobileOTP/MobileOTP.core'
import UserLoginDataCore from "./UserLoginData/UserLoginData.core";
import UpdateProfileReducerCore from "./UpdateProfileReducer/UpdateProfileReducer.core";
import RoleReducerCore from "./Role/RoleReducer.core";
import CoreDataReducer from "./CoreDataReducer/CoreDataReducer";
import UserDataReducerCore from "./UserDataReducer/UserDataReducer.core";
import RegisterCategoryReducer from './RegisterReducer/RegisterCategory.core'
import searchReducer from './Search/Search.core'
export const allReducers = combineReducers({
    register: RegisterReducerCore,
    certificateSkills: CertificateSkillsReducer,
    languageSkills: LanguageSkillsReducer,
    socailMedia: SocialMediaReducer,
    locationID: RegisterLocationIDReducer,
    category: CategoryReducerCore,
    login: LoginReducerCore,
    authentication: AuthenticationReducerCore,
    messages: MessagesReducerCore,
    mobileOTP: MobileOTPReducerCore,
    userData: UserLoginDataCore,
    profileUpdate: UpdateProfileReducerCore,
    userRole: RoleReducerCore,
    coreData: CoreDataReducer,
    userFullData: UserDataReducerCore,
    registerCategory: RegisterCategoryReducer,
    Fotter: FotterReducer,
    search: searchReducer
})
