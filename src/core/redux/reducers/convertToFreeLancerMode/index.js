import { createSlice } from "@reduxjs/toolkit";

const userData = {
  convertToFreeLancerMode: false,
};

const setConvertToFreeLancerModeReducer = createSlice({
  name: "convertToFreeLancerMode",
  initialState: userData,
  reducers: {
    setConvertToFreeLancerMode: (state, { payload }) => {
      state.convertToFreeLancerMode = payload;
    },
  },
});

export default setConvertToFreeLancerModeReducer.reducer;
export const { setConvertToFreeLancerMode } =
  setConvertToFreeLancerModeReducer.actions;
