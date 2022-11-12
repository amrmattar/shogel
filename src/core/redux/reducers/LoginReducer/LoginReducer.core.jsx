import { createSlice } from "@reduxjs/toolkit";

const userData = {
  email: "",
  password: "",
  device_token: "",
};
const LoginReducer = createSlice({
  name: "LoginReducer",
  initialState: userData,
  reducers: {
    getLoginForm: (state, { payload }) => {
      return (state = payload);
    },
  },
});

export default LoginReducer.reducer;
export const { getLoginForm } = LoginReducer.actions;
