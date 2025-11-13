import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Slice/authSlice";
import bookingReducer from "../Slice/bookingSlice";
import serviceReducer from "../Slice/serviceSlice";
import genderReducer from "../Slice/genderSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    booking: bookingReducer,
    services: serviceReducer, 
    gender: genderReducer,
  },
});
