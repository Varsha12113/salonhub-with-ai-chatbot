import React from "react";
import { Link } from "react-router-dom";
import { FaFemale, FaMale, FaSearch, FaSpa, FaCut } from "react-icons/fa";

const Home = () => {
  return (
    <div className="w-full">

      {/* 🎀 Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-500 to-pink-500 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg">
            GlowupSalon – Look Stylish, Feel Confident
          </h1>
          <p className="mt-4 text-lg md:text-xl opacity-90">
            Book beauty & grooming services from top stylists
          </p>

          {/* ▶ CTA Buttons */}
          <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/services/female"
              className="bg-white text-purple-600 font-semibold px-6 py-3 rounded-xl shadow hover:bg-purple-100"
            >
              Explore Services
            </Link>
            <Link
              to="/login"
              className="bg-purple-800 text-white font-semibold px-6 py-3 rounded-xl shadow hover:bg-purple-900"
            >
              Book Now
            </Link>
          </div>
        </div>
      </section>

      {/* 🔍 Search Section */}
      <div className="max-w-4xl mx-auto mt-[-30px] shadow-lg bg-white p-5 rounded-2xl flex items-center gap-3">
        <FaSearch className="text-gray-500 text-xl" />
        <input
          type="text"
          placeholder="Search haircut, facial, grooming..."
          className="w-full outline-none text-gray-700"
        />
        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg">
          Search
        </button>
      </div>

      {/* 👩‍🦰👨 Category Section */}
      <section className="max-w-7xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">
          Choose Your Category
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Female */}
          <Link
            to="/services/female"
            className="relative group"
          >
            <img
              src="https://images.pexels.com/photos/3993473/pexels-photo-3993473.jpeg"
              alt="Female"
              className="w-full h-72 object-cover rounded-2xl shadow-md group-hover:shadow-2xl transition"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center rounded-2xl opacity-0 group-hover:opacity-100 transition">
              <FaFemale className="text-white text-5xl" />
              <h3 className="text-white text-2xl font-semibold mt-2">Female Services</h3>
            </div>
          </Link>

          {/* Male */}
          <Link
            to="/services/male"
            className="relative group"
          >
            <img
              src="https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg"
              alt="Male"
              className="w-full h-72 object-cover rounded-2xl shadow-md group-hover:shadow-2xl transition"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center rounded-2xl opacity-0 group-hover:opacity-100 transition">
              <FaMale className="text-white text-5xl" />
              <h3 className="text-white text-2xl font-semibold mt-2">Male Services</h3>
            </div>
          </Link>
        </div>
      </section>

      {/* ⭐ Popular Services */}
      <section className="bg-gray-50 py-16 px-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">
          Popular Services
        </h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

          <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
            <FaCut className="text-purple-500 text-3xl mb-3" />
            <h4 className="font-semibold text-lg">Hair Cut & Styling</h4>
            <p className="text-gray-500 text-sm mt-1">
              Professional haircut styles for all looks.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
            <FaSpa className="text-purple-500 text-3xl mb-3" />
            <h4 className="font-semibold text-lg">Facial & Cleanup</h4>
            <p className="text-gray-500 text-sm mt-1">
              Glow-boosting facial services.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
            <FaMale className="text-blue-500 text-3xl mb-3" />
            <h4 className="font-semibold text-lg">Men Grooming</h4>
            <p className="text-gray-500 text-sm mt-1">
              Beard shaping, trimming & more.
            </p>
          </div>
        </div>
      </section>

      {/* 💜 CTA Banner */}
      <section className="bg-purple-600 text-white py-16 px-6 text-center">
        <h2 className="text-4xl font-bold">Ready for a Makeover?</h2>
        <p className="mt-3 text-lg opacity-90">
          Book your favorite salon services with GlowupSalon
        </p>

        <Link
          to="/login"
          className="mt-6 inline-block bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold shadow hover:bg-purple-100"
        >
          Book Now
        </Link>
      </section>

    </div>
  );
};

export default Home;
