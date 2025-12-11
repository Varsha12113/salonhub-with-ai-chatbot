import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { httpGet, httpPost } from "../../config/httphandler"; // or axios/fetch

// GET /api/booking/admin/notifications/
export const fetchAdminNotifications = createAsyncThunk(
  "adminNotifications/fetchAll",
  
  async (_, { rejectWithValue }) => {
    try {
      const res = await httpGet("/api/booking/admin/notifications/");
      return res;                // [{ id, booking_id, message, created_at, status }]
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to load notifications");
    }
  }
);

// POST /api/booking/admin/accept/
export const acceptBooking = createAsyncThunk(
  "adminNotifications/acceptBooking",
  async (bookingId, { rejectWithValue }) => {
    try {
      const res = await httpPost("/api/booking/admin/accept/", {
        booking_id: bookingId,
      });
      // res = { detail: "Booking confirmed" }
      return { bookingId, detail: res.detail };
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to accept booking");
    }
  }
);

// POST /api/booking/admin/decline/
export const declineBooking = createAsyncThunk(
  "adminNotifications/declineBooking",
  async (bookingId, { rejectWithValue }) => {
    try {
      const res = await httpPost("/api/booking/admin/decline/", {
        booking_id: bookingId,
      });
      // res = { detail: "Booking declined and slots freed" }
      return { bookingId, detail: res.detail };
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to decline booking");
    }
  }
);

const adminNotificationsSlice = createSlice({
  name: "adminNotifications",
  initialState: {
    items: [],          // notifications array from GET
    loading: false,
    error: null,
    actionLoading: false, // for accept/decline buttons
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ----- fetchAll -----
      .addCase(fetchAdminNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchAdminNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ----- acceptBooking -----
      .addCase(acceptBooking.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(acceptBooking.fulfilled, (state, action) => {
        state.actionLoading = false;
        const { bookingId } = action.payload;
        const notif = state.items.find((n) => n.booking_id === bookingId);
        if (notif) notif.status = "accepted"; // or "confirmed"
      })
      .addCase(acceptBooking.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      // ----- declineBooking -----
      .addCase(declineBooking.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(declineBooking.fulfilled, (state, action) => {
        state.actionLoading = false;
        const { bookingId } = action.payload;
        const notif = state.items.find((n) => n.booking_id === bookingId);
        if (notif) notif.status = "declined";
      })
      .addCase(declineBooking.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      });
  },
});

export default adminNotificationsSlice.reducer;
