import React from "react";
import { addToCart } from "../../../utils/cart";
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";

const makeupServices = [
  {
    name: "Bridal Makeup",
    price: "₹12,000",
    description:
      "Complete bridal package with HD finish, hairstyle, and premium accessories.",
  },
  {
    name: "Party Makeup",
    price: "₹3,000",
    description: "Perfect for parties, evening events, and celebrations.",
  },
  {
    name: "Engagement Makeup",
    price: "₹6,000",
    description:
      "Elegant, camera-ready look for your special pre-wedding ceremonies.",
  },
  {
    name: "Natural Look Makeup",
    price: "₹2,000",
    description:
      "Soft, minimal makeup designed for a natural glowing finish.",
  },
  {
    name: "Airbrush Makeup",
    price: "₹8,000",
    description:
      "Flawless, long-lasting airbrush makeup for a luxury look.",
  },
  {
    name: "Photoshoot Makeup",
    price: "₹5,000",
    description:
      "Professional makeup for model, portfolio, or editorial shoots.",
  },
];

export default function Makeup() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* ---------- HERO SECTION ---------- */}
      <div className="relative text-center py-20 bg-gradient-to-r from-purple-600 via-purple-400 to-purple-500 shadow-lg">
        <h1 className="text-5xl font-bold text-white drop-shadow-xl mb-4">
          Makeup Services
        </h1>
        <p className="text-white text-lg max-w-2xl mx-auto">
          Experience the art of beauty with our luxury salon-grade makeup
          services.
        </p>
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-purple-300 to-purple-600"></div>
      </div>

      {/* ---------- SERVICE CARDS ---------- */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {makeupServices.map((service, index) => (
          <div
            key={index}
            className="group relative bg-white border border-grey-100 rounded-2xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            <div className="p-6 flex flex-col h-full">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2 ">
                {service.name}
              </h2>
              <p className="text-gray-600 mb-4 flex-grow">{service.description}</p>
              <p className="text-lg font-bold text-purple-600 mb-4">
                {service.price}
              </p>

              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => {
                    addToCart({ id: index, name: service.name, price: service.price, category: "makeup" });
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

            {/* subtle gradient border glow */}
           
          </div>
        ))}
      </div>
    </div>
  );
}
