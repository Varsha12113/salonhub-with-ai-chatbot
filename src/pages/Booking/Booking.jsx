import React, { useState } from "react";
import {
  FaVenusMars,
  FaCalendarAlt,
  FaClock,
  FaUserCircle,
} from "react-icons/fa";

import Step1Gender from "./Step1Gender";
import Step3Date from "./Step3Date";
import Step4Time from "./Step4Time";
import Step5Customer from "./Step5Customer";

export default function Booking() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    gender: "",
    stylist: "",
    date: "",
    time: "",
    name: "",
    phone: "",
    email: "",
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    alert("Appointment Booked Successfully!");
    console.log(formData);
  };

  // Steps configuration (removed category)
  const steps = [
    { id: 1, label: "Gender", icon: <FaVenusMars /> },
    { id: 2, label: "Date", icon: <FaCalendarAlt /> },
    { id: 3, label: "Time", icon: <FaClock /> },
    { id: 4, label: "Customer", icon: <FaUserCircle /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-100 p-8">
      {/* Header */}
      <h1 className="text-3xl font-bold text-center text-purple-600 mb-8 tracking-wide">
        Book Your Appointment
      </h1>

      {/* Step Indicator */}
      <div className="flex justify-center flex-wrap gap-6 mb-10">
        {steps.map(({ id, label, icon }) => (
          <div key={id} className="flex flex-col items-center">
            <div
              className={`w-14 h-14 flex items-center justify-center rounded-full text-xl shadow-md transition-all duration-300 ${
                step === id
                  ? "bg-purple-500 text-white scale-110"
                  : step > id
                  ? "bg-green-400 text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
            >
              {icon}
            </div>
            <p
              className={`mt-2 text-sm font-medium ${
                step === id ? "text-purple-600" : "text-gray-500"
              }`}
            >
              {label}
            </p>
          </div>
        ))}
      </div>

      {/* Step Components */}
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8 border border-purple-100">
        {step === 1 && (
          <Step1Gender
            formData={formData}
            onChange={handleChange}
            onNext={nextStep}
          />
        )}
        {step === 2 && (
          <Step3Date
            formData={formData}
            onChange={handleChange}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )}
        {step === 3 && (
          <Step4Time
            formData={formData}
            onChange={handleChange}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )}
        {step === 4 && (
          <Step5Customer
            formData={formData}
            onChange={handleChange}
            onPrev={prevStep}
            onSubmit={handleSubmit}
          />
        )}
      </div>

      {/* Progress Indicator */}
      <div className="mt-8 flex justify-center">
        <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-purple-500 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${(step / steps.length) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
