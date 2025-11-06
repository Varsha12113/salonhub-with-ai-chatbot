import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getData, createData } from "../../config/httphandler";

/* ============================
   🔹 Fetch All Services
============================ */
export const fetchServices = createAsyncThunk("services/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const response = await getData("service");
    console.log("Fetched Services (raw):", response);
    // Normalize common shapes: [] or { data: [] } or { results: [] }
    if (Array.isArray(response)) return response;
    if (response && Array.isArray(response.data)) return response.data;
    if (response && Array.isArray(response.results)) return response.results;
    // try to find first array in object
    if (response && typeof response === 'object') {
      const arr = Object.values(response).find((v) => Array.isArray(v));
      if (arr) return arr;
    }
    // fallback: return empty array
    return [];
  } catch (error) {
    return rejectWithValue(error);
  }
});

/* ============================
   🔹 Add a New Service
============================ */
export const addService = createAsyncThunk("services/add", async (serviceData, { rejectWithValue }) => {
  try {
    const response = await createData("service", serviceData);
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

/* ============================
   🔹 Slice Definition
============================ */
const serviceSlice = createSlice({
  name: "services",
  initialState: {
    items: [],        // list of all services
    loading: false,
    error: null,
    success: false,   // for POST success state
  },
  reducers: {
    clearStatus: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ---- Fetch Services ----
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        console.log("✅ Service data received:", action.payload);
        state.items = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ---- Add Service ----
      .addCase(addService.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(addService.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.items.push(action.payload); // add new service to list
      })
      .addCase(addService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearStatus } = serviceSlice.actions;
export default serviceSlice.reducer;
