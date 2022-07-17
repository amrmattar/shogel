import { API } from "../../../enviroment/enviroment/enviroment";

export const userOfferRequest = {
    _POST_RequestOfOffer,
    _GET_ALLRequestListsOffer,
    _GET_MyOfferList,
    _POST_MyOfferComment,
    _GET_MyTaskById,
    _POST_EditPriceRequest,
    _POST_UpdateOfferRequest,
    _POST_AcceptOfferRequest,
    _POST_DoneByClient,
    _POST_RejectByClient
}
// _POST_RequestOfOffer
function _POST_RequestOfOffer(data) {
    const userToken = localStorage.getItem('userTK')
    const requestOption = {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + JSON.parse(userToken) },
    }
    return API.post(`offer/store`, data, requestOption)
}
// _GET_ALLRequestListsOffer
function _GET_ALLRequestListsOffer(taskID) {
    const userToken = localStorage.getItem('userTK')
    const requestOption = {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + JSON.parse(userToken) },
    }
    return API.get(`offer/list?task_id=${taskID}`, requestOption)
}

// _GET_MyOfferList
function _GET_MyOfferList() {
    const userToken = localStorage.getItem('userTK')
    const requestOption = {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + JSON.parse(userToken) },
    }
    return API.get(`offer/my_list?=`, requestOption)
}
// _POST_MyOfferComment
function _POST_MyOfferComment(comment) {
    const userToken = localStorage.getItem('userTK')
    const requestOption = {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + JSON.parse(userToken) },
    }
    return API.post(`offer/comment`, comment, requestOption)
}



// TODO ====> Offer Price Task Buttons Action
// _GET_MyTaskById
function _GET_MyTaskById(ID) {
    const userToken = localStorage.getItem('userTK')
    const requestOption = {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + JSON.parse(userToken) },
    }
    return API.get(`task/show/${ID}`, requestOption)
}
// TODO ====> Edit Offer Price Buttons Action
function _POST_EditPriceRequest(ID) {
    const userToken = localStorage.getItem('userTK')
    const requestOption = {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + JSON.parse(userToken) },
    }
    return API.post(`offer/edit/${ID}`, '', requestOption)
}
// TODO ====> Save Update  Offer Price Buttons Action
function _POST_UpdateOfferRequest(ID, data) {
    const userToken = localStorage.getItem('userTK')
    const requestOption = {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + JSON.parse(userToken) },
    }
    return API.post(`offer/update/${ID}`, data, requestOption)
}

// TODO ====> Accept Offer Price Buttons Action
function _POST_AcceptOfferRequest(ID) {
    const userToken = localStorage.getItem('userTK')
    const requestOption = {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + JSON.parse(userToken) },
    }
    return API.post(`offer/approve/${ID}`, '', requestOption)
}
// TODO ====> Done Task By Client
function _POST_DoneByClient(ID) {
    const userToken = localStorage.getItem('userTK')
    const requestOption = {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + JSON.parse(userToken) },
    }
    return API.post(`task/done_client/${ID}`, '', requestOption)
}
// TODO ====> Reject Or UnApprove Task By Client
function _POST_RejectByClient(taskId) {
    const data = {
        id: taskId
    }
    const userToken = localStorage.getItem('userTK')
    const requestOption = {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + JSON.parse(userToken) },
    }
    return API.post(`task/unapprove_client`, data, requestOption)
}
