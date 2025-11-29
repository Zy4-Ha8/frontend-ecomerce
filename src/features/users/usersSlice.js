import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { api_url, users } from "../../assets/api/apiEndPoint";
import Cookies from "universal-cookie";

// API base URL - adjust this to your backend URL
const API_URL = `${api_url}/${users}`;
const cookie = new Cookies();

// Get all users
export const getAllUsers = createAsyncThunk(
  "users/getAllUsers",
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
        error.response?.data?.message || "Failed to fetch users"
      );
    }
  }
);

// Get single user by ID
export const getUserById = createAsyncThunk(
  "users/getUserById",
  async (userId, { rejectWithValue }) => {
    const accessToken = cookie.get("access_token");

    try {
      const response = await axios.get(`${API_URL}/${userId}`, {
        headers: { Authorization: "Bearer " + accessToken },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user"
      );
    }
  }
);

// Create new user (POST) - FIXED FOR FILE UPLOAD
export const createUser = createAsyncThunk(
  "users/createUser",
  async (userData, { rejectWithValue }) => {
    const accessToken = cookie.get("access_token");

    try {
      const formData = new FormData();

      Object.keys(userData).forEach((key) => {
        if (key === "userAvatar" && userData[key] instanceof File) {
          formData.append("file", userData[key]);
        } else if (userData[key] !== null && userData[key] !== undefined) {
          formData.append(key, userData[key]);
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
        error.response?.data?.message || "Failed to create user"
      );
    }
  }
);

// Update user (PUT) - FIXED FOR FILE UPLOAD
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ userId, userData }, { rejectWithValue }) => {
    const accessToken = cookie.get("access_token");

    try {
      // Check if userData contains a file
      const hasFile = userData.userAvatar instanceof File;

      let requestData;
      let headers = {
        Authorization: "Bearer " + accessToken,
      };

      if (hasFile) {
        // Create FormData if file is present
        const formData = new FormData();
        Object.keys(userData).forEach((key) => {
          if (key === "userAvatar" && userData[key] instanceof File) {
            formData.append("file", userData[key]);
          } else if (userData[key] !== null && userData[key] !== undefined) {
            formData.append(key, userData[key]);
          }
        });
        requestData = formData;
        headers["Content-Type"] = "multipart/form-data";
      } else {
        // Send as JSON if no file
        requestData = userData;
      }

      const response = await axios.put(`${API_URL}/${userId}`, requestData, {
        headers,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update user"
      );
    }
  }
);

// Delete user
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId, { rejectWithValue }) => {
    const accessToken = cookie.get("access_token");

    try {
      await axios.delete(`${API_URL}/${userId}`, {
        headers: { Authorization: "Bearer " + accessToken },
      });
      return userId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete user"
      );
    }
  }
);

// Initial state
const initialState = {
  users: [],
  currentUser: null,
  loading: false,
  error: null,
  success: false,
};

// Create slice
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // Clear error
    clearError: (state) => {
      state.error = null;
    },
    // Clear success
    clearSuccess: (state) => {
      state.success = false;
    },
    // Clear current user
    clearCurrentUser: (state) => {
      state.currentUser = null;
    },
    // Reset state
    resetUserState: (state) => {
      state.users = [];
      state.currentUser = null;
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // *Get All Users
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.error = null;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //* Get Single User
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        state.error = null;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //* Create User
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload.user);
        state.success = true;
        state.error = null;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      //* Update User
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.users.findIndex(
          (user) => user.id === action.payload.id
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
        if (state.currentUser?.id === action.payload.id) {
          state.currentUser = action.payload;
        }
        state.success = true;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      //* Delete User
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.data = state.users.data.filter((user) => user.id !== action.payload);
       
        state.success = true;
        state.error = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { clearError, clearSuccess, clearCurrentUser, resetUserState } =
  userSlice.actions;

export default userSlice.reducer;
