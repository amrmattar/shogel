import { API } from "../../../../enviroment/enviroment/enviroment";


export const LoginServices = {
    _POST_LoginData,
}
// _POST_Login
function _POST_LoginData(data) {
    return API.post(`auth/login`, data)
}
