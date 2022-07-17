// user/freelancer
import { API } from "../../../../enviroment/enviroment/enviroment";

export const freelancersListProfile = {
    _GET_FreelancersListProfile,
}
// _GET_ProfileData
function _GET_FreelancersListProfile(page, pagination, pageNum, searchType, keyName) {
    return API.get(`user/freelancer?perPage=${page}&pagination=${pagination}&page=${pageNum}&search=${searchType}&fullname=${keyName}`)
}
