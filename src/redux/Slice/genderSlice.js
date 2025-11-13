import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { httpGet, httpPost } from "../../config/httphandler";

// ✅ Base endpoint
const BASE_URL = "services/gender/";

// ✅ GET all genders
export const fetchGenders = createAsyncThunk(
  "gender/fetchGenders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await httpGet(BASE_URL);
      return response; // expected: array of genders
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// ✅ POST new gender
export const addGender = createAsyncThunk(
  "gender/addGender",
  async (genderData, { rejectWithValue }) => {
    try {
      const response = await httpPost(BASE_URL, genderData);
      return response; // expected: newly created gender
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// ✅ Slice
const genderSlice = createSlice({
  name: "gender",
  initialState: {
    genders: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearStatus: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // 🔹 Fetch
    builder
      .addCase(fetchGenders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGenders.fulfilled, (state, action) => {
        state.loading = false;
        state.genders = action.payload;
      })
      .addCase(fetchGenders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // 🔹 Add
    builder
      .addCase(addGender.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addGender.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.genders.push(action.payload);
      })
      .addCase(addGender.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { clearStatus } = genderSlice.actions;
export default genderSlice.reducer;
