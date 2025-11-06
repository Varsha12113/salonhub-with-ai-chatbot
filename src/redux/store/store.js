import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Slice/authSlice";
import bookingReducer from "../Slice/bookingSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    booking: bookingReducer,
  },
});
