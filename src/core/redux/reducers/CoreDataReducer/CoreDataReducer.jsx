import { createSlice } from '@reduxjs/toolkit'

const coreData = []
const CoreDataReducer = createSlice({
    name: 'CoreDataReducer',
    initialState: coreData,
    reducers: {
        getCoreDataReducer: (state, { payload }) => {
            return state = payload
        },
    },
})

export default CoreDataReducer.reducer
export const { getCoreDataReducer } = CoreDataReducer.actions