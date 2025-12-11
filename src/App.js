import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/MainLayout.jsx";
import ProtectedRoute from "./routes/PrivateRoute.js";

// Pages & Components
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage.jsx";
import Contact from "./pages/Contact.jsx";
import Services from "./pages/Services.jsx";
import Booking from "./pages/Booking/Booking.jsx";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment.jsx";
import Dashboard from "./pages/Dashboard"
import UserRegister from "./pages/Registration";
import Register from "./pages/admin/AdminRegister.jsx";
import UserMainServices from "./components/services/UserMainServices.jsx";
import ChildServicesPage from "./pages/ChildServicesPage.jsx";
// import {BookingSuccess} from "./pages/Booking/Booking.jsx";



// Admin Pages
import AdminPanel from "./pages/admin/AdminPanel";
import AdminDashboard from "./pages/admin/AdminDashboard";

// import AddProvider from "./pages/admin/AddProvider";

import AdminOrders from "./pages/admin/AdminOrders.jsx";
import AdminCustomers from "./pages/admin/AdminCustomers.jsx";
import AdminServices from "./pages/admin/AdminServices.jsx";
import AdminAnalytics from "./pages/admin/AdminAnalytics.jsx";
import Scheduler from "./pages/admin/scheduler.jsx";

// User Pages
import UserPanel from "./pages/User/UserPanel.jsx";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* =============================
            🔓 Public routes
        ============================= */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        {/* Admin Registration */}
        <Route path="admin/register" element={<Register />} />

        {/* =============================
            Main layout wrapper
        ============================= */}
        <Route element={<MainLayout />}>
          {/* Public Pages */}
           <Route path="/" element={<LandingPage />} /> 
            
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/booking" element={<Booking />} />
          {/* <Route path="/booking-success" element={<BookingSuccess  />} /> */}
          {/* 🔹 Dynamic Child Services */}
         <Route path="/services/:gender" element={<UserMainServices />} />
         <Route path="/services/:gender/:mainId" element={<ChildServicesPage  />} />


          
        
          <Route path="/services" element={<Services />} />

          {/* =============================
              ✅ Protected Routes (User + Admin)
          ============================= */}
          <Route element={<ProtectedRoute allowedRoles={["user", "admin"]} />}>
            
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/dashboard" element={<Dashboard />} />
            
          </Route>

          {/* =============================
              ✅ Protected Admin Routes
          ============================= */}
          {/* <Route element={<ProtectedRoute allowedRoles={["admin"]} />}> */}
            <Route path="/admin" element={<AdminPanel />}>
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
{/*               
              <Route path="add-provider" element={<AddProvider />} /> */}
              
              <Route path="orders" element={<AdminOrders />} />
              <Route path="customers" element={<AdminCustomers />} />
              <Route path="services" element={<AdminServices />} />
              <Route path="analytics" element={<AdminAnalytics />} />
              <Route path="scheduler/*" element={<Scheduler />} />
            </Route>
          {/* </Route> */}

          {/* =============================
              ✅ Protected User Panel Routes
          ============================= */}
          {/* <Route element={<ProtectedRoute allowedRoles={["user"]} />}> */}
            <Route path="/user" element={<UserPanel />}>
              
              {/* <Route path="userregister" element={<Registration />} /> */}
            </Route>
          {/* </Route> */}

          {/* =============================
              Fallback route
          ============================= */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}




