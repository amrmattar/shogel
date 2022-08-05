// user/freelancer
import { API } from "../../../../enviroment/enviroment/enviroment";

export const freelancersListProfile = {
  _GET_FreelancersListProfile,
  _POST_FreelancersListProfileV2,
};
// _GET_ProfileData
function _GET_FreelancersListProfile(
  page,
  pagination,
  pageNum,
  searchType,
  keyName
) {
  return API.get(
    `user/freelancer?perPage=${page}&pagination=${pagination}&page=${pageNum}&search=${searchType}&fullname=${keyName}`
  );
}
function _POST_FreelancersListProfileV2(data) {
  return API.post(`user/freelancer`, data);
}
