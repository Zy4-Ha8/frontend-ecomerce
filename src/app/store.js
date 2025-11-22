import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/auth";
import pageWidthReducer from "../features/assets/pageWidthSlice";
import usersReducer from "../features/users/usersSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    pageWidth: pageWidthReducer,
    users: usersReducer,
  },
});
