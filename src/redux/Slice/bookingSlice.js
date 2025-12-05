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

// ================================================================
// 📌 Slice
// ================================================================
const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    loading: false,
    error: null,
    successMessage: null,
  },

  reducers: {
    resetCheckout: (state) => {
      state.loading = false;
      state.error = null;
      state.successMessage = null;
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
      })

      // ==================== Rejected ====================
      .addCase(checkoutBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Checkout failed.";
      });
  },
});

export const { resetCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer;
