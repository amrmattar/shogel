// user/freelancer

import { API } from "../../../../enviroment/enviroment/enviroment"

export const AdvertisingFav = {
    _POST_AdvsFavourite,
    _GET_AdvsFavourite,
}
// _POST_AdvsFavourite
function _POST_AdvsFavourite(ID) {
    const userToken = localStorage.getItem('userTK')

    const requestOption = {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + JSON.parse(userToken) },
    }
    return API.post(`favourite/${ID}`, { model: 'ad' }, requestOption)
}
// _GET_AdvsFavourite
function _GET_AdvsFavourite() {
    const userToken = localStorage.getItem('userTK')
    const requestOption = {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + JSON.parse(userToken) },
    }
    return API.get(`favourite/list?model=ad`, requestOption)
    // return API.get(`favourite/list?perPage=${page}&pagination=${pagination}&page=${pageNum}&model=ad`, requestOption)
}
