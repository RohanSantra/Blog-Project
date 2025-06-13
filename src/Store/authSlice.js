import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../Appwrite/auth";

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (thunkAPI) => {
    try {
      const user = await authService.getCurrentUser();
      return user;
    } catch (err) {
      return thunkAPI.rejectWithValue(null); // not logged in
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: false,
    userData: null,
    loading: true,
  },
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.status = true;
        state.userData = action.payload;
        state.loading = false;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.status = false;
        state.userData = null;
        state.loading = false;
      });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
