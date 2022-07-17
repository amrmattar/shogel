import { API } from "../../../enviroment/enviroment/enviroment"

export const homePages = {
    _GET_HomePagesSections,
}
// _GET_HomePagesSections
function _GET_HomePagesSections(id) {
    // return API.get(`setting/page/list`)
    // return API.get(`setting/setting/list`)
    return API.get(`setting/setting/list?home=${id}`)
}
