import { createSlice } from '@reduxjs/toolkit'

const userData = {
    searchStatus: false,
    searchKey: '',
    pageName:''
}
const searchReducer = createSlice({
    name: 'searchReducer',
    initialState: userData,
    reducers: {
        getSearchKey: (state, { payload }) => {
            return state = payload
        },
    },
})

export default searchReducer.reducer
export const { getSearchKey } = searchReducer.actions