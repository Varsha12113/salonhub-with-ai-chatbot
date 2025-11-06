import React from "react";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import ReviewSection from "./ReviewSection";

export default function LandingPage() {
  return (
    <div>
  <HeroSection />
      <AboutSection/>
      <ReviewSection />
      


    </div>
//     <div className="min-h-screen flex flex-col font-sans bg-gray-50">
//       {/* ---------- NAVBAR ---------- */}
//    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
//   <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
    
//     {/* Logo + App Name */}
//     <div className="flex items-center space-x-3">
//       <img
//         src="/logo.png"
//         alt="Logo"
//         className="w-10 h-10 object-contain"
//       />
//       <h1 className="text-2xl font-bold text-gray-800">
//         Appointment<span className="text-blue-500">Booking App</span>
//       </h1>
//     </div>

//     {/* Hamburger for mobile */}
//     <button
//       className="md:hidden text-gray-700 text-2xl focus:outline-none"
//       onClick={() => setMenuOpen(!menuOpen)}
//     >
//       ☰
//     </button>

//     {/* Menu Items */}
//   {/* Menu Items */}
// <ul
//   className={`${
//     menuOpen ? "block" : "hidden"
//   } md:flex md:items-center md:space-x-8 text-gray-700 font-medium`}
// >
//   <li className="my-2 md:my-0">
//     <a href="#home" className="hover:text-blue-500">Home</a>
//   </li>
//   <li className="my-2 md:my-0">
//     <a href="#services" className="hover:text-blue-500">Services</a>
//   </li>
//   <li className="my-2 md:my-0">
//     <a href="#about" className="hover:text-blue-500">About</a>
//   </li>
//   <li className="my-2 md:my-0">
//     <a href="#contact" className="hover:text-blue-500">Contact</a>
//   </li>

//   {/* Styled Login button beside Contact */}
//   <li className="my-2 md:my-0">
//     <button
//   onClick={() => navigate("/login")}
//   className="relative overflow-hidden px-6 py-2 rounded-md font-semibold text-white bg-gradient-to-r from-blue-500 to-pink-300 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
// >
//   <span className="relative z-10">Login</span>
//   <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-500 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
// </button>

//   </li>
// </ul>

//   </div>
// </nav>


//       {/* ---------- HERO SECTION ---------- */}
//       <section
//         id="home"
//         className="relative flex-1 flex flex-col justify-center items-center text-center text-white"
//       >
        
//         <div className="absolute inset-0 bg-blue-900 bg-opacity-80"></div>

//         <div className="relative z-10 max-w-2xl px-4">
//           <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
//             Book Your Appointment Online
//           </h1>
//           <p className="text-lg md:text-xl mb-8 text-gray-200">
//             Connect with top doctors and healthcare providers anytime, anywhere.
//             Skip the queue — schedule appointments in seconds.
//           </p>
//         <button
//           onClick={() => navigate("/register")}
//           className="relative overflow-hidden px-6 py-2 rounded-md font-semibold text-white bg-gradient-to-r from-blue-500 to-pink-300 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
//         >
//           <span className="relative z-10">Connect</span>
//           <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-500 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
//         </button>


//         </div>
//       </section>

//       {/* ---------- SERVICES SECTION ---------- */}
//      <section
//   id="services"
//   className="relative py-16 px-6 text-center border-t border-gray-200 overflow-hidden"
// >
//   {/* Background Video */}
//   <video
//     autoPlay
//     loop
//     muted
//     playsInline
//     className="absolute inset-0 w-full h-full object-cover"
//     src="/hospital.mp4"
//     type="video/mp4"
//   />

//   {/* Overlay for readability */}
//   <div className="absolute inset-0 bg-white bg-opacity-70"></div>

//   {/* Foreground Content */}
//   <div className="relative z-10 max-w-6xl mx-auto">
//     <h2 className="text-3xl font-bold text-gray-800 mb-10">Why Choose Us?</h2>

//     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//       <div className="bg-gray-50 shadow-md p-6 rounded-xl hover:shadow-lg transition">
//         <FaCalendarCheck className="text-blue-500 text-4xl mx-auto mb-4" />
//         <h3 className="text-xl font-semibold mb-2">Easy Appointments</h3>
//         <p className="text-gray-600">
//           Book, reschedule, or cancel appointments instantly with just a few clicks.
//         </p>
//       </div>

//       <div className="bg-gray-50 shadow-md p-6 rounded-xl hover:shadow-lg transition">
//         <FaUserMd className="text-blue-500 text-4xl mx-auto mb-4" />
//         <h3 className="text-xl font-semibold mb-2">Qualified Doctors</h3>
//         <p className="text-gray-600">
//           Connect with verified healthcare professionals across multiple specialties.
//         </p>
//       </div>

//       <div className="bg-gray-50 shadow-md p-6 rounded-xl hover:shadow-lg transition">
//         <FaClock className="text-blue-500 text-4xl mx-auto mb-4" />
//         <h3 className="text-xl font-semibold mb-2">24/7 Availability</h3>
//         <p className="text-gray-600">
//           Access consultations and support whenever you need it — day or night.
//         </p>
//       </div>
//     </div>
//   </div>
// </section>

//       {/* ---------- CONTACT SECTION ---------- */}
//       <section
//         id="contact"
//         className="py-16 px-6 bg-blue-600 text-white text-center"
//       >
//         <h2 className="text-3xl font-bold mb-6">Need Assistance?</h2>
//         <p className="text-lg mb-6">
//           Our team is here to help you 24/7. Contact us anytime.
//         </p>
//         <div className="flex justify-center items-center gap-3 text-lg">
//           <FaPhoneAlt />
//           <span>+91 98765 43210</span>
//         </div>
//       </section>

//       {/* ---------- FOOTER ---------- */}
//       <Footer />
//     </div>
  );
}
