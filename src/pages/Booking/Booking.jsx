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
import { Link } from "react-router-dom";
import { clearCart } from "../../utils/cart";
import { startRazorpayPayment } from "../../redux/Slice/bookingSlice";


export default function Booking() {
  
  const { bookingData } = useSelector((state) => state.checkout);
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

// ── Resume booking after redirect-to-login ──
  useEffect(() => {
    if (location.state?.resumeBooking && location.state?.formData) {
      setFormData(prev => ({ ...prev, ...location.state.formData }));
      setStep(4);
    }
  }, [location.state]);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

// ── Autofill contact fields once user becomes available ──
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        username: prev.username || user.username || "",
        phone: prev.phone || user.phone || "",
        email: prev.email || user.email || "",
      }));
    }
  }, [user]);

 const handleChange = (field, value) => {
  setFormData(prev => ({
    ...prev,
    [field]: value,
  }));
};


  const dispatch = useDispatch();
  
  // ── Add this — reset payment state on every fresh booking ──
  useEffect(() => {
    dispatch(resetCheckout());
  }, [dispatch]);


  const handleSubmit = () => {
    alert("Appointment Booked Successfully!");
    console.log(formData);
  };

  // Steps configuration (removed category)
  const steps = [
    { id: 1, label: "Gender", icon: <FaVenusMars /> },
    { id: 2, label: "Date", icon: <FaCalendarAlt /> },
    { id: 3, label: "Slot", icon: <FaClock /> },
    { id: 4, label: "Customer", icon: <FaUserCircle /> },
    { id: 5, label: "Confirm", icon: <FaUserCircle /> }, // new step
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
        {step === 4 && (
          <Step4Customer
            formData={formData}
            onChange={handleChange}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )}
        {step === 5 && (
  <Step5Confirm
    bookingData={bookingData}
    formData={formData}
    onConfirm={(summary) => {
      navigate("/booking-success", { state: { booking: summary } });
    }}
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
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    if (selectedDate) {
       dispatch(fetchSlotsByDate({ date: selectedDate, isAdmin: false }));
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

       if (!user) {
      // Not logged in — send to login, remember where to come back to
      navigate("/login", {
        state: {
          from: location.pathname,
          resumeBooking: true,
          formData: { ...formData, slotId: slot.id, date: slot.slot_date },
        },
      });
      return;
    }
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




function Step4Customer({ formData, onChange, onPrev, onNext }) {
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
  if (
    bookingData &&
    (bookingData.status === "pending" || bookingData.status === "confirmed")
  ){

    // 1) clear cart storage
    clearCart();

    // 2) notify any open Cart components
    window.dispatchEvent(new Event("cartUpdated"));

    // 3) move to Step 5 (confirmation) or navigate to success page
    onNext(); // or navigate("/booking-success")
    

  }
}, [bookingData, onNext]);


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


function Step5Confirm({ bookingData, formData, onConfirm }) {
  const dispatch   = useDispatch();
  const navigate   = useNavigate();

  const { paymentLoading, paymentData, error } = useSelector(
    (state) => state.checkout
  );

useEffect(() => {
    if (
      paymentData &&
      bookingData &&
      paymentData.booking_id === bookingData.booking_id  // ← match booking IDs
    ) {
      navigate("/booking-success", {
        state: { booking: bookingData, payment: paymentData },
      });
    }
  }, [paymentData, navigate, bookingData]);

  if (!bookingData) {
    return (
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
        <p className="text-gray-700">
          No booking data found. Please complete previous steps.
        </p>
      </div>
    );
  }

  const handlePay = () => {
    dispatch(startRazorpayPayment(bookingData.booking_id));
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Confirm & Pay
      </h2>

      <div className="border-t border-b py-8 mt-4">
        <p className="mb-4 text-gray-800">
          Hi <span className="font-semibold">
            {formData.username || bookingData.username}
          </span>,
        </p>
        <p className="mb-6 text-gray-700">
          Please see below the summary of your appointment:
        </p>

        <div className="space-y-1 text-sm md:text-base text-gray-800 mb-6">
          <p>
            <span className="font-semibold">Service(s) :</span>{" "}
            {bookingData.services?.join(", ")}
          </p>
          <p>
            <span className="font-semibold">Date :</span> {bookingData.date}
          </p>
          <p>
            <span className="font-semibold">Time :</span> {bookingData.time}
          </p>
          {/* ── Price summary ── */}
          <div className="mt-4 p-4 bg-purple-50 rounded-lg">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>₹{bookingData.total_price}</span>  {/* 500 */}
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span>GST (18%)</span>
            <span>₹{bookingData.gst_amount}</span>   {/* 90 — use backend value, not recalculate */}
          </div>
          <div className="flex justify-between font-bold text-base mt-2 border-t pt-2">
            <span>Total</span>
            <span>₹{bookingData.grand_total}</span>  {/* 590 — use grand_total not total_price */}
          </div>
       </div>
        </div>

        {/* Error message */}
        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}

        {/* Pay button */}
        <button
          onClick={handlePay}
          disabled={paymentLoading}
          className="mt-4 w-full rounded-lg bg-purple-600 py-3 text-white font-semibold tracking-wide hover:bg-purple-700 transition disabled:opacity-60"
        >
          {paymentLoading ? "Opening payment..." : `Pay ₹${bookingData.total_price}`}
        </button>

        <p className="text-center text-xs text-gray-400 mt-3">
          Secured by Razorpay
        </p>
      </div>
    </div>
  );
}

}



 

export function BookingSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 md:p-10 text-center">
        {/* Success Icon */}
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Booking Confirmed!
        </h2>

        <p className="text-xl text-gray-600 mb-8">
          Your appointment has been successfully booked.
        </p>

        <p className="text-gray-700 mb-8">
          A confirmation email has been sent to your registered email address.
        </p>

        <div className="space-y-4">
          <Link
            to="/"
            className="block w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition font-semibold text-lg"
          >
            Back to Home
          </Link>
          
          <Link
            to="/services"
            className="block w-full border border-gray-300 py-3 px-6 rounded-lg hover:bg-gray-50 transition font-medium text-gray-700"
          >
            Book Another Appointment
          </Link>
        </div>

        <p className="mt-8 text-xs text-gray-500">
          Thank you for choosing us! 💇‍♀️
        </p>
      </div>
    </div>
  );
}




