// src/redux/Slice/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { httpPost } from "../../config/httphandler";
import { saveToStorage, getFromStorage, removeFromStorage } from "../store/storage";

// ---------------------------------------------------------
// 🔹 REGISTER USER
// ---------------------------------------------------------
export const registerAdmin = createAsyncThunk(
  "auth/registerAdmin",
  async (formData, { rejectWithValue }) => {
    try {
      const data = await httpPost("api/auth/admin/register/", formData); // uses API_BASE internally
      console.log("Registration success:", data);
      return data;
    } catch (err) {
      console.error("Registration error:", err);
      return rejectWithValue(err);
    }
  }
);





// ---------------------------------------------------------
// 🔹 LOGIN USER
// ---------------------------------------------------------
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const data = await httpPost("api/auth/login/", { username, password });
      return data;
    } catch (err) {
      console.error("Login error:", err);
      return rejectWithValue(err);
    }
  }
);
// ---------------------------------------------------------
// 🔹 INITIAL STATE (PERSISTED USER + TOKEN)
// ---------------------------------------------------------

const storedUser = getFromStorage("user");
const storedToken = getFromStorage("token");
const storedRole = getFromStorage("role");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: storedUser || null,
    token: storedToken || null,
    role: storedRole || null,
    loading: false,
    error: null,
  },

  // -------------------------------------------------------
  // 🔹 NORMAL REDUCERS
  // -------------------------------------------------------
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      removeFromStorage("user");
      removeFromStorage("token");
      removeFromStorage("role");
    },
  },

  // -------------------------------------------------------
  // 🔹 EXTRA REDUCERS (Async Thunks)
  // -------------------------------------------------------
  extraReducers: (builder) => {
    // 🟡 LOGIN
    builder
  .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;

        // ✅ store data correctly
        state.user = action.payload.user;
        state.token = action.payload.tokens.access;
        state.role = action.payload.role;

        // ✅ persist in localStorage
        saveToStorage("user", action.payload.user);
        saveToStorage("token", action.payload.tokens.access);
        saveToStorage("role", action.payload.role);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      });

    // 🟢 REGISTER
    builder
      .addCase(registerAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user || null;
        state.token = action.payload.token || null;
      })
      .addCase(registerAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed";
      });
  },
});

// ---------------------------------------------------------
// 🔹 EXPORTS
// ---------------------------------------------------------
export const { logout } = authSlice.actions;
export default authSlice.reducer;
