import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
// import { configureStore, getDefaultMiddleware } from 'redux-starter-kit'

import { allReducers } from "../reducers/allReducers.core";

export const store = configureStore({
  reducer: allReducers,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
  devTools: false,
});
