import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/auth";
import pageWidthReducer from "../features/assets/pageWidthSlice";
import usersReducer from "../features/users/usersSlice";
import categoriesReducer from "../features/categories/categoriesSlice";
import productsReducer from "../features/products/productsSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    pageWidth: pageWidthReducer,
    users: usersReducer,
    categories: categoriesReducer,
    products: productsReducer,
  },
});
