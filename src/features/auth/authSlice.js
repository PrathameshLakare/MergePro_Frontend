import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = import.meta.env.VITE_BACKEND_URL;

export const getMyProfile = createAsyncThunk("auth/getUser", async () => {
  const response = await axios.get(`${url}/v1/profiles/my-profile`, {
    withCredentials: true,
  });
  return response.data;
});

export const createNewUser = createAsyncThunk(
  "profile/createNewUser",
  async () => {
    const response = await axios.post(`${url}/v1/profiles`, null, {
      withCredentials: true,
    });
    return response.data;
  }
);

const authSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    status: "idle",
    error: null,
    successMessage: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMyProfile.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getMyProfile.fulfilled, (state, action) => {
      state.status = "success";
      state.user = action.payload.profile;
    });
    builder.addCase(getMyProfile.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
    builder.addCase(createNewUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(createNewUser.fulfilled, (state, action) => {
      state.status = "success";
      state.user = action.payload.profile;
    });
    builder.addCase(createNewUser.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  },
});

export default authSlice.reducer;
