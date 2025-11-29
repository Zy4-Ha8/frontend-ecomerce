import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  width: window.innerWidth,
  isMoblie: window.innerWidth <= 640 ? true : false,
  isTablet: window.innerWidth <= 1140 ? true : false,
};

const pageWidthSlice = createSlice({
  name: "pageWidth",
  initialState,
  reducers: {
    setWidth: (state, action) => {
      state.width = action.payload;
    },
  },
});

export const { setWidth } = pageWidthSlice.actions;
export default pageWidthSlice.reducer;
