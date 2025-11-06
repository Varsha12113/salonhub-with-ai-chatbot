import React from "react";
import { addToCart } from "../../../utils/cart";
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";

const waxingServices = [
  {
    name: "Full Body Waxing",
    price: "₹2,000",
    description:
      "A complete body waxing session for smooth, radiant, and hair-free skin using premium wax.",
  },
  {
    name: "Half Arms & Legs",
    price: "₹900",
    description:
      "Gentle waxing for arms and legs, leaving your skin soft and silky smooth.",
  },
  {
    name: "Underarm Wax",
    price: "₹400",
    description:
      "Quick and painless underarm waxing for clean, fresh, and smooth skin.",
  },
  {
    name: "Face Waxing",
    price: "₹600",
    description:
      "Removes unwanted facial hair and dead skin for a bright, even-toned look.",
  },
  {
    name: "Bikini Wax",
    price: "₹1,200",
    description:
      "Expert care and hygiene-focused bikini waxing for confidence and comfort.",
  },
  {
    name: "Back & Shoulder Wax",
    price: "₹1,000",
    description:
      "Get smooth and fresh skin with our gentle back and shoulder waxing service.",
  },
];

export default function Waxing() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* ---------- HERO SECTION ---------- */}
      <div className="relative py-24 text-center bg-gradient-to-r from-purple-600 via-purple-400 to-purple-500 shadow-xl overflow-hidden">
        {/* Background overlay */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581579184681-1e0e8f56abf0?auto=format&fit=crop&w=1500&q=80')] bg-cover bg-center opacity-20"></div>

        <div className="relative z-10">
          <h1 className="text-5xl font-extrabold text-white drop-shadow-2xl mb-4">
            Waxing Services
          </h1>
          <p className="text-white text-lg max-w-3xl mx-auto">
            Smooth, glowing, and confidence-boosting waxing services tailored
            just for you.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-purple-300 to-purple-600"></div>
      </div>

      {/* ---------- FEATURED TAGLINE ---------- */}
      <div className="text-center mt-12 px-4">
        <h2 className="text-3xl font-semibold text-gray-800">
          “Feel Fresh. Feel Confident. Feel Beautiful ✨”
        </h2>
        <p className="text-gray-500 mt-2">
          Our gentle and precise waxing ensures a smooth, flawless finish every
          time.
        </p>
      </div>

      {/* ---------- SERVICE CARDS ---------- */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {waxingServices.map((service, index) => (
          <div
            key={index}
            className="group relative bg-white/60 backdrop-blur-md border border-purple-100 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>

            <div className="relative p-6 flex flex-col h-full">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {service.name}
              </h2>
              <p className="text-gray-600 mb-4 flex-grow">
                {service.description}
              </p>
              <p className="text-lg font-bold text-purple-600 mb-4">
                {service.price}
              </p>

              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => {
                    addToCart({ id: index, name: service.name, price: service.price, category: "waxing" });
                  }}
                  className="flex-1 px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 text-white font-medium shadow-md hover:scale-105 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FaShoppingCart className="text-lg" />
                  Add to Cart
                </button>
                <button
                  onClick={() => navigate('/booking')}
                  className="px-4 py-2 rounded-full border border-purple-200 text-purple-600 bg-white hover:bg-purple-50 transition"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ---------- CALL TO ACTION ---------- */}
      <div className="text-center pb-20">
        <button className="px-10 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white text-lg font-semibold rounded-full shadow-lg hover:scale-110 hover:shadow-2xl transition-all duration-300 flex items-center gap-2 mx-auto">
          <FaShoppingCart className="text-lg" />
          Add Services to Cart 💆‍♀️
        </button>
      </div>
    </div>
  );
}
