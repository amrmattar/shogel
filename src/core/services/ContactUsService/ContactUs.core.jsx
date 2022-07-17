// user/freelancer
import { API } from "../../../enviroment/enviroment/enviroment";

export const isPostContactUs = {
    _POST_ContactUsForm,
}
// _POST_ContactUsData
function _POST_ContactUsForm(data) {
    return API.post(`setting/contact_us/store`, data)
}
