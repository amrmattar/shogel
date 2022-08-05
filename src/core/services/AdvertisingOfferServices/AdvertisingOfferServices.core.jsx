import { API } from "../../../enviroment/enviroment/enviroment";

export const advertisingLists = {
  _GET_AllAdvsOffer,
  _GET_SelectUserAdvsOffer,
  _GET_AdvertisingByCategory,
  _GET_MyAdvsOffer,
  _GET_MyAdvsById,
  _POST_UpdateAdvertising,
  _POST_UpdateAdvertisingForm,
  _POST_AdvertisingOffer,
  _Delete_Advertising,
  _POST_AllAdvsOfferV2,
};
// _GET_AllAdvsOffer
function _GET_AllAdvsOffer(page, pagination, pageNum, searchType, keyName) {
  return API.get(
    `ad/list?perPage=${page}&pagination=${pagination}&page=${pageNum}&search=${searchType}&name=${keyName}`
  );
}
function _POST_AllAdvsOfferV2(data) {
  return API.post(`ad/list`, data);
}
// _GET_SelectUserAdvsOffer
function _GET_SelectUserAdvsOffer(page, pagination, pageNum, userID) {
  return API.get(
    `ad/list?perPage=${page}&pagination=${pagination}&page=${pageNum}&user_id=${userID}`
  );
}
// _GET_MyAdvsOffer
function _GET_MyAdvsOffer(page, pagination, pageNum, status) {
  const userToken = localStorage.getItem("userTK");
  const requestOption = {
    method: "GET",
    headers: { Authorization: "Bearer " + JSON.parse(userToken) },
  };
  return API.get(
    `ad/my_list?perPage=${page}&pagination=${pagination}&page=${pageNum}&status_id=${status}`,
    requestOption
  );
}

// _GET_MyAdvsById
function _GET_MyAdvsById(ID) {
  const userToken = localStorage.getItem("userTK");
  const requestOption = {
    method: "GET",
    headers: { Authorization: "Bearer " + JSON.parse(userToken) },
  };
  return API.get(`ad/show/${ID}`, requestOption);
}

// _POST_AdvertisingOffer
function _POST_AdvertisingOffer(data) {
  const userToken = localStorage.getItem("userTK");
  const requestOption = {
    method: "POST",
    headers: { Authorization: "Bearer " + JSON.parse(userToken) },
  };
  return API.post(`ad/store`, data, requestOption);
}

// _Delete_Advertising
function _Delete_Advertising(ID) {
  const userToken = localStorage.getItem("userTK");
  const requestOption = {
    method: "DELETE",
    headers: { Authorization: "Bearer " + JSON.parse(userToken) },
  };
  return API.delete(`ad/delete/${ID}`, requestOption);
}

// _POST_UpdateExpiredAdvertising
function _POST_UpdateAdvertising(ID) {
  const userToken = localStorage.getItem("userTK");
  const data = {
    Authorization: "Bearer " + JSON.parse(userToken),
  };
  const requestOption = {
    method: "POST",
    headers: { Authorization: "Bearer " + JSON.parse(userToken) },
  };
  return API.get(`ad/time/${ID}`, data, requestOption);
}

// _POST_UpdateAdvertisingForm
function _POST_UpdateAdvertisingForm(ID, data) {
  const userToken = localStorage.getItem("userTK");
  const requestOption = {
    method: "POST",
    headers: { Authorization: "Bearer " + JSON.parse(userToken) },
  };
  return API.post(`ad/update/${ID}`, data, requestOption);
}

// _POST_UpdateAdvertisingForm
function _GET_AdvertisingByCategory(perPage, status, categoryAdsID, ID) {
  return API.get(
    `ad/list?perPage=${perPage}&pagination=${status}&category[]=${categoryAdsID}&without=${ID}`
  );
}
