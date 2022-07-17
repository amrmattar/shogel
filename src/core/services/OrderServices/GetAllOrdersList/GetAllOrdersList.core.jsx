// user/freelancer
import { API } from "../../../../enviroment/enviroment/enviroment";

export const orderLists = {
    _GET_AllOrderList,
}
// _GET_ProfileData
function _GET_AllOrderList() {
    return API.get(`task/list`)
}
