import { createSlice } from '@reduxjs/toolkit'

const userLoginData = {
    avatar: '',
    userRole: '',
    userName: '',
    id: 0,
    category: [],
    permission: []
}
const UserLoginData = createSlice({
    name: 'UserLoginData',
    initialState: userLoginData,
    reducers: {
        getUserLoginData: (state, { payload }) => {
            return state = payload
        },
    },
})

export default UserLoginData.reducer
export const { getUserLoginData } = UserLoginData.actions