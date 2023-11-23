import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "user",
  initialState: {
    // user exist or not
    userInfo: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  },
  reducers: {
   userLoginInfo: (state, action) => {
    state.userInfo = action.payload
   }
  },
});

// Action creators are generated for each case reducer function
export const { userLoginInfo  } = counterSlice.actions;

export default counterSlice.reducer;
