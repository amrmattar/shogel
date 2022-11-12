import { createSlice } from "@reduxjs/toolkit";

const userData = {};

const UserDataReducer = createSlice({
  name: "UserDataReducer",
  initialState: userData,
  reducers: {
    getUserDataReducer: (state, { payload }) => {
      return (state = payload);
    },
  },
});

export default UserDataReducer.reducer;
export const { getUserDataReducer } = UserDataReducer.actions;
