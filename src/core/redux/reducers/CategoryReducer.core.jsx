import { createSlice } from '@reduxjs/toolkit'

const category = {
    formCate: []
}
const CategoryReducer = createSlice({
    name: 'CategoryReducer',
    initialState: category,
    reducers: {
        getCategoryValue: (state, { payload }) => {
            // return state = payload
            state.formCate.push(payload)
        },
    },
})

export default CategoryReducer.reducer
export const { getCategoryValue, deleteCategoryValue } = CategoryReducer.actions