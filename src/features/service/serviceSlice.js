import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const getServices = createAsyncThunk(
  "service/getServices",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/services");

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data
      );
    }
  }
);

const serviceSlice = createSlice({
  name: "service",

  initialState: {
    data: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(getServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        getServices.fulfilled,
        (state, action) => {
          state.loading = false;
          state.data = action.payload;
        }
      )

      .addCase(
        getServices.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default serviceSlice.reducer;