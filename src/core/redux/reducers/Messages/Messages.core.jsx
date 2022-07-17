import { createSlice } from '@reduxjs/toolkit'

const Messages =
{
    messages: [],
    messageType: '',
    messageClick: false
}

const MessagesReducer = createSlice({
    name: 'MessagesReducer',
    initialState: Messages,
    reducers: {
        getMessages: (state, { payload }) => {
            return state = payload
        },
    },
})

export default MessagesReducer.reducer
export const { getMessages } = MessagesReducer.actions