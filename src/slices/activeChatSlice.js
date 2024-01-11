import { createSlice } from "@reduxjs/toolkit";
// chat selected friend active slice
export const activeChatSlice = createSlice({
  name: "activeChat",
  initialState: {
    // active friend user exist or not
    activeInfo: localStorage.getItem("activeFriend")
      ? JSON.parse(localStorage.getItem("activeFriend"))
      : null,
  },
  reducers: {
    activeChatInfo: (state, action) => {
      state.activeInfo = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { activeChatInfo } = activeChatSlice.actions;

export default activeChatSlice.reducer;
