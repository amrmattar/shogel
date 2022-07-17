import { createSlice } from '@reduxjs/toolkit'

let user = JSON.parse(localStorage.getItem('userTK'));
const initialState = user ? { loggedIn: true, user } : { loggedIn: false };

const Authentication = createSlice({
    name: 'Authentication',
    initialState: initialState,
    reducers: {
        getAuthentication: (state, { payload }) => {
            switch (payload) {
                case true:
                    return {
                        loggedIn: true,
                        user: user && user
                    };
                case false:
                    return {
                        loggedIn: false,
                        user: localStorage.clear()
                    };
                default:
                    return state
            }
        },
    },
})

export default Authentication.reducer
export const { getAuthentication } = Authentication.actions