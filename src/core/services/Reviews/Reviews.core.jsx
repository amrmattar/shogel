import { API } from "../../../enviroment/enviroment/enviroment";


export const reviewsCore = {
    _POST_Rating,
}
// _POST_Rating
function _POST_Rating(data) {
    const userToken = localStorage.getItem('userTK')
    const requestOption = {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + JSON.parse(userToken) },
    }
    return API.post(`setting/review`, data, requestOption)
}



// setting/review