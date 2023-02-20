import { API } from "../../../../enviroment/enviroment/enviroment";

export const MobileServices = {
  _POST_MobileNumber,
  _POST_MobileOTP,
  _POST_ResendOTP,
};
// _POST_MobileNumber
async function _POST_MobileNumber(data) {
  const mobileData = {
    mobile: data.mobile.split("+").join(""),
    country_code: data?.country_code,
  };
  return await API.post(`check_mobile/cheek`, mobileData);
}

// _POST_Mobile (OTP)
async function _POST_MobileOTP(data) {
  return await API.post(`check_mobile/code`, data);
}

// _POST_Resend (OTP)
async function _POST_ResendOTP(data) {
  return await API.post(`check_mobile/resend`, data);
}
