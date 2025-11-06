import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout.jsx";
import Dashboard from "./pages/Dashboard";
import CalendarView from "./pages/CalendarView";
import AdminPanel from "./pages/admin/AdminPanel";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Appointments from "./pages/admin/Appointments";
import AddProvider from "./pages/admin/AddProvider";
import ProviderList from "./pages/admin/ProviderList";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import LandingPage from "./pages/LandingPage";
// removed unused state and axios fetch (not used in the app currently)
import AboutPage from "./pages/AboutPage.jsx";
import Hair from "./components/services/femaleservices/Hair.jsx";
import Payment from "./pages/Payment.jsx";
import  Makeup  from "./components/services/femaleservices/Makeup.jsx";
import Waxing from "./components/services/femaleservices/Waxing.jsx";
import Bridal from "./components/services/femaleservices/Bridal.jsx";
import  Beardtrim  from "./components/services/maleservices/Beardtrim.jsx";
import MaleBridal from "./components/services/maleservices/Bridal.jsx";
import Facial  from "./components/services/maleservices/Facial.jsx"
import MalePedicuremanicure from "./components/services/maleservices/Pedicuremanicure.jsx";
import FemalePedicureManicure from "./components/services/femaleservices/Pedicuremanicure.jsx";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact.jsx";
import Booking from "./pages/Booking/Booking.jsx";
import Services from "./pages/Services.jsx";
import HairMale from "./components/services/maleservices/HairMale.jsx";

export default function App() {

  return (

    <BrowserRouter>
      <Routes>
        {/* Public routes outside MainLayout */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />

        {/* Routes with MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
           <Route path="/contact" element={<Contact />} />
          
          {/* Female Services */}
          <Route path="/services/female/hair" element={<Hair />} />
          <Route path="/services/female/makeup" element={<Makeup />} />
          <Route path="/services/female/waxing" element={<Waxing />} />
          <Route path="/services/female/manicure-pedicure" element={<FemalePedicureManicure />} />
          <Route path="/services/female/bridal" element={<Bridal />} />
          
           <Route path="/booking" element={<Booking />} />

          {/* Male Services */}
          {/* male compo */}
          {/* <Route path="/services/male/hair" element={<Hair />} /> */}

          <Route path="/services/male/hair" element={<HairMale />} />
          <Route path="/services/male/facial" element={<Facial />} />
          <Route path="/services/male/beard-trim" element={<Beardtrim />} />
          <Route path="/services/male/bridal" element={<MaleBridal />} />
          <Route path="/services/male/manicure-pedicure" element={<MalePedicuremanicure />} />
          
          <Route path="/services" element={<Services />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<Payment />} />

          <Route path="/booking" element={<Booking />} />


          {/* Admin Panel Routes */}
          <Route path="admin" element={<AdminPanel />}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="add-provider" element={<AddProvider />} />
            <Route path="providers" element={<ProviderList />} />
          </Route>

          {/* User Dashboard Routes */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="calendar" element={<CalendarView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
