import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  api_url,
  categoriesEndPoint,
  productsEndPoint,
} from "../../assets/api/apiEndPoint";
import Cookies from "universal-cookie";

// API base URL - adjust this to your backend URL
const API_URL = `${api_url}/${productsEndPoint}`;
const cookie = new Cookies();

// * Public route
// Get all products
export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
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
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

// * public route
// Get single product by ID
export const getProductById = createAsyncThunk(
  "products/getProductById",
  async (id, { rejectWithValue }) => {
    const accessToken = cookie.get("access_token");

    try {
      const response = await axios.get(`${API_URL}/findById/${id}`, {
        headers: { Authorization: "Bearer " + accessToken },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch product"
      );
    }
  }
);

// ! not public route
// Create new user (POST) - FIXED FOR FILE UPLOAD
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (productData, { rejectWithValue }) => {
    const accessToken = cookie.get("access_token");

    try {
      const formData = new FormData();

      Object.keys(productData).forEach((key) => {
        if (key === "thumbnail" && productData[key] instanceof File) {
          formData.append("file", productData[key]);
        } else if (key === "images") {
          formData.append("files", productData[key]);
        } else if (
          productData[key] !== null &&
          productData[key] !== undefined
        ) {
          formData.append(key, productData[key]);
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
// Update product (PUT)
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ productId, updateProduct }, { rejectWithValue }) => {
    const accessToken = cookie.get("access_token");

    try {
      // Check if productData contains a file
      const hasFile = updateProduct.thumbnail instanceof File;

      let requestData;
      let headers = {
        Authorization: "Bearer " + accessToken,
      };

      if (hasFile) {
        // Create FormData if file is present
        const formData = new FormData();
        Object.keys(updateProduct).forEach((key) => {
          if (key === "thumbnail" && updateProduct[key] instanceof File) {
            formData.append("file", updateProduct[key]);
          } else if (
            updateProduct[key] !== null &&
            updateProduct[key] !== undefined
          ) {
            formData.append(key, updateProduct[key]);
          }
        });
        requestData = formData;
        headers["Content-Type"] = "multipart/form-data";
      } else {
        // Send as JSON if no file
        requestData = updateProduct;
      }

      const response = await axios.put(`${API_URL}/${productId}`, requestData, {
        headers,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update product"
      );
    }
  }
);
// ! not public route
// Delete product
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId, { rejectWithValue }) => {
    const accessToken = cookie.get("access_token");

    try {
      await axios.delete(`${API_URL}/${productId}`, {
        headers: { Authorization: "Bearer " + accessToken },
      });
      return productId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete product"
      );
    }
  }
);

// Initial state
const initialState = {
  products: [],
  currentProduct: null,
  loading: false,
  updateLoading: false,
  error: null,
  success: false,
};

const categoriesSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // *Get All Categories
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //* Get Single User
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload;
        state.error = null;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //* Create User
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        if (state.products) {
          state.products.data.push(action.payload.data);
        }
        state.success = true;
        state.error = null;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      //* Update User
      .addCase(updateProduct.pending, (state) => {
        state.updateLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.updateLoading = false;
        if (state.products.data) {
          const index = state.products.data.findIndex(
            (product) => product.id === action.payload.id
          );
          if (index !== -1) {
            state.products.data[index] = action.payload;
          }
          if (state.currentProduct?.id === action.payload.id) {
            state.currentProduct = action.payload;
          }
        }
        state.success = true;
        state.error = null;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.payload;
        state.success = false;
      })
      //* Delete User
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.data = state.products.data.filter(
          (product) => product.id !== action.payload
        );

        state.success = true;
        state.error = null;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export default categoriesSlice.reducer;
