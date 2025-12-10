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

import { checkoutBooking, resetCheckout } from "../../redux/Slice/bookingSlice";
import { useNavigate, useLocation } from "react-router-dom";

export default function Booking() {
  const navigate = useNavigate();
  const location = useLocation();
  const serviceIdFromState = location?.state?.serviceId;
  const serviceNameFromState = location?.state?.serviceName;
    const user = useSelector((state) => state.auth.user); 

 console.log("FULL location.state:", location.state);
  console.log("serviceIdFromState:", serviceIdFromState);
  console.log("serviceNameFromState:", serviceNameFromState);

   const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(() => ({
    gender: "",
    stylist: "",
    date: "",
    time: "",
    username: user?.username || "",      // 👈 prefill name
    phone: user?.phone || "",    // 👈 prefill phone
    email: user?.email || "",    // 👈 prefill email
    serviceId: serviceIdFromState || null,
    slotId: null,
    services: serviceIdFromState
      ? [{ id: serviceIdFromState, name: serviceNameFromState }]
      : [],
  }));




  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

 const handleChange = (field, value) => {
  setFormData(prev => ({
    ...prev,
    [field]: value,
  }));
};





  const handleSubmit = () => {
    alert("Appointment Booked Successfully!");
    console.log(formData);
  };

  // Steps configuration (removed category)
  const steps = [
    { id: 1, label: "Gender", icon: <FaVenusMars /> },
    { id: 2, label: "Date", icon: <FaCalendarAlt /> },
    { id: 3, label: "Slot", icon: <FaClock /> },
    // { id: 4, label: "Details", icon: <FaUserCircle /> },
    { id: 4, label: "Confirm", icon: <FaUserCircle /> },
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
          <Step2Date
            formData={formData}
            onChange={handleChange}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )}
        {step === 3 && (
          <Step3Time
            formData={formData}
            onChange={handleChange}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )}
        {/* {step === 4 && (
          <Step4Details
            formData={formData}
            onChange={handleChange}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )} */}
        {step === 4 && (
          <Step4Customer
            formData={formData}
            onChange={handleChange}
            onPrev={prevStep}
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





function Step2Date({ formData, onChange, onNext, onPrev }) {
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
      <h2 className="text-xl font-semibold mb-4">Step 2 — Choose Date</h2>

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
  className="w-full px-3 py-2 border-2 border-purple-300 rounded-lg bg-white text-gray-900 text-sm
             focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-500
             hover:border-purple-400 transition shadow-sm"
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



function Step3Time({ formData, onChange, onNext, onPrev }) {
  const dispatch = useDispatch();
  const selectedDate = formData?.date;

  const { slotsByDate, loading, error } = useSelector(
    (state) => state.scheduler
  );

  useEffect(() => {
    if (selectedDate) {
      dispatch(fetchSlotsByDate(selectedDate));
    }
  }, [selectedDate, dispatch]);

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Step 3 — Choose Time Slot</h2>

      {loading && <p className="text-gray-600 mb-4">Loading time slots...</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {!loading && Array.isArray(slotsByDate) && slotsByDate.length > 0 ? (
        <div className="mb-6 grid grid-cols-2 gap-2">
          {slotsByDate.map((slot) => (
  <button
    key={slot.id}
    onClick={() => {
      onChange("slotId", slot.id);
      onChange(
        "time",
        `${slot.slot_master.start_time} - ${slot.slot_master.end_time}`
      );
      onChange("date", slot.slot_date); // ✅ store slot_date too
      onNext();
    }}
    className={`px-3 py-2 rounded border ${
      formData.slotId === slot.id
        ? "bg-purple-200 text-white"
        : "bg-white"
    }`}
  >
    {/* Show start/end time */}
    <div>{slot.slot_master.start_time} - {slot.slot_master.end_time}</div>
    {/* Show slot date */}
    <div className="text-sm text-gray-500">{slot.slot_date}</div>
    {/* Show status */}
    <div className="text-xs text-green-600">{slot.status}</div>
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
          disabled={loading || !slotsByDate?.length}
          className="px-4 py-2 bg-purple-500 text-white rounded disabled:opacity-60"
        >
          Next
        </button>
      </div>
    </div>
  );
}




function Step4Customer({ formData, onChange, onPrev }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();


console.log({
  slotId: formData.slotId,
  services: formData.services,
  name: formData.username,
  phone: formData.phone,
});

  const user = useSelector((state) => state.auth.user); // registration data
  const { loading, error, successMessage, bookingData } = useSelector(
    (state) => state.checkout
  );

   //Prefill from user once
 

  const selectedServices =
    formData?.services?.length
      ? formData.services
      : bookingData?.services || [];

  const servicesText =
    selectedServices.length > 0
      ? selectedServices
          .map((s) => s.name || s.service_name || `Service #${s.id || s.service_id}`)
          .join(", ")
      : "Not selected";

  const handleConfirm = () => {
    const payload = {
      start_slot_id: formData.slotId,
      services: selectedServices.map((s) => ({
        service_id: s.id || s.service_id,
      })),
      customer_name: formData.username,
      customer_email: formData.email,
      customer_phone: formData.phone,
    };
    dispatch(checkoutBooking(payload));
  };

  useEffect(() => {
    if (successMessage) {
      navigate("/booking-success");
      dispatch(resetCheckout());
    }
  }, [successMessage, navigate, dispatch]);

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Provide Your Details</h2>

      

      {/* Contact details (from registration, editable) */}
      <div className="space-y-3 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) => onChange("name", e.target.value)}
            className="mt-1 w-full border rounded px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => onChange("email", e.target.value)}
            className="mt-1 w-full border rounded px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Mobile
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            className="mt-1 w-full border rounded px-3 py-2 text-sm"
          />
        </div>
      </div>

      {loading && <p className="text-purple-600 mb-2">Processing...</p>}
      {error && <p className="text-red-600 mb-2">{error}</p>}

      <div className="flex justify-between mt-4">
        <button
          onClick={onPrev}
          className="px-4 py-2 bg-gray-200 rounded text-sm"
        >
          Back
        </button>
        <button
          onClick={handleConfirm}
          disabled={
            loading ||
            !formData.slotId ||
            !selectedServices.length ||
            !formData.username ||
            !formData.phone
          }
          className="px-6 py-2 bg-green-500 text-white rounded text-sm font-semibold disabled:opacity-60"
        >
          {loading ? "Confirming..." : "CONFIRM"}
        </button>
      </div>
    </div>
  );
}
}


export function BookingSuccess() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="bg-white shadow-lg p-10 rounded-2xl text-center max-w-md">
        <h1 className="text-3xl font-bold text-purple-600 mb-4">🎉 Booking Confirmed!</h1>

        <p className="text-gray-600 mb-6">
          Your appointment has been successfully scheduled.
        </p>

        <button
          onClick={() => navigate("/booking-history")}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
        >
          View Booking History
        </button>
      </div>
    </div>
  );
}

export function Bookinghistory(){
  return(
    <div>
      Booking History Page
    </div>
  )
}

