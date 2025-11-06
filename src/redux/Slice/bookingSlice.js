import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Fetch gender list
export const fetchGenders = createAsyncThunk("booking/fetchGenders", async () => {
  const res = await axios.get("http://127.0.0.1:8000/api/gender/");
  return res.data;
});

// ✅ Fetch user details (username, email, contact, date, time)
export const fetchUserDetails = createAsyncThunk(
  "booking/fetchUserDetails",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access");
      if (!token) return rejectWithValue("No token found");

      const res = await axios.get("http://127.0.0.1:8000/api/user/profile/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Submit booking
export const submitBooking = createAsyncThunk(
  "booking/submitBooking",
  async (bookingData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access");
      const res = await axios.post("http://127.0.0.1:8000/api/booking/", bookingData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    genders: [],
    user: {},
    status: "idle",
    error: null,
    successMessage: "",
  },
  reducers: {
    clearSuccess(state) {
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGenders.fulfilled, (state, action) => {
        state.genders = action.payload;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(submitBooking.fulfilled, (state) => {
        state.successMessage = "🎉 Appointment booked successfully!";
      })
      .addCase(submitBooking.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearSuccess } = bookingSlice.actions;
export default bookingSlice.reducer;
