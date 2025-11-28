import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { httpGet, httpPost } from "../../config/httphandler";

// Fetch slot masters
export const getSlotMasters = createAsyncThunk(
  "scheduler/getSlotMasters",
  async (_, { rejectWithValue }) => {
    try {
      const data = await httpGet("/api/scheduler/slotmasters/");
      return data;
    } catch (err) {
      return rejectWithValue(err?.detail || err?.message || "Failed to fetch slot masters");
    }
  }
);

// Create a slot master
export const createSlotMaster = createAsyncThunk(
  "scheduler/createSlotMaster",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await httpPost("/api/scheduler/slotmasters/", payload);
      return data;
    } catch (err) {
      return rejectWithValue(err?.detail || err?.message || "Failed to create slot master");
    }
  }
);

const schedulerSlice = createSlice({
  name: "scheduler",
  initialState: {
    slotMasters: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearSchedulerError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSlotMasters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSlotMasters.fulfilled, (state, action) => {
        state.loading = false;
        state.slotMasters = action.payload || [];
      })
      .addCase(getSlotMasters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error?.message;
      })

      .addCase(createSlotMaster.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSlotMaster.fulfilled, (state, action) => {
        state.loading = false;
        // append created slot master
        if (action.payload) state.slotMasters.push(action.payload);
      })
      .addCase(createSlotMaster.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error?.message;
      });
  },
});

export const { clearSchedulerError } = schedulerSlice.actions;
export default schedulerSlice.reducer;
