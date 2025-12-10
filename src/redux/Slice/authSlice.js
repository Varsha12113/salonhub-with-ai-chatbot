import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { httpPost } from "../../config/httphandler";
import { saveToStorage, getFromStorage, removeFromStorage } from "../store/storage";

// ---------------------------------------------------------
// 🔹 LOGIN BASED on ROLE_ID
// ---------------------------------------------------------
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email_or_username, password }, { rejectWithValue }) => {
    try {
      const data = await httpPost("/api/auth/login/", {
        email_or_username,
        password,
      });

      // Save tokens to localStorage for interceptor
      localStorage.setItem("token", data.access);
      localStorage.setItem("refreshToken", data.refresh);

      return data;
    } catch (err) {
      console.error("Login error:", err);
      return rejectWithValue(err.detail || "Network error");
    }
  }
);

// ---------------------------------------------------------
// 🔹 LOGOUT USER
// ---------------------------------------------------------
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const refresh = getFromStorage("refreshToken");
      
      if (!refresh) {
        return { detail: "No refresh token" };
      }

      const data = await httpPost("/api/auth/logout/", { refresh });
      // { detail: "Logout successful" }
      return data;
    } catch (err) {
      console.error("Logout error:", err);
      return rejectWithValue(err.detail || "Logout failed");
    }
  }
);



// ---------------------------------------------------------
// 🔹 REGISTER ADMIN
// ---------------------------------------------------------
export const registerAdmin = createAsyncThunk(
  "auth/registerAdmin",
  async (formData, { rejectWithValue }) => {
    try {
      const data = await httpPost("/api/auth/admin/register/", formData);
      return data;
    } catch (err) {
      console.error("Registration error:", err);
      return rejectWithValue(err.detail || "Registration failed");
    }
  }
);

// ---------------------------------------------------------
// 🔹 REGISTER USER
// ---------------------------------------------------------
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const data = await httpPost("/api/auth/register/", formData);
      return data;
    } catch (err) {
      console.error("Registration error:", err);
      return rejectWithValue(err.detail || "Registration failed");
    }
  }
);

// ---------------------------------------------------------
// 🔹 INITIAL STATE
// ---------------------------------------------------------
const storedUser = getFromStorage("user");
const storedToken = getFromStorage("token");

const storedRole = getFromStorage("role") || null;


const initialState = {
  user: storedUser || null,
  token: storedToken || null,
  role: storedRole,
  loading: false,
  error: null,
};

// ---------------------------------------------------------
// 🔹 SLICE
// ---------------------------------------------------------
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      state.loading = false;
      state.error = null;

      removeFromStorage("user");
      removeFromStorage("token");
      removeFromStorage("refreshToken");
      removeFromStorage("role");
    },
  },
  extraReducers: (builder) => {
    // 🟡 LOGIN
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
    state.loading = false;
    state.user = action.payload.user;
    state.token = action.payload.access;

   // backend already gives "admin" or "user"
  const roleName = action.payload.user.role;      // <-- use directly
  state.role = roleName;

    saveToStorage("user", action.payload.user);
    saveToStorage("token", action.payload.access);
    saveToStorage("refreshToken", action.payload.refresh);
    saveToStorage("role", roleName);   // 🔥 store string instead of number
})

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      });

    // 🟢 REGISTER ADMIN
    builder
      .addCase(registerAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
   .addCase(registerAdmin.fulfilled, (state, action) => {
  state.loading = false;
  state.user = action.payload.user || null;
  state.token = action.payload.access || null;

  const roleName = action.payload.user?.role;     // "admin"
  state.role = roleName;
  saveToStorage("role", roleName);
})


      
      .addCase(registerAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed";
      });

    // 🔵 REGISTER USER
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
  state.loading = false;
  state.user = action.payload.user || null;
  state.token = action.payload.access || null;

  const roleName = action.payload.user?.role;     // "user"
  state.role = roleName;
  saveToStorage("role", roleName);
})

      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed";
      })


   .addCase(logoutUser.fulfilled, (state) => {
      // same cleanup as logout reducer
      state.user = null;
      state.token = null;
      state.role = null;
      state.loading = false;
      state.error = null;

      removeFromStorage("user");
      removeFromStorage("token");
      removeFromStorage("refreshToken");
      removeFromStorage("role");
    })
    .addCase(logoutUser.rejected, (state, action) => {
      // even if API fails, clear local auth
      state.user = null;
      state.token = null;
      state.role = null;
      state.loading = false;
      state.error = action.payload || "Logout failed";
      removeFromStorage("user");
      removeFromStorage("token");
      removeFromStorage("refreshToken");
      removeFromStorage("role");
    })
 }
});
// ---------------------------------------------------------
// 🔹 EXPORTS
// ---------------------------------------------------------
export const { logout } = authSlice.actions;

// Selectors
export const selectCurrentUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectRole = (state) => state.auth.role;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;
