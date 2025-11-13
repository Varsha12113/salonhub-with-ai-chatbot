import React from "react";
import { addToCart } from "../../../utils/cart";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const bridalPackages = [
  {
    name: "Bridal Hair Styling",
    price: "₹18,000",
    description:
      "Our expert hairstylists are skilled in creating a wide range of bridal hairstyles, from classic updos to romantic braids and glamorous curls. We work closely with you to understand your vision and complement your wedding dress and overall theme.",
    image:
      "https://images.unsplash.com/photo-1581674210501-c760093514e8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YnJpZGFsJTIwaGFpciUyMHN0eWxpbmd8ZW58MHx8MHx8fDA%3D"
  },
  {
    name: "Bridal Makeup",
    price: "₹12,000",
    description:
      "Our professional makeup artists specialize in bridal makeup, using high-quality products to achieve a flawless and long-lasting look. Whether you want a natural, radiant glow or a bold and dramatic style, we customize the makeup to enhance your best features.",
    image:
    "https://images.unsplash.com/photo-1737515046830-1680d82e043c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTR8fG1ha2V1cCUyMGFydGlzdCUyMGJyaWRhbHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Pre-Wedding Hair and Skin Consultation",
    price: "₹22,000",
    description:
      "We offer pre-wedding consultations to discuss your hair and skin needs. Our experts will suggest suitable hair treatments and skincare routines to ensure your hair and skin are in their best condition for the big day.",
    image:
      "https://plus.unsplash.com/premium_photo-1661771751574-1c3648849008?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bWFrZXVwJTIwYXJ0aXN0fGVufDB8fDB8fHww"
  },
    {
    name: "Bridal Party Services",
    price: "₹18,000",
    description:
      "We can also accommodate your bridal party, including bridesmaids, mothers of the bride and groom, and other guests. We offer hair and makeup services to ensure everyone looks their best for the wedding celebration.",
    image:
      "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fGJyaWRlfGVufDB8fDB8fHww",
  },
  {
    name: "Bridal Spa Packages",
    price: "₹12,000",
    description:
      "Treat yourself to some pre-wedding relaxation with our bridal spa packages. Enjoy massages, facials, body treatments, and more to destress and rejuvenate before your special day.",
    image:
      "https://plus.unsplash.com/premium_photo-1683134297492-cce5fc6dae31?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c3BhfGVufDB8fDB8fHww",
  },
  {
    name: "On-Site Services",
    price: "₹22,000",
    description:
      "If preferred, we can arrange to provide our bridal services on-site at your wedding venue or getting-ready location, ensuring a stress-free and convenient experience for you and your bridal party.",
    image:
      "https://images.unsplash.com/photo-1638628064365-f08ad0ec8245?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fG1ha2V1cCUyMGFydGlzdHxlbnwwfHwwfHx8MA%3D%3D"
  }
];

const addOns = [
  { name: "Pre-Bridal Skincare", price: "₹4,000" },
  { name: "Hair Spa & Treatment", price: "₹2,500" },
  { name: "Full Body Polishing", price: "₹3,500" },
  { name: "Luxury Nail Art", price: "₹2,000" },
 
];

export default function Bridal() {
  const navigate = useNavigate();
  return (
  <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* ---------- HERO SECTION ---------- */}
  <div className="relative bg-gradient-to-r from-purple-600 via-purple-400 to-purple-500 py-28 text-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1600359756527-52f8b48e1f91?auto=format&fit=crop&w=1500&q=80"
          alt="Bridal Makeup"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <h1 className="text-6xl font-extrabold text-white drop-shadow-2xl mb-4">
            Bridal Services
          </h1>
          <p className="text-white text-lg">
            Experience luxury bridal transformations that make your special day
            absolutely unforgettable.
          </p>
        </div>
  <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-purple-300 to-purple-600"></div>
      </div>

      {/* ---------- FEATURED QUOTE ---------- */}
      <div className="text-center mt-16 px-6">
        <h2 className="text-3xl font-semibold text-gray-800 italic">
          “Every Bride Deserves to Feel Like Royalty 👑”
        </h2>
        <p className="text-gray-500 mt-3">
          Our expert stylists craft bespoke looks tailored for your personality,
          attire, and occasion.
        </p>
      </div>

      {/* ---------- BRIDAL PACKAGES ---------- */}
      <div className="max-w-6xl mx-auto px-6 py-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {bridalPackages.map((pkg, index) => (
          <div
            key={index}
            className="relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
          >
            <div className="overflow-hidden h-60">
              <img
                src={pkg.image}
                alt={pkg.name}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {pkg.name}
              </h3>
              <p className="text-gray-600 mb-4">{pkg.description}</p>
              <p className="text-xl font-semibold text-purple-600 mb-4">
                {pkg.price}
              </p>
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => {
                    addToCart({ id: index, name: pkg.name, price: pkg.price, category: "bridal" });
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

      {/* ---------- ADD-ONS SECTION ---------- */}
  <div className="relative py-16 bg-gradient-to-r from-purple-100 via-purple-50 to-purple-100">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-purple-700 mb-6">
            Enhance Your Bridal Glow 💫
          </h2>
          <p className="text-gray-600 mb-12">
            Pair your bridal package with our luxury add-ons to create a
            personalized experience.
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

          {/* <button className="mt-12 px-10 py-3 text-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-purple-600 rounded-full shadow-lg hover:scale-110 hover:shadow-2xl transition-all duration-300 flex items-center gap-2 mx-auto">
            
            Add Bridal Package to Cart 💍
          </button> */}
        </div>
      </div>
    </div>
  );
}
