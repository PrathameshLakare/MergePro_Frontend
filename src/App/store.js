import { configureStore } from "@reduxjs/toolkit";
import profileSlice from "../features/profile/profileSlice";
import authSlice from "../features/auth/authSlice";
import userSlice from "../features/user/userSlice";

export default configureStore({
  reducer: {
    auth: authSlice,
    profile: profileSlice,
    users: userSlice,
  },
});
