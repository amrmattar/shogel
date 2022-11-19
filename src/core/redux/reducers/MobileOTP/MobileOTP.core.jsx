import { createSlice } from "@reduxjs/toolkit";

const mobile = {
  code: 0,
  mobile: 0,
};
const MobileOTPReducer = createSlice({
  name: "MobileOTPReducer",
  initialState: mobile,
  reducers: {
    getMobileNumber: (state, { payload }) => ({
      ...state,
      mobile: payload,
    }),
    getOTPValue: (state, { payload }) => ({
      ...state,
      code: payload,
    }),
  },
});

export default MobileOTPReducer.reducer;
export const { getMobileNumber, getOTPValue } = MobileOTPReducer.actions;
