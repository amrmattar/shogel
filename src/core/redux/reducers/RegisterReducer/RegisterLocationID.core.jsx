import { createSlice } from "@reduxjs/toolkit";

const locationID = {
  countriesID: 0,
  citiesID: 0,
  stateID: 0,
  areaID: 0,
};
const RegisterLocationIDReducer = createSlice({
  name: "RegisterLocationIDReducer",
  initialState: locationID,
  reducers: {
    getCountryID: (state, action) => ({
      ...state,
      countriesID: action.payload,
    }),
    getcitiesID: (state, action) => ({
      ...state,
      citiesID: action.payload,
    }),
    getStateID: (state, action) => ({
      ...state,
      stateID: action.payload,
    }),
    getAreaID: (state, action) => ({
      ...state,
      areaID: action.payload,
    }),
  },
});

export default RegisterLocationIDReducer.reducer;
export const { getCountryID, getcitiesID, getStateID, getAreaID } =
  RegisterLocationIDReducer.actions;
