import { API } from "../../../../enviroment/enviroment/enviroment";


export const userProfile = {
    _GET_ProfileData,
    _GET_ProfileByToken
}
// _GET_ProfileData
function _GET_ProfileByToken(token) {
    const requestOption = {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + JSON.parse(token) }
    }
    return API.get(`auth/get_user`, requestOption)
}

// _GET_ProfileData
function _GET_ProfileData(id) {
    return API.get(`user/profile?id=${id}`)
}
