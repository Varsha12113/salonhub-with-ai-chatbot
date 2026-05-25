// src/redux/slices/checkoutSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/httphandler"; 
import { initiatePayment } from "../../hooks/useRazorpay";
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

// ── New thunk ──
export const startRazorpayPayment = createAsyncThunk(
  "checkout/startRazorpayPayment",
  async (bookingId, { rejectWithValue }) => {
    return new Promise((resolve, reject) => {
      initiatePayment({
        bookingId,
        onSuccess: (result) => resolve(result),
        onFailure: (msg)   => reject(rejectWithValue(msg)),
      });
    });
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
    paymentLoading: false,   // ← new
    error: null,
    successMessage: null,
    bookingData: null,
    paymentData:    null,    // ← new 
  },

  reducers: {
    resetCheckout: (state) => {
      state.loading = false;
      state.paymentLoading = false;
      state.error = null;
      state.successMessage = null;
      state.bookingData = null; 
      state.paymentData = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // ==================== Pending ====================
      .addCase(checkoutBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
        
      })

      // ==================== Fulfilled ====================
      .addCase(checkoutBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "Booking created!";
        state.bookingData = action.payload;  
      })

      // ==================== Rejected ====================
      .addCase(checkoutBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Checkout failed.";
      })

    // ==================== Razorpay payment ====================
    .addCase(startRazorpayPayment.pending, (state) => {
      state.paymentLoading = true;
      state.error          = null;
    })
    .addCase(startRazorpayPayment.fulfilled, (state, action) => {
      state.paymentLoading = false;
      state.successMessage = "Payment successful!";
      state.paymentData    = action.payload;
    })
    .addCase(startRazorpayPayment.rejected, (state, action) => {
      state.paymentLoading = false;
      state.error          = action.payload || "Payment failed.";
    })

    .addCase(fetchBookingHistory.pending, (state) => {
      state.loading = true;
      state.error   = null;
    })
    .addCase(fetchBookingHistory.fulfilled, (state, action) => {
      state.loading        = false;
      state.bookingHistory = action.payload;
    })
    .addCase(fetchBookingHistory.rejected, (state, action) => {
      state.loading = false;
      state.error   = action.payload;
    });
    
      
    // // ==================== Booking History ====================
    // .addCase(fetchBookingHistory.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(fetchBookingHistory.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.bookingHistory = action.payload; // store list
    // })
    // .addCase(fetchBookingHistory.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // })
  },
});

export const { resetCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer;
