import React from "react";
import { addToCart } from "../../../utils/cart";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const facialServices = [
  {
    name: "Classic Facial",
    price: "₹1,500",
    description:
      "Deep cleansing, exfoliation, and hydration to give your skin a fresh, radiant glow.",
    image:
      "https://media.istockphoto.com/id/514965141/photo/man-getting-a-face-treament-at-the-health-spa.webp?a=1&b=1&s=612x612&w=0&k=20&c=zFJsrs0nJpIypYJHcXw1-U_dso3JYHDYbmA5-apxDmM=",
  },
  {
    name: "Gold Facial",
    price: "₹2,800",
    description:
      "Luxury gold-infused facial that brightens and rejuvenates dull skin for a luminous finish.",
    image:
      "https://media.istockphoto.com/id/2223396308/photo/hairdresser-styling-eyebrows-of-customer-in-beauty-salon.webp?a=1&b=1&s=612x612&w=0&k=20&c=BH7G1pBrFiV7cQL8xC1VSCupP14nIWznnQdS6cKH3L0=",
  },
  {
    name: "Fruit Facial",
    price: "₹1,200",
    description:
      "A gentle, natural facial using fruit extracts to refresh and nourish the skin.",
    image:
      "https://plus.unsplash.com/premium_photo-1674228288342-d72cf144e5de?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=600",
  },
  {
    name: "Anti-Aging Facial",
    price: "₹3,500",
    description:
      "Reduces wrinkles and fine lines, restoring youthful elasticity and firmness.",
    image:
      "https://plus.unsplash.com/premium_photo-1661512156581-13ff34c9c8d6?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=600",
  },
  {
    name: "Hydra Facial",
    price: "₹4,500",
    description:
      "Advanced facial with deep hydration, cleansing, and skin renewal for a dewy glow.",
    image:
      "https://media.istockphoto.com/id/474067842/photo/making-a-younger-you.webp?a=1&b=1&s=612x612&w=0&k=20&c=jplSi45S6imjbDA9TMmpIxnYkKhhJGEdMNMbDJHq8No=",
  },
  {
    name: "Brightening Facial",
    price: "₹2,000",
    description:
      "Targets pigmentation and uneven tone to enhance your natural radiance.",
    image:
      "https://media.istockphoto.com/id/1337008702/photo/beautician-applies-white-skin-moisturizer-to-handsome-mans-face-at-wellness-center-male.webp?a=1&b=1&s=612x612&w=0&k=20&c=9HNSxeOra-Nzn0NDdJLnm6cilEuS32-uD_mIl2Ec5I0=",
  },
];

export default function Facial() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white animate-fadeIn">
      {/* ---------- HERO SECTION ---------- */}
      <div className="relative text-center py-20 bg-gradient-to-r from-purple-600 via-purple-400 to-purple-500 shadow-lg">
        <h1 className="text-5xl font-bold text-white drop-shadow-xl mb-4">
          Facial Treatments
        </h1>
        <p className="text-white text-lg max-w-2xl mx-auto">
          Refresh, rejuvenate, and revive your skin with our premium facial
          treatments — designed for ultimate glow and relaxation.
        </p>
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-purple-300 to-purple-600"></div>
      </div>

      {/* ---------- SERVICE CARDS ---------- */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {facialServices.map((service, index) => (
          <div
            key={index}
            className="group relative bg-white border border-purple-100 rounded-2xl shadow-md hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden flex flex-col"
          >
            {/* IMAGE */}
            <div className="overflow-hidden rounded-t-2xl">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            {/* CONTENT */}
            <div className="p-6 flex flex-col flex-grow">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {service.name}
              </h2>
              <p className="text-gray-600 mb-4 flex-grow">
                {service.description}
              </p>
              <p className="text-lg font-bold text-purple-600 mb-4">
                {service.price}
              </p>

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
