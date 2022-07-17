import { API } from "../../../../../enviroment/enviroment/enviroment";


export const changePassword = {
    _POST_ChangePassword,
}
// _POST_CheckMobileValid
function _POST_ChangePassword(data) {
    return API.post(`forget_password/change_password`, data)
}
