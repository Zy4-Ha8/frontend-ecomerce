import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { api_url, categoriesEndPoint } from "../../assets/api/apiEndPoint";
import Cookies from "universal-cookie";

// API base URL - adjust this to your backend URL
const API_URL = `${api_url}/${categoriesEndPoint}`;
const cookie = new Cookies();
// * Public route
// Get all users
export const getAllCategories = createAsyncThunk(
  "categories/getAllcategories",
  async ({ limit, page, search }, { rejectWithValue }) => {
    const accessToken = cookie.get("access_token");
    try {
      const apiEndPoint = `${API_URL}/pagination?limit=${limit}&page=${page}${
        search ? `&search=${search}` : ""
      }`;
      const response = await axios.get(apiEndPoint, {
        headers: { Authorization: "Bearer " + accessToken },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch categories"
      );
    }
  }
);
// * public route
// Get single user by ID
export const getCategoryById = createAsyncThunk(
  "categories/getCategoryById",
  async (id, { rejectWithValue }) => {
    const accessToken = cookie.get("access_token");

    try {
      const response = await axios.get(`${API_URL}/findById/${id}`, {
        headers: { Authorization: "Bearer " + accessToken },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch category"
      );
    }
  }
);
// ! not public route
// Create new user (POST) - FIXED FOR FILE UPLOAD
export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async (categoryData, { rejectWithValue }) => {
    const accessToken = cookie.get("access_token");

    try {
      const formData = new FormData();

      Object.keys(categoryData).forEach((key) => {
        if (key === "image_url" && categoryData[key] instanceof File) {
          formData.append("file", categoryData[key]);
        } else if (
          categoryData[key] !== null &&
          categoryData[key] !== undefined
        ) {
          formData.append(key, categoryData[key]);
        }
      });

      const response = await axios.post(API_URL, formData, {
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create category"
      );
    }
  }
);
// ! not public route
// Update user (PUT) - FIXED FOR FILE UPLOAD
export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ categoryId, updateCategory }, { rejectWithValue }) => {
    const accessToken = cookie.get("access_token");

    try {
      // Check if userData contains a file
      const hasFile = updateCategory.image_url instanceof File;

      let requestData;
      let headers = {
        Authorization: "Bearer " + accessToken,
      };

      if (hasFile) {
        // Create FormData if file is present
        const formData = new FormData();
        Object.keys(updateCategory).forEach((key) => {
          if (key === "image_url" && userData[key] instanceof File) {
            formData.append("file", userData[key]);
          } else if (userData[key] !== null && userData[key] !== undefined) {
            formData.append(key, userData[key]);
          }
        });
        requestData = formData;
        headers["Content-Type"] = "multipart/form-data";
      } else {
        // Send as JSON if no file
        requestData = updateCategory;
      }

      const response = await axios.put(
        `${API_URL}/${categoryId}`,
        requestData,
        {
          headers,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update category"
      );
    }
  }
);
// ! not public route
// Delete user
export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (categoryId, { rejectWithValue }) => {
    const accessToken = cookie.get("access_token");

    try {
      await axios.delete(`${API_URL}/${categoryId}`, {
        headers: { Authorization: "Bearer " + accessToken },
      });
      return categoryId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete category"
      );
    }
  }
);

// Initial state
const initialState = {
  categories: [],
  currentCategory: null,
  loading: false,
  error: null,
  success: false,
};

// Create slice
const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // *Get All Categories
      .addCase(getAllCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.error = null;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //* Get Single User
      .addCase(getCategoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        state.error = null;
      })
      .addCase(getCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //* Create User
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        if (state.users) {
          state.users.push(action.payload.data);
        }
        state.success = true;
        state.error = null;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      //* Update User
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        if (state.categories.data) {
          const index = state.categories.data.findIndex(
            (category) => category.id === action.payload.id
          );
          if (index !== -1) {
            state.categories.data[index] = action.payload;
          }
          if (state.currentCategory?.id === action.payload.id) {
            state.currentCategory = action.payload;
          }
        }
        state.success = true;
        state.error = null;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      //* Delete User
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.data = state.categories.data.filter(
          (category) => category.id !== action.payload
        );

        state.success = true;
        state.error = null;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export default categoriesSlice.reducer;
