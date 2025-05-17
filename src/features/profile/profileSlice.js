import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = import.meta.env.VITE_BACKEND_URL;

export const getUserDetails = createAsyncThunk(
  "profile/getUser",
  async (userId) => {
    const response = await axios.get(`${url}/v1/profiles/${userId}/details`);
    return response.data;
  }
);

export const updateTags = createAsyncThunk(
  "profile/updateTag",
  async ({ inputTags, userId }, thunkAPI) => {
    try {
      const tags = inputTags.split(", ");
      const response = await axios.post(
        `${url}/v1/profiles/${userId}/tags`,
        { tags },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateProfileData = createAsyncThunk(
  "profile/updateProfile",
  async ({ userId, userData }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${url}/v1/profiles/${userId}`,
        userData,
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

//resume should be form data
export const updateResume = createAsyncThunk(
  "profile/updateResume",
  async ({ userId, resume }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${url}/v1/profiles/${userId}/resume`,
        resume,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateCustomSlug = createAsyncThunk(
  "profile/customSlug",
  async ({ userId, customSlug }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${url}/v1/profiles/${userId}/slug`,
        { customSlug },
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateFeaturedRepos = createAsyncThunk(
  "profile/updateFeaturedRepos",
  async ({ userId, featuredRepos }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${url}/v1/profiles/${userId}/featured`,
        { featuredRepos },
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: {},
    status: "idle",
    error: null,
    successMessage: null,
  },
  reducers: {
    clearProfileError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserDetails.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(getUserDetails.fulfilled, (state, action) => {
      state.status = "success";
      state.profile = action.payload.profile;
    });
    builder.addCase(getUserDetails.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
    builder.addCase(updateProfileData.pending, (state) => {
      state.status = "loading";
      state.successMessage = null;
      state.error = null;
    });
    builder.addCase(updateProfileData.fulfilled, (state, action) => {
      state.status = "success";
      state.profile = action.payload.profile;
      state.successMessage = "Profile updated successfully.";
    });
    builder.addCase(updateProfileData.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
      state.successMessage = null;
    });
    builder.addCase(updateTags.pending, (state) => {
      state.status = "loading";
      state.successMessage = null;
      state.error = null;
    });
    builder.addCase(updateTags.fulfilled, (state, action) => {
      state.status = "success";
      state.profile.tags = action.payload.tags;
      state.successMessage = "Profile updated successfully.";
    });
    builder.addCase(updateTags.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
      state.successMessage = null;
    });
    builder.addCase(updateResume.pending, (state) => {
      state.status = "loading";
      state.successMessage = null;
      state.error = null;
    });
    builder.addCase(updateResume.fulfilled, (state, action) => {
      state.status = "success";
      state.profile.resumeUrl = action.payload.resumeUrl;
      state.successMessage = "Profile updated successfully.";
    });
    builder.addCase(updateResume.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
      state.successMessage = null;
    });
    builder.addCase(updateFeaturedRepos.pending, (state) => {
      state.status = "loading";
      state.successMessage = null;
      state.error = null;
    });
    builder.addCase(updateFeaturedRepos.fulfilled, (state, action) => {
      state.status = "success";
      state.profile.featuredRepos = action.payload.featuredRepos;
      state.successMessage = "Profile updated successfully.";
    });
    builder.addCase(updateFeaturedRepos.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
      state.successMessage = null;
    });
    builder.addCase(updateCustomSlug.pending, (state) => {
      state.status = "loading";
      state.successMessage = null;
      state.error = null;
    });
    builder.addCase(updateCustomSlug.fulfilled, (state, action) => {
      state.status = "success";
      state.profile.customSlug = action.payload.customSlug;
      state.successMessage = "Profile updated successfully.";
    });
    builder.addCase(updateCustomSlug.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
      state.successMessage = null;
    });
  },
});

export const { clearProfileError } = profileSlice.actions;

export default profileSlice.reducer;
