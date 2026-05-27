import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const getBanners = createAsyncThunk(
  "banner/getBanners",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/banner");

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data
      );
    }
  }
);

const bannerSlice = createSlice({
  name: "banner",

  initialState: {
    data: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getBanners.pending, (state) => {
        state.loading = true;
      })

      .addCase(getBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })

      .addCase(getBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default bannerSlice.reducer;