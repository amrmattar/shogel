import { API } from "../../../enviroment/enviroment/enviroment";

export const deleteBasicData = {
    _Delete_Data
}


// _Delete_Data
function _Delete_Data(ID) {
    const userToken = localStorage.getItem('userTK')
    const requestOption = {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + JSON.parse(userToken) },
    }
    return API.delete(`basic/media?id=${ID}`, requestOption)
}

