import React from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { addToCart } from "../../../utils/cart";

const waxingServices = [
  {
    name: "Massages",
    price: "₹2,000",
    description:
      "Relax with a customized massage that eases tension and restores balance.",
    image:
      "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Waxing",
    price: "₹900",
    description:
      "Smooth and gentle waxing using premium products for all skin types.",
    image:
      "https://plus.unsplash.com/premium_photo-1661573283884-667c5a9af086?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Body Care",
    price: "₹400",
    description:
      "Pamper your skin with our soothing and rejuvenating body treatments.",
    image:
      "https://plus.unsplash.com/premium_photo-1661605481836-88d6b1c189d0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Ym9keSUyMGNhcmV8ZW58MHx8MHx8fDA%3D",
  },
];

const bodyCareServices = [
  {
    name: "Manicure",
    price: "₹600",
    description:
      "Classic nail shaping, cuticle care, and polish for elegant hands.",
    image:
      "https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHBlZGljdXJlfGVufDB8fDB8fHww",
  },
  {
    name: "Pedicure",
    price: "₹1,200",
    description:
      "Refreshing foot soak, exfoliation, massage, and perfect polish finish.",
    image:
      "https://plus.unsplash.com/premium_photo-1680348266597-6d89a08d12d7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGVkaWN1cmV8ZW58MHx8MHx8fDA%3D",
  },
];

export default function Waxing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* ---------- HERO SECTION ---------- */}
      <div className="relative py-20 text-center bg-gradient-to-r from-purple-600 to-purple-400 shadow-lg overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581579184681-1e0e8f56abf0?auto=format&fit=crop&w=1500&q=80')] bg-cover bg-center opacity-25"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 drop-shadow-lg">
            Body & Waxing Care
          </h1>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">
            Indulge in relaxing, rejuvenating treatments that enhance your glow.
          </p>
        </div>
      </div>

      {/* ---------- QUOTE ---------- */}
      <div className="text-center mt-14 px-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-black">
          “Feel Fresh. Feel Confident. Feel Beautiful ✨”
        </h2>
        <p className="text-gray-500 mt-2 max-w-lg mx-auto">
          Discover luxury care designed to refresh your body and spirit.
        </p>
      </div>

      {/* ---------- GRID SECTION ---------- */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 xl:grid-cols-2 gap-14">
        {/* WAXING SECTION */}
        <section>
          <h2 className="text-3xl font-bold text-purple-600 mb-8 text-center xl:text-left">
            Waxing & Massage
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {waxingServices.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg overflow-hidden transition-all duration-300 flex flex-col border border-purple-100"
              >
                <img
                  src={service.image}
                  alt={service.name}
                  className="h-40 w-full object-cover rounded-t-2xl"
                />
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold text-black mb-1">
                    {service.name}
                  </h3>
                  <p className="text-purple-600 font-medium mb-2">
                    {service.price}
                  </p>
                  <p className="text-gray-600 text-sm flex-grow">
                    {service.description}
                  </p>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() =>
                        addToCart({
                          id: index,
                          name: service.name,
                          price: service.price,
                          category: "waxing",
                        })
                      }
                      className="flex-1 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 text-white font-medium hover:scale-105 hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      <FaShoppingCart />
                      Add
                    </button>
                    <button
                      onClick={() => navigate("/booking")}
                      className="px-4 py-2 rounded-full border border-purple-300 text-purple-600 bg-white hover:bg-purple-50 transition"
                    >
                      Book
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* BODY CARE SECTION */}
        <section>
          <h2 className="text-3xl font-bold text-purple-600 mb-8 text-center xl:text-left">
            Body Care & Beauty
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {bodyCareServices.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg overflow-hidden transition-all duration-300 flex flex-col border border-purple-100"
              >
                <img
                  src={service.image}
                  alt={service.name}
                  className="h-40 w-full object-cover rounded-t-2xl"
                />
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold text-black mb-1">
                    {service.name}
                  </h3>
                  <p className="text-purple-600 font-medium mb-2">
                    {service.price}
                  </p>
                  <p className="text-gray-600 text-sm flex-grow">
                    {service.description}
                  </p>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() =>
                        addToCart({
                          id: index,
                          name: service.name,
                          price: service.price,
                          category: "bodycare",
                        })
                      }
                      className="flex-1 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 text-white font-medium hover:scale-105 hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      <FaShoppingCart />
                      Add
                    </button>
                    <button
                      onClick={() => navigate("/booking")}
                      className="px-4 py-2 rounded-full border border-purple-300 text-purple-600 bg-white hover:bg-purple-50 transition"
                    >
                      Book
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
