import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/httphandler"; // your axios instance

// =========================================================
// 1️⃣ GET Gender List (Public API)
// GET: /api/services/user/genders/
// =========================================================
export const getGenders = createAsyncThunk(
  "gender/getGenders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/api/services/user/genders/");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching genders");
    }
  }
);

// =========================================================
// 2️⃣ CREATE Main Service Under a Gender (Admin API)
// POST: /api/services/admin/gender/:genderId/main/
// Body: { main_services_name, main_services_description }
// =========================================================
export const createMainService = createAsyncThunk(
  "gender/createMainService",
  async ({ genderId, data }, { rejectWithValue }) => {
    try {
      const res = await api.post(
        `/api/services/admin/gender/${genderId}/main/`,
        data
      );
      return res.data;
    } catch (error) {
      console.log("CREATE MAIN SERVICE ERROR:", error.response);
return rejectWithValue(error);
    }
  }
);

// =========================================================
// 3️⃣ GET Main Services Under Gender
// GET: /api/services/user/main/?gender_id=2
// =========================================================
export const getMainServices = createAsyncThunk(
  "gender/getMainServices",
  async (genderId, { rejectWithValue }) => {
    try {
      const res = await api.get(
        `/api/services/user/main/?gender_id=${genderId}`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error fetching main services"
      );
    }
  }
);

// =========================================================
// SLICE
// =========================================================
const genderSlice = createSlice({
  name: "gender",
  initialState: {
    genders: [],
    mainServices: [],
    loading: false,
    error: null,
    successMessage: null,
  },

  extraReducers: (builder) => {
    // 📌 GET GENDERS
    builder
      .addCase(getGenders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getGenders.fulfilled, (state, action) => {
        state.loading = false;
        state.genders = action.payload;
      })
      .addCase(getGenders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // 📌 CREATE MAIN SERVICE
    builder
      .addCase(createMainService.pending, (state) => {
        state.loading = true;
      })
      .addCase(createMainService.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(createMainService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // 📌 GET MAIN SERVICES LIST
    builder
      .addCase(getMainServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMainServices.fulfilled, (state, action) => {
        state.loading = false;
        state.mainServices = action.payload;
      })
      .addCase(getMainServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default genderSlice.reducer;
