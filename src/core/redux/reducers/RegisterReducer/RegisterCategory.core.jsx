import { createSlice } from '@reduxjs/toolkit'

const registerCategory = []
const RegisterCategoryReducer = createSlice({
    name: 'RegisterCategoryReducer',
    initialState: registerCategory,
    reducers: {
        getRegisterCategoryValue: (state, action) => {
            return state = action.payload
        },
    },
})

export default RegisterCategoryReducer.reducer
export const { getRegisterCategoryValue } = RegisterCategoryReducer.actions