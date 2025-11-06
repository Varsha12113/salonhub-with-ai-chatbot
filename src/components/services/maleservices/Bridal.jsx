import React from "react";
import { addToCart } from "../../../utils/cart";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const bridalGroomServices = [
  {
    name: "Royal Groom Makeover",
    price: "₹10,000",
    description:
      "A complete luxury package with facial, haircut, beard styling, and premium skin treatment for your big day.",
    image:
      "https://plus.unsplash.com/premium_photo-1664297814064-661d433c03d9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cm95YWwlMjBncm9vbXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
  },
  {
    name: "Wedding Day Prep",
    price: "₹7,000",
    description:
      "Includes facial, manicure, pedicure, and trimming to make you camera-ready for your wedding ceremony.",
    image:
      "https://plus.unsplash.com/premium_photo-1661288502656-7265af3e6b23?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bWVucyUyMHNhbG9ufGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
  },
  {
    name: "Pre-Wedding Skin Glow",
    price: "₹5,500",
    description:
      "Detox facial and hydrating treatment for glowing, refreshed skin before your special day.",
    image:
      "https://plus.unsplash.com/premium_photo-1661407659557-6e73ebc37afb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bWVucyUyMHNhbG9uJTIwc2tpbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
  },
  {
    name: "Signature Groom Styling",
    price: "₹6,000",
    description:
      "Expert haircut, beard design, and styling for a sharp, confident wedding-day look.",
    image:
      "https://plus.unsplash.com/premium_photo-1661290481306-4841edd49719?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWVucyUyMHNhbG9ufGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
  },
  {
    name: "Luxury Spa & Relaxation",
    price: "₹8,000",
    description:
      "Full-body massage and aromatherapy session to help you unwind before your wedding.",
    image:
      "https://plus.unsplash.com/premium_photo-1664478228642-292de5363f5c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bHV4dXJ5JTIwc3BhJTIwbWVufGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
  },
  {
    name: "Groom Premium Combo",
    price: "₹12,500",
    description:
      "An all-in-one package including skin, hair, and beard treatments with luxury grooming add-ons.",
    image:
      "https://media.istockphoto.com/id/1491342749/photo/dermatologist-aesthetician-passing-facial-mask-on-a-patient-at-clinic.jpg?s=612x612&w=0&k=20&c=J7iizJ00DChjdqGXXHr0wtd4GpcUZXfqfXIkutbRQD8=",
  },
];

const addOns = [
  { name: "Hydrating Facial", price: "₹2,000" },
  { name: "Beard Spa & Styling", price: "₹1,500" },
  { name: "Hair Spa Treatment", price: "₹2,500" },
  { name: "Luxury Massage", price: "₹3,000" },
];

export default function MaleBridal() {
  const navigate = useNavigate();

  return (
  <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* ---------- HERO SECTION ---------- */}
  <div className="relative bg-gradient-to-r from-purple-600 via-purple-400 to-purple-500 py-28 text-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1604135354658-7fef3b4bf8f6?auto=format&fit=crop&w=1500&q=80"
          alt="Groom Services"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <h1 className="text-6xl font-extrabold text-white drop-shadow-2xl mb-4">
            Groom’s Bridal Services
          </h1>
          <p className="text-white text-lg">
            Elevate your wedding look with our luxury grooming packages — crafted
            to make every groom feel confident, classy, and camera-ready.
          </p>
        </div>
  <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-purple-300 to-purple-600"></div>
      </div>

      {/* ---------- FEATURED QUOTE ---------- */}
      <div className="text-center mt-16 px-6">
        <h2 className="text-3xl font-semibold text-gray-800 italic">
          “Because the Groom Deserves to Shine Too 💎”
        </h2>
        <p className="text-gray-500 mt-3">
          Our experts ensure you radiate confidence and charm on your special
          day, with bespoke grooming crafted for perfection.
        </p>
      </div>

      {/* ---------- BRIDAL GROOM PACKAGES ---------- */}
      <div className="max-w-6xl mx-auto px-6 py-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {bridalGroomServices.map((service, index) => (
          <div
            key={index}
            className="relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
          >
            <div className="overflow-hidden h-60">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {service.name}
              </h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <p className="text-xl font-semibold text-purple-600 mb-4">
                {service.price}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    addToCart({ id: index, name: service.name, price: service.price, category: 'groom-bridal' });
                  }}
                  className="flex-1 px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 text-white font-medium shadow-md hover:scale-105 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FaShoppingCart className="text-lg" />
                  Add to Cart
                </button>
                <button onClick={() => navigate('/booking')} className="px-4 py-2 rounded-full border border-purple-200 text-purple-600 bg-white hover:bg-purple-50 transition">Book Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ---------- ADD-ONS SECTION ---------- */}
      <div className="relative py-16 bg-gradient-to-r from-purple-100 via-purple-50 to-purple-100">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-purple-700 mb-6">
            Groom’s Luxury Add-ons 💈
          </h2>
          <p className="text-gray-600 mb-12">
            Complete your royal look with our premium finishing touches designed
            exclusively for grooms.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOns.map((addon, index) => (
              <div
                key={index}
                className="bg-white/70 backdrop-blur-md rounded-2xl shadow-md p-6 border border-purple-100 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {addon.name}
                </h3>
                <p className="text-purple-600 font-medium">{addon.price}</p>
              </div>
            ))}
          </div>

          <button className="mt-12 px-10 py-3 text-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-purple-600 rounded-full shadow-lg hover:scale-110 hover:shadow-2xl transition-all duration-300 flex items-center gap-2 mx-auto">
            <FaShoppingCart className="text-lg" />
            Add Grooming Package to Cart 💍
          </button>
        </div>
      </div>
    </div>
  );
}
