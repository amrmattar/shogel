import { createSlice } from "@reduxjs/toolkit";

const userData = {
  searchKey: "",
};

const searchReducer = createSlice({
  name: "searchReducer",
  initialState: userData,
  reducers: {
    getSearchKey: (state, { payload }) => {
      state.searchKey = payload;
    },
  },
});

export default searchReducer.reducer;
export const { getSearchKey } = searchReducer.actions;
