import React, { useState } from "react";

export default function BookingPage() {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");

  const slots = [
    "16:30:00 - 17:00:00",
    "17:57:00 - 17:57:00",
  ];

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <div className="max-w-4xl mx-auto">
        
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Book Service
        </h1>

        {/* Card */}
        <div className="bg-white shadow-md rounded-xl border border-gray-200 p-6 mb-10">
          
          {/* Booking Info */}
          <div className="mb-6">
            <p className="font-semibold text-gray-800">Booking Service:</p>
            <p className="text-[#7b13c5] underline cursor-pointer w-fit">male</p>
          </div>

          <div>
            <p className="font-semibold text-gray-800">Price:</p>
            <p className="text-green-600 font-bold text-lg">₹100.00</p>
          </div>
        </div>

        {/* Date Select */}
        <div className="mb-6">
          <label className="font-semibold text-gray-800 block mb-2">
            Choose available date
          </label>
          <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#7b13c5] focus:border-[#7b13c5] outline-none"
          >
            <option value="">Select Date</option>
            <option value="2025-12-03">2025-12-03</option>
          </select>
        </div>

        {/* Slots */}
        <div className="mb-6">
          <p className="font-semibold text-gray-800 mb-3">Available Slots</p>

          <div className="flex flex-wrap gap-4">
            {slots.map((slot) => (
              <button
                key={slot}
                onClick={() => setSelectedSlot(slot)}
                className={`px-6 py-3 rounded-lg border transition-all ${
                  selectedSlot === slot
                    ? "bg-[#7b13c5] text-white border-[#b964e1]"
                    : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <button
            className="px-6 py-3 rounded-lg bg-[#7b13c5] text-white font-semibold hover:bg-[#6b0fb0] transition-all"
          >
            Submit Booking
          </button>

          <button
            className="px-6 py-3 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
