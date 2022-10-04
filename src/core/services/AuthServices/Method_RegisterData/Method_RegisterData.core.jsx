import { API } from "../../../../enviroment/enviroment/enviroment";

// _GET_RegisterData
const GET_RegisterData = (model, countries_id, cities_id, state_id) => {
  return API.get(
    `coredata?model=${model}&country_id=${countries_id}&city_id=${cities_id}&state_id=${state_id}&lang=`
  );
};

// _POST_RegisterData
const POST_RegisterData = (data) => {
  return API.post(`auth/register`, data);
};

// test data to signUp
const POST_CheckRegisterData = async (data) => {
  return new Promise((res) => {
    setTimeout(() => {
      res({ data: { code: 200 } });
    }, 2000);
  });

  // return API.post(`auth/register/test`, data);
};

export const RegisterServices = {
  GET_RegisterData,
  POST_RegisterData,
  POST_CheckRegisterData,
};
