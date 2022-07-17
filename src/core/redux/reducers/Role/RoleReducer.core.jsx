import { createSlice } from '@reduxjs/toolkit'

let userRole = localStorage.getItem('userRL');
const initialState = userRole ? { loggedIn: true, userRole } : { loggedIn: false };

const RoleUser = createSlice({
    name: 'RoleUser',
    initialState: initialState,
    reducers: {
        getRoleUser: (state, { payload }) => {
            switch (payload) {
                case true:
                    return {
                        loggedIn: true,
                        userRole: localStorage.getItem('userRL') 
                    };
                case false:
                    return {
                        loggedIn: false,
                        userRole: localStorage.getItem('userRL')
                    };
                default:
                    return state
            }
        },
    },
})

export default RoleUser.reducer
export const { getRoleUser } = RoleUser.actions