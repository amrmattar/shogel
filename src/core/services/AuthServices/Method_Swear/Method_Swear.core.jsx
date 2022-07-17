// 
import { API } from "../../../../enviroment/enviroment/enviroment";


export const SwearServices = {
    GET_SwearData,
}

// GET_SwearData
function GET_SwearData(data) {
    return API.get(`setting/setting/list?key=${data}`)
}
