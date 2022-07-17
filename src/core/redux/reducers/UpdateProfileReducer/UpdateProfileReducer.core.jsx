import { createSlice } from '@reduxjs/toolkit'
import { getCategoryValue } from '../CategoryReducer.core'
import { getcitiesID, getCountryID, getStateID,getAreaID } from '../RegisterReducer/RegisterLocationID.core'

const updateData = {
}
const UpdateProfileReducer = createSlice({
    name: 'UpdateProfileReducer',
    initialState: updateData,
    reducers: {
        getUpdateDataForm: (state, { payload }) => ({
            ...state,
            updateData: payload
        }),
        getDescription: (state, { payload }) => ({
            ...state,
            discription: payload
        }),
    },
    extraReducers: {
        [getCountryID]: (state, action) => ({
            ...state,
            countriesID: action.payload
        }),
        [getcitiesID]: (state, action) => ({
            ...state,
            citiesID: action.payload
        }),
        [getStateID]: (state, action) => ({
            ...state,
            stateID: action.payload
        }),
        [getAreaID]: (state, action) => ({
            ...state,
            areaID: action.payload
        }),
        [getCategoryValue]: (state, { payload }) => ({
            ...state,
            category: payload
        }),
    },
})

export default UpdateProfileReducer.reducer
export const { getUpdateDataForm, getDescription, getAvatar, getDocument } = UpdateProfileReducer.actions