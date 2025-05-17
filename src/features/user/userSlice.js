import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const url = import.meta.env.VITE_BACKEND_URL;

export const getProfiles = createAsyncThunk(
  "profiles",
  async (tags, thunkAPI) => {
    try {
      const response = await axios.get(`${url}/v1/profiles/search`, {
        withCredentials: true,
        params: tags,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getUserDetailsById = createAsyncThunk(
  "profile/getUser",
  async (userId) => {
    const response = await axios.get(`${url}/v1/profiles/${userId}/details`);
    return response.data;
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    profiles: [],
    user: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProfiles.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getProfiles.fulfilled, (state, action) => {
      state.status = "success";
      state.profiles = action.payload;
    });
    builder.addCase(getProfiles.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
    builder.addCase(getUserDetailsById.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getUserDetailsById.fulfilled, (state, action) => {
      state.status = "success";
      state.user = action.payload.profile;
    });
    builder.addCase(getUserDetailsById.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
  },
});

export default userSlice.reducer;
