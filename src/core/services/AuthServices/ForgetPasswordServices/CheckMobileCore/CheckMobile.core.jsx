import { API } from "../../../../../enviroment/enviroment/enviroment";


export const checkMobileValidation = {
    _POST_CheckMobileValid,
}
// _POST_CheckMobileValid
function _POST_CheckMobileValid(data) {
    return API.post(`forget_password/cheek`, data)
}
