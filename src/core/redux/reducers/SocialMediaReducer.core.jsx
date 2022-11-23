import { createSlice } from "@reduxjs/toolkit";
const socialMedia = {
  fSocialMedia: [],
};

const SocialMediaReducer = createSlice({
  name: "SocialMediaReducer",
  initialState: socialMedia,
  reducers: {
    getSocialMedia: (state, { payload }) => {
      return (state = payload);
    },
    deleteSocialMedia: (state, { payload }) => {
      state.fSocialMedia = state.fSocialMedia?.filter(
        ({ id }) => id !== payload
      );
    },
  },
});
//sadasd
export default SocialMediaReducer.reducer;
export const { deleteSocialMedia, getSocialMedia } = SocialMediaReducer.actions;
