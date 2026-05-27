import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import api from "../../api/axios";

export const createTransaction =
  createAsyncThunk(
    "transaction/createTransaction",

    async (serviceCode, thunkAPI) => {
      try {
        const response = await api.post(
          "/transaction",
          {
            service_code: serviceCode,
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

export const getTransactionHistory =
  createAsyncThunk(
    "transaction/getTransactionHistory",

    async (offset = 0, thunkAPI) => {
      try {
        const response = await api.get(
          `/transaction/history?offset=${offset}&limit=5`
        );

        return response.data.data.records;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data
        );
      }
    }
  );

const transactionSlice = createSlice({
  name: "transaction",

  initialState: {
    loading: false,
    success: false,
    error: null,

    histories: [],
  },

  reducers: {
    resetTransaction: (state) => {
      state.success = false;
      state.error = null;
    },

    resetHistories: (state) => {
      state.histories = [];
    },
  },

  extraReducers: (builder) => {
    builder

      // CREATE TRANSACTION
      .addCase(
        createTransaction.pending,
        (state) => {
          state.loading = true;
        }
      )

      .addCase(
        createTransaction.fulfilled,
        (state) => {
          state.loading = false;
          state.success = true;
        }
      )

      .addCase(
        createTransaction.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      // GET HISTORY
      .addCase(
        getTransactionHistory.pending,
        (state) => {
          state.loading = true;
        }
      )

      .addCase(
        getTransactionHistory.fulfilled,
        (state, action) => {
          state.loading = false;

          state.histories = [
            ...state.histories,
            ...action.payload,
          ];
        }
      )

      .addCase(
        getTransactionHistory.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const {
  resetTransaction,
  resetHistories,
} = transactionSlice.actions;

export default transactionSlice.reducer;