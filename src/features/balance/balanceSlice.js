import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const getBalance = createAsyncThunk(
  "balance/getBalance",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/balance");
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data
      );
    }
  }
);

export const topUpBalance = createAsyncThunk(
  "balance/topUpBalance",
  async (amount, thunkAPI) => {
    try {
      const response = await api.post(
        "/topup",
        {
          top_up_amount: amount,
        }
      );

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data
      );
    }
  }
);

const balanceSlice = createSlice({
  name: "balance",

  initialState: {
    data: null,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getBalance.pending, (state) => {
        state.loading = true;
      })

      .addCase(getBalance.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })

      .addCase(getBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
    .addCase(topUpBalance.pending, (state) => {
        state.loading = true;
    })

    .addCase(
        topUpBalance.fulfilled,
        (state, action) => {
            state.loading = false;
            state.data = action.payload;
        }
    )

    .addCase(
        topUpBalance.rejected,
        (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    );
  },
});

export default balanceSlice.reducer;