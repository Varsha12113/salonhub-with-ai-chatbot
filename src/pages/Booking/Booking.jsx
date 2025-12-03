import React from "react";
import { useDispatch , useSelector} from "react-redux";
import {
  FaVenusMars,
  FaCalendarAlt,
  FaClock,
  FaUserCircle,
} from "react-icons/fa";
import { fetchAvailableDates } from "../../redux/Slice/schedulerSlice";
import { fetchSlotsByDate } from "../../redux/Slice/schedulerSlice";
import { useEffect, useState } from "react";

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
    { id: 3, label: "slot", icon: <FaClock /> },
    { id: 4, label: "Booking Details", icon: <FaUserCircle /> },
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

  
 function Step1Gender({ formData, onChange, onNext }) {
  const { gender } = formData || {};

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Step 1 — Choose Gender</h2>

      <div className="space-y-2 mb-6">
        {['female', 'male'].map((g) => (
          <label key={g} className="flex items-center gap-3">
            <input
              type="radio"
              name="gender"
              value={g}
              checked={gender === g}
              onChange={(e) => onChange('gender', e.target.value)}
              className="form-radio"
            />
            <span className="capitalize">{g}</span>
          </label>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          onClick={onNext}
          disabled={!gender}
          className="px-4 py-2 bg-purple-500 text-white rounded disabled:opacity-60"
        >
          Next
        </button>
      </div>
    </div>
  );
}


 function Step2Category({ formData, onChange, onNext, onPrev }) {
  const { category, stylist } = formData || {};

  const categories = [
    'hair',
    'makeup',
    'waxing',
    'mani-pedi',
    'bridal',
    'facial',
    'beard',
  ];

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Step 2 — Choose Category & Stylist</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
        <select
          value={category || ''}
          onChange={(e) => onChange('category', e.target.value)}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Select a category</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Stylist (optional)</label>
        <input
          value={stylist || ''}
          onChange={(e) => onChange('stylist', e.target.value)}
          placeholder="Enter stylist name or leave blank"
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div className="flex justify-between">
        <button onClick={onPrev} className="px-4 py-2 bg-gray-200 rounded">Back</button>
        <button
          onClick={onNext}
          disabled={!category}
          className="px-4 py-2 bg-purple-500 text-white rounded disabled:opacity-60"
        >
          Next
        </button>
      </div>
    </div>
  );
}


function Step3Date({ formData, onChange, onNext, onPrev }) {
  const { date } = formData || {};

  const dispatch = useDispatch();
  const { availableDates, loading, error } = useSelector(
    (state) => state.scheduler
  );

  // Load available dates when this step mounts
  useEffect(() => {
    dispatch(fetchAvailableDates());
  }, [dispatch]);

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Step 3 — Choose Date</h2>

      {/* Loading */}
      {loading && <p className="text-gray-600 mb-4">Loading dates...</p>}

      {/* Error */}
      {error && (
        <p className="text-red-500 mb-4">Failed to load dates: {error}</p>
      )}

      {/* Date Picker / Dropdown */}
      {!loading && availableDates.length > 0 ? (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select a date
          </label>

          <select
            value={date || ""}
            onChange={(e) => onChange("date", e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">-- Select --</option>
            {availableDates.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      ) : (
        !loading && <p className="text-gray-600">No available dates.</p>
      )}

      <div className="flex justify-between mt-6">
        <button onClick={onPrev} className="px-4 py-2 bg-gray-200 rounded">
          Back
        </button>

        <button
          onClick={onNext}
          disabled={!date}
          className="px-4 py-2 bg-purple-500 text-white rounded disabled:opacity-60"
        >
          Next
        </button>
      </div>
    </div>
  )
}

 function Step4Time({ formData, onChange, onNext, onPrev }) {
  const dispatch = useDispatch();

  const selectedDate = formData?.date;

  const { slotsByDate, loading, error } = useSelector(
    (state) => state.scheduler
  );

  // Fetch slots when date changes
  useEffect(() => {
    if (selectedDate) {
      dispatch(fetchSlotsByDate(selectedDate));
    }
  }, [selectedDate, dispatch]);

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Step 4 — Choose Time</h2>

      {loading && <p className="text-gray-600 mb-4">Loading time slots...</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {!loading && slotsByDate.length > 0 ? (
        <div className="mb-6 grid grid-cols-2 gap-2">
          {slotsByDate.map((slot) => (
            <button
              key={slot.time || slot}
              onClick={() => onChange("time", slot.time || slot)}
              className={`px-3 py-2 rounded border ${
                formData.time === (slot.time || slot)
                  ? "bg-purple-500 text-white"
                  : "bg-white"
              }`}
            >
              {slot.time || slot}
            </button>
          ))}
        </div>
      ) : (
        !loading && <p>No slots available for this date.</p>
      )}

      <div className="flex justify-between">
        <button onClick={onPrev} className="px-4 py-2 bg-gray-200 rounded">
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!formData.time}
          className="px-4 py-2 bg-purple-500 text-white rounded disabled:opacity-60"
        >
          Next
        </button>
      </div>
    </div>
  );

 }

 function Step5Customer({ formData, onChange, onPrev, onSubmit }) {
  const { name, phone, email } = formData || {};

  const canSubmit = name && phone && email;

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Step 5 — Customer Details</h2>

      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
        <input value={name || ''} onChange={(e) => onChange('name', e.target.value)} className="w-full border px-3 py-2 rounded" />
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
        <input value={phone || ''} onChange={(e) => onChange('phone', e.target.value)} className="w-full border px-3 py-2 rounded" />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input value={email || ''} onChange={(e) => onChange('email', e.target.value)} className="w-full border px-3 py-2 rounded" />
      </div>

      <div className="flex justify-between">
        <button onClick={onPrev} className="px-4 py-2 bg-gray-200 rounded">Back</button>
        <button onClick={onSubmit} disabled={!canSubmit} className="px-4 py-2 bg-purple-500 text-white rounded disabled:opacity-60">Submit</button>
      </div>
    </div>
  );
}

}
