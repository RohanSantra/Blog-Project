// authSlice.js
import { createSlice } from "@reduxjs/toolkit";


// ✅ Safe parse helper
function getParsedUserData() {
  try {
    const stored = localStorage.getItem("userData");
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error("Error parsing userData from localStorage:", error);
    return null;
  }
}

const initialState = {
  status: localStorage.getItem("authStatus") === "true",
  userData: getParsedUserData(),
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
