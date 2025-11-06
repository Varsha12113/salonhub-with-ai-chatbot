import React from "react";

export default function Payment() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 to-white">
      <h1 className="text-3xl font-bold mb-6 text-purple-700">Payment</h1>
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <p className="text-gray-700 mb-4">This is a placeholder for your payment flow.</p>
        <p className="text-gray-500">Integrate your payment gateway here.</p>
      </div>
    </div>
  );
}
