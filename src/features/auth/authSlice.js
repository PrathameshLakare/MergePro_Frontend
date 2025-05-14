import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = import.meta.env.VITE_BACKEND_URL;

export const createNewUser = createAsyncThunk(
  "auth/createNewUser",
  async () => {
    const response = await axios.post(`${url}/v1/profiles`, null, {
      withCredentials: true,
    });
    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: null,
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
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
