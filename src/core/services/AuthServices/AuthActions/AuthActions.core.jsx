import axios from 'axios'
import { API } from '../../../../enviroment/enviroment/enviroment'
import { getMessages } from '../../../redux/reducers/Messages/Messages.core'
import { RegisterServices } from '../Method_RegisterData/Method_RegisterData.core'


export const authAction = {
    register, _POST_Logout,
    _GET_IP
}

function register(data) {
    return (dispatch) => {
        RegisterServices.POST_RegisterData(data)
            .then(res => {
                dispatch(getMessages({ messages: res.data.message, messageType: 'success', messageClick: true }))
            })
            .catch((err) => {
                dispatch(getMessages([{ messages: err.response.data.message, messageType: 'error', messageClick: true }]))
            })
    }
}

// _POST_Login
function _POST_Logout(data) {
    const userToken = localStorage.getItem('userTK')
    const requestOption = {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + JSON.parse(userToken) },
    }
    return API.post(`auth/logout`, data, requestOption)
}

// _POST_Login
function _GET_IP(dta) {
    return axios.get(`https://geolocation-db.com/json/`)
}

















