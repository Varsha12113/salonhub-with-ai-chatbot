import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Contact() {
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agree) {
      setError("You must agree to the Terms and Conditions before submitting.");
      return;
    }
    setError("");
    alert("Message sent successfully!");
  };

  return (
  <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* ---------- HERO SECTION ---------- */}
  <div className="relative text-center py-20 bg-gradient-to-r from-purple-600 via-purple-400 to-purple-500 shadow-lg overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600180758890-6c2ef26a3c4c?auto=format&fit=crop&w=1500&q=80')] bg-cover bg-center opacity-20"></div>

        <div className="relative z-10">
          <h1 className="text-5xl font-extrabold text-white drop-shadow-2xl mb-4">
            Contact Us
          </h1>
          <p className="text-white text-lg max-w-2xl mx-auto">
            Have questions or want to book an appointment? We’d love to hear from you!
          </p>
        </div>
      </div>

      {/* ---------- CONTACT INFO ---------- */}
        <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-10 text-center">
        <div className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-xl transition-all">
          <FaPhoneAlt className="text-purple-600 text-4xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Phone</h3>
          <p className="text-gray-600">+91 98765 43210</p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-xl transition-all">
          <FaEnvelope className="text-purple-600 text-4xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Email</h3>
          <p className="text-gray-600">info@yourbeautysalon.com</p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-xl transition-all">
          <FaMapMarkerAlt className="text-purple-600 text-4xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Location</h3>
          <p className="text-gray-600">
            123 Blossom Street, Indiranagar, Bangalore
          </p>
        </div>
      </div>

      {/* ---------- CONTACT FORM ---------- */}
      <div className="max-w-4xl mx-auto px-6 pb-20">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
            Send Us a Message 💌
          </h2>

          <form className="grid md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <input
              type="text"
              placeholder="Subject"
              className="md:col-span-2 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <textarea
              rows="5"
              placeholder="Your Message"
              className="md:col-span-2 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            ></textarea>

            {/* ---------- TERMS AND CONDITIONS INSIDE FORM ---------- */}
            <div className="md:col-span-2 bg-purple-50 border border-purple-200 rounded-xl p-4 text-gray-700 text-sm leading-relaxed">
              <h3 className="text-purple-600 font-semibold mb-2 text-lg">
                Terms & Conditions
              </h3>
              <p className="text-gray-600 mb-3">
                By contacting us or booking an appointment, you agree to our terms
                and conditions. Please ensure all information you provide is accurate.
                Appointment timings are subject to availability. Cancellations should
                be made at least 24 hours in advance. We respect your privacy and ensure
                your personal information remains confidential.
              </p>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  className="w-4 h-4 text-purple-500 focus:ring-purple-400 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="text-gray-700 text-sm">
                  I have read and agree to the Terms and Conditions
                </label>
              </div>

              {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
              )}
            </div>

            <button
              type="submit"
              className="md:col-span-2 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold rounded-full shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
