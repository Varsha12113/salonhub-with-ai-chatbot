import React from "react";
import { addToCart } from "../../../utils/cart";
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";

const makeupServices = [
  {
    name: "Customized Facials",
    price: "₹12,000",
    description:
      "Our customized facials are tailored to your skin type and specific concerns. Whether you have dry skin, oily skin, acne-prone skin, or mature skin, our estheticians will assess your needs and create a facial treatment to cleanse, exfoliate, and hydrate your skin, leaving it refreshed and rejuvenated..",
  },
  {
    name: "Detan",
    price: "₹3,000",
    description: "At Glowup, our facial options cater to all skin types. We use minerals and nutrient-rich products that reduce spots and wrinkles, remove dead skin, and give the skin a youthful appearance. Black mud, fruity elements, vitamins, enzymes, gold, and anti-oxidants play a vital role in our facial ingredients.",
  },
  {
    name: "Gentle Exfoliation",
    price: "₹6,000",
    description:
      "We perform gentle exfoliation to remove dead skin cells and promote cell turnover, revealing a smoother and brighter complexion..",
  },
  {
    name: "Hydrating and Nourishing Treatments",
    price: "₹2,000",
    description:
      "For dry or dehydrated skin, we offer treatments that focus on providing deep hydration and nourishment to restore your skin's moisture balance.",
  },
  {
    name: "Face Mask",
    price: "₹8,000",
    description:
      "we offer a luxurious and rejuvenating experience with our customized facial masks designed to tackle various skin concerns for all skin types. Our team of skilled estheticians is dedicated to providing you with the ultimate pampering session, leaving your skin refreshed, nourished, and glowing.",
  },
  {
    name: " Face cleanup",
    price: "₹5,000",
    description:
      " goal is to help you achieve healthy, radiant skin that boosts your confidence and enhances your natural beauty. Whether you're looking for a relaxing facial or need specific solutions for skin concerns, our team is dedicated to providing the best possible care and results for your skin..",
  },
];

export default function Makeup() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* ---------- HERO SECTION ---------- */}
      <div className="relative text-center py-20 bg-gradient-to-r from-purple-600 via-purple-400 to-purple-500 shadow-lg">
        <h1 className="text-5xl font-bold text-white drop-shadow-xl mb-4">
          Skin care Services
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
