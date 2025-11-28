
 import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Aarav Mehta",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
    rating: 5,
    text: "Best salon experience ever! My hair stylist gave me the perfect fade. The ambiance is cozy and the staff are really professional.",
  },
  {
    id: 2,
    name: "Diya Kapoor",
    image: "https://randomuser.me/api/portraits/women/21.jpg",
    rating: 5,
    text: "The facial and spa session were so relaxing! My skin feels so soft and refreshed. Highly recommend their skincare treatments!",
  },
  {
    id: 3,
    name: "Rohan Sharma",
    image: "https://randomuser.me/api/portraits/men/27.jpg",
    rating: 4,
    text: "Excellent beard styling and trimming! The stylist really knew what suited my face shape. Will definitely visit again.",
  },
  {
    id: 4,
    name: "Meera Iyer",
    image: "https://randomuser.me/api/portraits/women/47.jpg",
    rating: 5,
    text: "Got a bridal makeup trial done and I was amazed! They used premium products and made me feel so comfortable throughout.",
  },
  {
    id: 5,
    name: "Sneha Nair",
    image: "https://randomuser.me/api/portraits/women/63.jpg",
    rating: 5,
    text: "I had a manicure and pedicure session here. Absolutely loved the service! The staff were gentle, polite, and very skilled.",
  },
];

export default function ReviewSection() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const prevReview = () => {
    setDirection(-1);
    setIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setDirection(1);
    setIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  // Auto-scroll
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const { name, image, text, rating } = reviews[index];

  return (
    <section
      id="reviews"
      className="relative py-20 px-6 text-center overflow-hidden"
    >
      {/* Beautiful gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-200 via-purple-400 to-purple-600 animate-gradient-slow"></div>


      <div className="relative max-w-3xl mx-auto bg-white/70 backdrop-blur-md shadow-2xl rounded-3xl p-10 border border-white/50">
        <h2 className="text-4xl font-bold text-gray-800 mb-10 drop-shadow-sm">
          What Our <span className="text-purple-600">Clients Say</span>
        </h2>

        {/* Review Container */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={prevReview}
            className="absolute left-[-2rem] top-1/2 transform -translate-y-1/2 bg-white/80 shadow-lg hover:bg-purple-200 text-purple-700 p-3 rounded-full transition-all"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Animated Review Card */}
          <div className="h-96 flex items-center justify-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute flex flex-col items-center text-center px-4"
              >
                <motion.img
                  src={image}
                  alt={name}
                  className="w-24 h-24 rounded-full object-cover shadow-xl border-4 border-purple-400"
                  animate={{
                    y: [0, -8, 0],
                    boxShadow: [
                      "0 0 10px rgba(168,85,247,0.4)",
                      "0 0 25px rgba(168,85,247,0.6)",
                      "0 0 10px rgba(168,85,247,0.4)",
                    ],
                  }}
                  transition={{ repeat: Infinity, duration: 4 }}
                />

                <div className="flex justify-center text-yellow-400 mt-4">
                  {Array.from({ length: rating }, (_, i) => (
                    <Star key={i} size={20} fill="gold" />
                  ))}
                </div>

                <p className="text-gray-700 mt-4 text-lg leading-relaxed italic max-w-xl">
                  “{text}”
                </p>

                <h3 className="mt-4 text-lg font-semibold text-purple-700">
                  {name}
                </h3>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextReview}
            className="absolute right-[-2rem] top-1/2 transform -translate-y-1/2 bg-white/80 shadow-lg hover:bg-purple-200 text-purple-700 p-3 rounded-full transition-all"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {reviews.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full ${
                i === index ? "bg-purple-600 scale-110 shadow-md" : "bg-gray-400"
              }`}
              whileHover={{ scale: 1.3 }}
              animate={{
                opacity: i === index ? 1 : 0.6,
                scale: i === index ? 1.2 : 1,
              }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
