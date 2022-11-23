import { createSlice } from "@reduxjs/toolkit";

const userData = {
  username: "",
  fullname: "",
  email: "",
  nationality_number: "",
  password: "",
  password_confirmation: "",
  job_name_id: "",
  role: "",
  country_id: "",
  city_id: "",
  state_id: "",
  gender_id: "",
  nationality_id: "",
};
const registerReducer = createSlice({
  name: "registerReducer",
  initialState: userData,
  reducers: {
    getDataForm: (state, { payload }) => {
      return (state = payload);
    },
  },
});

export default registerReducer.reducer;
export const { getDataForm } = registerReducer.actions;
