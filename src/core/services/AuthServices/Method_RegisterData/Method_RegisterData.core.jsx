import { API } from "../../../../enviroment/enviroment/enviroment";


export const RegisterServices = {
    GET_RegisterData,
    POST_RegisterData,
}

// _GET_RegisterData
function GET_RegisterData(model, countries_id, cities_id, state_id) {
  return API.get(
    `coredata?model=${model}&country_id=${countries_id}&city_id=${cities_id}&state_id=${state_id}&lang=`
  );
}

// _POST_RegisterData
function POST_RegisterData(data) {
    return API.post(`auth/register`, data)
}
