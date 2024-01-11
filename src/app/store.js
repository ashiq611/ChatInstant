import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import activeReducer from "../slices/activeChatSlice";

export default configureStore({
  reducer: {
    userLoginInfo: userReducer,
    activeChatInfo: activeReducer,
  },
});
