// src/redux/Slice/schedulerSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { httpGet, httpPost } from "../../config/httphandler";

// ------------------- ASYNC THUNKS -------------------

// GET all SlotMasters
export const fetchSlotMasters = createAsyncThunk(
  "scheduler/fetchSlotMasters",
  async (_, { rejectWithValue }) => {
    try {
      const data = await httpGet("/api/scheduler/slotmasters/");
      return data;
    } catch (err) {
      return rejectWithValue(err.detail || err);
    }
  }
);

// POST a new SlotMaster
export const createSlotMaster = createAsyncThunk(
  "scheduler/createSlotMaster",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await httpPost("/api/scheduler/slotmasters/", payload);
      return data;
    } catch (err) {
      return rejectWithValue(err.detail || err);
    }
  }
);

// ------------------- SLICE -------------------
const schedulerSlice = createSlice({
  name: "scheduler",
  initialState: {
    slotMasters: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearSchedulerError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch SlotMasters
    builder.addCase(fetchSlotMasters.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchSlotMasters.fulfilled, (state, action) => {
      state.loading = false;
      state.slotMasters = action.payload;
    });
    builder.addCase(fetchSlotMasters.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Create SlotMaster
    builder.addCase(createSlotMaster.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createSlotMaster.fulfilled, (state, action) => {
      state.loading = false;
      state.slotMasters.push(action.payload);
    });
    builder.addCase(createSlotMaster.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { clearSchedulerError } = schedulerSlice.actions;
export default schedulerSlice.reducer;
