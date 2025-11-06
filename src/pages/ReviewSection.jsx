import React, { useState } from "react";
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
    name: "Rahul Verma",
    image: "https://randomuser.me/api/portraits/men/35.jpg",
    rating: 4,
    text: "Loved the haircut and head massage combo. Super relaxing and worth the price. The place maintains great hygiene standards too.",
  },
  {
    id: 6,
    name: "Sneha Nair",
    image: "https://randomuser.me/api/portraits/women/63.jpg",
    rating: 5,
    text: "I had a manicure and pedicure session here. Absolutely loved the service! The staff were gentle, polite, and very skilled.",
  },
  {
    id: 7,
    name: "Karan Bhatia",
    image: "https://randomuser.me/api/portraits/men/56.jpg",
    rating: 5,
    text: "Stylish interior, calming music, and expert stylists — what else could you ask for? I’ve found my go-to salon in the city!",
  },
  {
    id: 8,
    name: "Tanya Singh",
    image: "https://randomuser.me/api/portraits/women/52.jpg",
    rating: 4,
    text: "Tried their hair spa package, and it was heavenly! My hair feels silky smooth and shiny. Great value for money.",
  },
  {
    id: 9,
    name: "Vikram Joshi",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
    rating: 5,
    text: "Fantastic grooming experience! The team is well-trained and friendly. Booking my next appointment already!",
  },
];

export default function ReviewSection() {
  const [index, setIndex] = useState(0);

  const prevReview = () =>
    setIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  const nextReview = () =>
    setIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));

  const { name, image, text, rating } = reviews[index];

  return (
    <section id="reviews" className=" bg-gray-200 shadow-lg rounded-md border-lime-300 py-20 px-6 text-center">
      <h2 className="text-4xl font-bold text-gray-800 mb-12">
        Client <span className="text-purple-500">Reviews</span>
      </h2>

      <div className="relative max-w-3xl mx-auto  p-10">
        {/* Left Arrow */}
        <button
          onClick={prevReview}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-2 rounded-full transition"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Review Content */}
        <div className="flex flex-col items-center gap-4">
          <img
            src={image}
            alt={name}
            className="w-20 h-20 rounded-full object-cover"
          />

          <div className="flex justify-center text-yellow-500">
            {Array.from({ length: rating }, (_, i) => (
              <Star key={i} size={20} fill="orange" />
            ))}
          </div>

          <p className="text-gray-700 max-w-xl text-lg leading-relaxed">
            {text}
          </p>

          <h3 className="text-lg font-semibold text-purple-500">{name}</h3>
        </div>

        {/* Right Arrow */}
        <button
          onClick={nextReview}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-2 rounded-full transition"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
}
