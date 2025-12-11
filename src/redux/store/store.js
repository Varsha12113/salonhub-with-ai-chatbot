import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Slice/authSlice";
import checkoutReducer from "../Slice/bookingSlice";
import serviceReducer from "../Slice/serviceSlice";
import genderReducer from "../Slice/genderSlice";
import schedulerReducer from "../Slice/schedulerSlice";
import userServiceReducer from "../Slice/userSlice";
import adminNotificationsReducer from "../Slice/adminNotificationsSlice";
  
export const store = configureStore({
  reducer: {
    auth: authReducer,
    services: serviceReducer, 
    gender: genderReducer,
    scheduler: schedulerReducer,
    userServices: userServiceReducer,
    checkout: checkoutReducer,
    adminNotifications: adminNotificationsReducer,
    
  },
});
