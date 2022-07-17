import { API } from "../../../enviroment/enviroment/enviroment";

export const pageTitle = {
    _GET_PagesTitle,

}

// _GET_PagesTitle
function _GET_PagesTitle(key) {
    return API.get(`setting/setting/list?key=name`)
}

