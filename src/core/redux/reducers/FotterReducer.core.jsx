import { createSlice } from "@reduxjs/toolkit";

const FotterState = {
  visible: true,
};
const FotterReducer = createSlice({
  name: "FotterReducer",
  initialState: FotterState,
  reducers: {
    ChangeFotterState: (state, action) => {
      state.visible = action.payload;
    },
  },
});

export default FotterReducer.reducer;
export const { ChangeFotterState } = FotterReducer.actions;
