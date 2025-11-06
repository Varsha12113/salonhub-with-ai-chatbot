import React from "react";
import { addToCart } from "../../../utils/cart";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const beardTrimServices = [
  {
    name: "Classic Beard Trim",
    price: "₹400",
    description:
      "A clean and professional beard trim tailored to your face shape and style.",
  },
  {
    name: "Luxury Beard Grooming",
    price: "₹800",
    description:
      "Includes trimming, shaping, and hot towel treatment for a polished look.",
  },
  {
    name: "Beard Styling",
    price: "₹600",
    description:
      "Define your beard lines and style with precision cutting and shaping.",
  },
  {
    name: "Full Beard Shaping",
    price: "₹700",
    description:
      "Detailed shaping and contouring to give your beard a sharp and balanced finish.",
  },
  {
    name: "Beard + Facial Combo",
    price: "₹1,200",
    description:
      "A relaxing combo of beard trimming and facial cleansing for smooth, healthy skin.",
  },
  {
    name: "Express Beard Trim",
    price: "₹300",
    description:
      "Quick touch-up for maintaining your beard’s neat and tidy appearance.",
  },
];

export default function BeardTrim() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* ---------- HERO SECTION ---------- */}
      <div className="relative text-center py-20 bg-gradient-to-r from-purple-600 via-purple-400 to-purple-500 shadow-lg">
        <h1 className="text-5xl font-bold text-white drop-shadow-xl mb-4">
          Beard Trim Services
        </h1>
        <p className="text-white text-lg max-w-2xl mx-auto">
          Style, shape, and groom your beard with precision from our expert barbers.
        </p>
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-purple-300 to-purple-600"></div>
      </div>

      {/* ---------- SERVICE CARDS ---------- */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {beardTrimServices.map((service, index) => (
          <div
            key={index}
            className="group relative bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            <div className="p-6 flex flex-col h-full">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {service.name}
              </h2>
              <p className="text-gray-600 mb-4 flex-grow">{service.description}</p>
              <p className="text-lg font-bold text-purple-600 mb-4">
                {service.price}
              </p>

              {/* <div className="flex gap-2 mt-auto">
                <button
                  onClick={() => {
                    addToCart({ id: index, name: service.name, price: service.price, category: 'beard' });
                  }}
                  className="flex-1 px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 text-white font-medium shadow-md hover:scale-105 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FaShoppingCart className="text-lg" />
                  Add to Cart
                </button>
                <button onClick={() => navigate('/payment')} className="px-4 py-2 rounded-full border border-purple-200 text-purple-600 bg-white hover:bg-purple-50 transition">Book Now</button>
              </div> */}

                <div className="mt-auto w-full flex gap-2">
                              <button
                                onClick={() => {
                                  addToCart({ id: index, name: service.name, price: service.price, category: 'facial' });
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
    </div>
  );
}
