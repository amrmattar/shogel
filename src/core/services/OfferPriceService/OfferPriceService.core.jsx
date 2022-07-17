import { API } from "../../../enviroment/enviroment/enviroment";

export const userOfferPrice = {
    _GET_AllOrderList,
    _GET_OffersPriceTaskByID,
    _GET_MyOfferTaskLists,
    _GET_MyOfferSpecialLists,
    _GET_MyOfferGeneralLists,
    _POST_FileDoneByfreelancer,
    _POST_RequestOffer,
    _UPDATE_TaskByID,
    _DELETE_TaskByID
}
// _POST_RequestOffer
function _POST_RequestOffer(data) {
    const userToken = localStorage.getItem('userTK')

    const requestOption = {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + JSON.parse(userToken) },
    }
    return API.post(`task/store`, data, requestOption)
}
// _POST_FileDoneByfreelancer
function _POST_FileDoneByfreelancer(ID, data) {
    const userToken = localStorage.getItem('userTK')
    const requestOption = {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + JSON.parse(userToken) },
    }
    return API.post(`task/done_freelancer/${ID}`, data, requestOption)
}
// _GET_AllOrderList
function _GET_AllOrderList(page, pagination, pageNum, searchType, keyName) {
    return API.get(`task/list?perPage=${page}&pagination=${pagination}&page=${pageNum}&search=${searchType}&name=${keyName}`)
}

// _GET_AllOrderList
function _GET_OffersPriceTaskByID(ID) {
    const userToken = localStorage.getItem('userTK')
    const requestOption = {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + JSON.parse(userToken) },
    }
    return API.get(`task/show/${ID}`, requestOption)
}

// _GET_MyOfferLists
function _GET_MyOfferTaskLists(page, pagination, pageNum, status) {
    const userToken = localStorage.getItem('userTK')
    const requestOption = {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + JSON.parse(userToken) },
    }
    return API.get(`task/my_offer?perPage=${page}&pagination=${pagination}&page=${pageNum}&status_id=${status}`, requestOption)
}
// _GET_MyOfferSpecialLists
function _GET_MyOfferSpecialLists(page, pagination, pageNum, status) {
    const userToken = localStorage.getItem('userTK')
    const requestOption = {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + JSON.parse(userToken) },
    }
    return API.get(`task/my_list_special?perPage=${page}&pagination=${pagination}&page=${pageNum}&status_id=${status}`, requestOption)
}
// _GET_MyOfferGeneralLists
function _GET_MyOfferGeneralLists(page, pagination, pageNum, status) {
    const userToken = localStorage.getItem('userTK')
    const requestOption = {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + JSON.parse(userToken) },
    }
    return API.get(`task/my_list?perPage=${page}&pagination=${pagination}&page=${pageNum}&status_id=${status}`, requestOption)
}


// _DELETE_TaskByID
function _UPDATE_TaskByID(ID, data) {
    const userToken = localStorage.getItem('userTK')

    const requestOption = {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + JSON.parse(userToken) },
    }
    return API.post(`task/update/${ID}`, data, requestOption)
}


// _DELETE_TaskByID
function _DELETE_TaskByID(ID) {
    const userToken = localStorage.getItem('userTK')
    const requestOption = {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + JSON.parse(userToken) },
    }
    return API.delete(`/task/delete/${ID}`, requestOption)
}




