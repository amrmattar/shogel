import { createSlice } from "@reduxjs/toolkit";
import {
  deleteCertificate,
  getCertificate,
} from "./CertificateSkillsReducer.core";
const languageData = {
  fLanguage: [],
  fLanguageRate: [],
  fAllSkills: [],
};

const LanguageSkillsReducer = createSlice({
  name: "LanguageSkillsReducer",
  initialState: languageData,
  reducers: {
    getLanguage: (state, { payload }) => {
      state.fLanguage.push(payload);
      state.fAllSkills.push(payload);
    },
    setAllLanguage: (state, { payload }) => {
      state.fLanguage.push(...payload);
      state.fAllSkills.push(...payload);
    },
    getLanguageRate: (state, action) => ({
      ...state,
      fLanguageRate: action.payload,
    }),
    deleteLanguage: (state, { payload }) => {
      state.fLanguage = state.fLanguage?.filter(({ id }) => id !== payload);
      state.fAllSkills = state.fAllSkills?.filter(({ id }) => id !== payload);
    },
  },
  extraReducers: {
    [getCertificate]: (state, { payload }) => {
      state.fAllSkills.push(payload);
    },
    [deleteCertificate]: (state, { payload }) => {
      state.fAllSkills = state.fAllSkills?.filter(({ id }) => id !== payload);
    },
  },
});

export default LanguageSkillsReducer.reducer;
export const { deleteLanguage, getLanguage, getLanguageRate, setAllLanguage } =
  LanguageSkillsReducer.actions;
