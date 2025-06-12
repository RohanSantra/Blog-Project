// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: localStorage.getItem("authStatus") === "true" ? true : false,
  userData: JSON.parse(localStorage.getItem("userData")) || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
      // save to localStorage
      localStorage.setItem("authStatus", "true");
      localStorage.setItem("userData", JSON.stringify(action.payload.userData));
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
      localStorage.removeItem("authStatus");
      localStorage.removeItem("userData");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
