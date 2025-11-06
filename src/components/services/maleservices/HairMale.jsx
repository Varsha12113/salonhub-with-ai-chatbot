import React from "react";
import { FaSpa, FaPaintBrush, FaWind, FaShoppingCart } from "react-icons/fa";
import { FaScissors } from "react-icons/fa6";
import { addToCart } from "../../../utils/cart";
import { useNavigate } from 'react-router-dom';

export default function Hair() {
  const navigate = useNavigate();
  const services = [
    {
      id: 1,
      name: "Haircut & Styling",
      desc: "Trendy haircuts and signature blow-dries tailored to your style.",
      img: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=800&q=80",
      icon: <FaScissors className="text-purple-500 text-3xl" />,
      price: "₹499",
    },
    {
      id: 2,
      name: "Hair Coloring",
      desc: "Rich, vibrant, and damage-free hair coloring by professionals.",
      img: "https://images.unsplash.com/photo-1712213396688-c6f2d536671f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGFpciUyMGNvbG9yaW5nfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
      icon: <FaPaintBrush className="text-yellow-500 text-3xl" />,
      price: "₹1299",
    },
    {
      id: 3,
      name: "Hair Spa",
      desc: "Relaxing hair spa that nourishes and rejuvenates your scalp.",
      img: "https://plus.unsplash.com/premium_photo-1667516650977-b6fb6e3a5a5f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1172",
      icon: <FaSpa className="text-green-500 text-3xl" />,
      price: "₹899",
    },
    {
      id: 4,
      name: "Keratin / Smoothening",
      desc: "Frizz-free, silky smooth hair with long-lasting shine.",
      img: "https://plus.unsplash.com/premium_photo-1661683904742-0a1e08dd8fc4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1176",
      icon: <FaWind className="text-blue-500 text-3xl" />,
      price: "₹2499",
    },
  ];
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-100 py-16 px-6">
      {/* ---- Header ---- */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
           Premium Hair Services
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Step into luxury — experience the art of hair care with our
          professionally curated salon services that make every strand shine.
        </p>
      </div>

      {/* ---- Service Cards ---- */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {services.map((item) => (
          <div
            key={item.id}
            className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
          >
            <div className="relative">
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-56 object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute top-3 left-3">{item.icon}</div>
            </div>

            <div className="p-5 text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {item.name}
              </h3>
              <p className="text-gray-500 text-sm mb-4">{item.desc}</p>
              <div className="text-lg font-semibold text-purple-600 mb-3">
                {item.price}
              </div>
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => addToCart({ id: item.id, name: item.name, price: item.price, category: "hair" })}
                  className="flex-1 px-1 py-2 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 text-white font-medium shadow-md hover:scale-105 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
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

      {/* ---- CTA Section ---- */}
      <div className="mt-20 bg-gradient-to-r from-purple-500 to-purple-600 text-white text-center py-12 rounded-3xl shadow-lg max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Ready for Your Hair Makeover?</h2>
        <p className="mb-6 text-purple-100">
          Book your appointment today and let our stylists bring out your best look!
        </p>
        <button className="bg-white text-purple-600 font-semibold px-8 py-3 rounded-full hover:bg-purple-100 transition-all flex items-center gap-2 mx-auto">
          <FaShoppingCart className="text-lg" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}