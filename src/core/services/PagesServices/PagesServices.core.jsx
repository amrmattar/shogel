import { API } from "../../../enviroment/enviroment/enviroment"

export const footerPages = {
    _GET_FooterPagesSections,
}
// _GET_FooterPagesSections
function _GET_FooterPagesSections() {
    return API.get(`setting/page/list`)
}
