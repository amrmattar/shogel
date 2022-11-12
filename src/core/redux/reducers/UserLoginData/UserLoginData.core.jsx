import { createSlice } from "@reduxjs/toolkit";

const userLoginData = {
  avatar: "",
  userRole: "",
  userName: "",
  id: 0,
  category: [],
  permission: [],
  FCMToken: "",
};

const UserLoginData = createSlice({
  name: "UserLoginData",
  initialState: userLoginData,
  reducers: {
    getUserLoginData: (state, { payload }) => {
      return (state = { ...state, ...payload });
    },
    addUserToken: (state, { payload }) => {
      return void (state.FCMToken = payload);
    },
  },
});

export default UserLoginData.reducer;
export const { getUserLoginData, addUserToken } = UserLoginData.actions;
