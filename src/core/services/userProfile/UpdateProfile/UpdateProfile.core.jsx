// user/update/2
import { API } from "../../../../enviroment/enviroment/enviroment";


export const updateProfile = {
    _POST_UpdateProfile,
}
// _POST_UpdateProfile
function _POST_UpdateProfile(id,UpdateDiscription) {
 
    const userToken = localStorage.getItem('userTK')
    const requestOption = {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + JSON.parse(userToken) },
    }
    return API.post(`user/update/${id}`, UpdateDiscription, requestOption)
}
