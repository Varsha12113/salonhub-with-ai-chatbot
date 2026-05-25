
// src/hooks/useRazorpay.js
import api from "../config/httphandler";  

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export async function initiatePayment({ bookingId, onSuccess, onFailure }) {
  const loaded = await loadRazorpayScript();
  if (!loaded) return onFailure("Razorpay SDK failed to load");

  let order;
  try {
    const res = await api.post("/api/booking/payment/create-order/", {
      booking_id: bookingId,
    });
    order = res.data;
  } catch (err) {
    return onFailure(err.detail || err.message || "Failed to create order");
  }

  const options = {
    key:         order.key,
    amount:      order.amount,
    currency:    order.currency,
    name:        order.name,
    description: order.description,
    order_id:    order.razorpay_order_id,
    prefill:     order.prefill,
    theme:       { color: "#7b13c5" },

    handler: async (response) => {
      try {
        const res = await api.post("/api/booking/payment/verify/", {
          razorpay_order_id:   response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature:  response.razorpay_signature,
        });
        onSuccess(res.data);
      } catch (err) {
        onFailure(err.detail || "Payment verification failed");
      }
    },

    modal: {
      ondismiss: () => onFailure("Payment cancelled"),
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
}