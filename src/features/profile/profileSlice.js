import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import api from "../../api/axios";

export const getProfile =
  createAsyncThunk(
    "profile/getProfile",

    async (_, thunkAPI) => {
      try {
        const response = await api.get(
          "/profile"
        );

        return response.data.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data
        );
      }
    }
  );

export const updateProfile =
  createAsyncThunk(
    "profile/updateProfile",

    async (payload, thunkAPI) => {
      try {
        const response = await api.put(
          "/profile/update",
          payload
        );

        return response.data.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data
        );
      }
    }
  );

export const uploadProfileImage =
  createAsyncThunk(
    "profile/uploadProfileImage",

    async (file, thunkAPI) => {
      try {
        const formData = new FormData();

        formData.append(
          "file",
          file
        );

        const response = await api.put(
          "/profile/image",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
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

const profileSlice = createSlice({
  name: "profile",

  initialState: {
    data: null,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // GET PROFILE
      .addCase(
        getProfile.pending,
        (state) => {
          state.loading = true;
        }
      )

      .addCase(
        getProfile.fulfilled,
        (state, action) => {
          state.loading = false;
          state.data = action.payload;
        }
      )

      .addCase(
        getProfile.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      // UPDATE PROFILE
      .addCase(
        updateProfile.pending,
        (state) => {
          state.loading = true;
        }
      )

      .addCase(
        updateProfile.fulfilled,
        (state, action) => {
          state.loading = false;
          state.data = action.payload;
        }
      )

      .addCase(
        updateProfile.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      // UPLOAD IMAGE
      .addCase(
        uploadProfileImage.pending,
        (state) => {
          state.loading = true;
        }
      )

      .addCase(
        uploadProfileImage.fulfilled,
        (state, action) => {
          state.loading = false;

          state.data.profile_image =
            action.payload.profile_image;
        }
      )

      .addCase(
        uploadProfileImage.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default profileSlice.reducer;