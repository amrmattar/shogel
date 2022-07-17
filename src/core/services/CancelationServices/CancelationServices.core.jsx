import { API } from "../../../enviroment/enviroment/enviroment";
export const cancelList = {
    _GET_CancelationList,
    _POST_Cancel,
}

// _GET_CancelationList
function _GET_CancelationList() {
    return API.get(`setting/cancellation/list`)
}

// _POST_Cancel
function _POST_Cancel(ID, data, type) {
    const userToken = localStorage.getItem('userTK')
    const requestOption = {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + JSON.parse(userToken) },
    }
    switch (type) {
        case 'advs':
            return API.post(`ad/cansel/${ID}`, data, requestOption)
        case 'task':
            return API.post(`task/cansel/${ID}`, data, requestOption)
        case 'offer':
            return API.post(`offer/cansel/${ID}`, data, requestOption)
        case 'unApproveOffer':
            return API.post(`offer/unapprove/${ID}`, data, requestOption)
        default:
            return false
    }
}