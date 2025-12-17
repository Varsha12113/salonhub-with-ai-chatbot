import React from "react";
// import { ArrowRight } from "lucide-react";
import { Scissors, Sparkles } from "lucide-react";

import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";
import { Clock } from "./Clock";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section id="hero" className="relative">
      {/* ---------- HERO BACKGROUND ---------- */}
      <div className="bg-gradient-to-r from-purple-100 via-purple-200 to-purple-300 min-h-[90vh] flex items-center">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 px-6 py-28">
          
          {/* ---------- LEFT CONTENT ---------- */}
          <div className="text-center md:text-left max-w-xl">
           <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-bold leading-tight text-gray-800 mb-6"
          >
            Discover Your True Beauty with{" "}
            <span className="text-purple-600">GlowUp Salon</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-lg text-gray-700 mb-8"
          >
            Pamper yourself with our professional hair, skin, and beauty services.
            Experience luxury, relaxation, and confidence — all in one place.
          </motion.p>
             <div className="flex justify-center md:justify-start gap-4">
              <button className="flex items-center gap-2 bg-purple-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-purple-700 hover:scale-105 transition-all duration-300"
               onClick={() => navigate("/register")}>
                <Scissors size={18} />
                Register Now
              </button>

              <button
                onClick={() => navigate("/services")}
                className="border border-purple-600 text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-600 hover:text-white transition-all duration-300"
              >
                View Services
              </button>
            </div>
          </div>
          {/* ---------- RIGHT IMAGE ---------- */}
          <div className="w-full md:w-1/2 flex justify-center">
          <Clock/>
          </div>
        </div>
      </div>
      {/* ---------- FLOATING ICON ---------- */}
      <div className="absolute bottom-6 right-6 bg-white p-3 rounded-full shadow-lg animate-float">
        <Sparkles size={24} className="text-purple-600" />
      </div>

      <div className="absolute top-8 left-10 bg-white p-3 rounded-full shadow-lg animate-float-slow">
        <Sparkles size={22} className="text-purple-500" />
      </div>
    </section>
  );
};

export default HeroSection;
