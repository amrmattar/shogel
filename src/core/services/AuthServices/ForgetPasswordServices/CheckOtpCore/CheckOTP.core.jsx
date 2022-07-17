import { API } from "../../../../../enviroment/enviroment/enviroment";


export const checkOTPValidation = {
    _POST_CheckOTPValid,
}
// _POST_CheckOTPValid
function _POST_CheckOTPValid(data) {
    return API.post(`forget_password/code`, data)
}
