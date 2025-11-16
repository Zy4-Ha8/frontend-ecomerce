import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";
const apiUrl = "https://ecomerce-production-d4d4.up.railway.app";
const cookie = new Cookies();
// Async thunk for registration
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/registion`, userData);
      cookie.set("access_token", response.data.access_token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);
// Async thunk for registration
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, userData);
      cookie.set("access_token", response.data.access_token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

// Async thunk for OTPSending
export const OTPSending = createAsyncThunk(
  "auth/OTPSending",
  async (body, thunkAPI) => {
    const accessToken = cookie.get("access_token");
    try {
      const response = await axios.post(
        `${apiUrl}/users/verification-otp`,
        body,
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

// Async thunk for OTPVerify
export const OTPVerify = createAsyncThunk(
  "auth/OTPVerify",
  async (body, thunkAPI) => {
    const accessToken = cookie.get("access_token");
    try {
      const response = await axios.post(
        `${apiUrl}/users/verify-otp/${body.code}`,
        { id: body.id },
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      );

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    // * resgister
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // * otp sending
      .addCase(OTPSending.pending, (state) => {
        state.loading = true;
      })
      .addCase(OTPSending.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(OTPSending.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // * otp verifing
      .addCase(OTPVerify.pending, (state) => {
        state.loading = true;
      })
      .addCase(OTPVerify.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(OTPVerify.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
