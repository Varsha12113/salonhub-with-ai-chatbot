// src/redux/slices/checkoutSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/httphandler"; 

// ================================================================
// 📌 POST — Checkout Booking
// ================================================================
export const checkoutBooking = createAsyncThunk(
  "checkout/checkoutBooking",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/booking/checkout/", payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Checkout failed. Try again."
      );
    }
  }
);



export const fetchBookingHistory = createAsyncThunk(
  "booking/fetchBookingHistory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/booking/checkout/");
      return response.data; // <-- booking list
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load booking history"
      );
    }
  }
);







// ================================================================
// 📌 Slice
// ================================================================
const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    loading: false,
    error: null,
    successMessage: null,
     bookingData: null, 
  },

  reducers: {
    resetCheckout: (state) => {
      state.loading = false;
      state.error = null;
      state.successMessage = null;
        state.bookingData = null; 
    },
  },

  extraReducers: (builder) => {
    builder
      // ==================== Pending ====================
      .addCase(checkoutBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })

      // ==================== Fulfilled ====================
      .addCase(checkoutBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "Booking Confirmed!";
         state.bookingData = action.payload;  
      })

      // ==================== Rejected ====================
      .addCase(checkoutBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Checkout failed.";
      })

      // ==================== Booking History ====================
    .addCase(fetchBookingHistory.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchBookingHistory.fulfilled, (state, action) => {
      state.loading = false;
      state.bookingHistory = action.payload; // store list
    })
    .addCase(fetchBookingHistory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })


  },
});

export const { resetCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer;
