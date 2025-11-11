import React, { useState } from "react";

export default function AdminServices() {
  const [services] = useState([
    {
      id: 1,
      name: "Haircut",
      category: "Hair",
      price: "₹500",
      duration: "30 mins",
      bookings: 120,
      status: "Active",
    },
    {
      id: 2,
      name: "Facial",
      category: "Skin",
      price: "₹800",
      duration: "45 mins",
      bookings: 90,
      status: "Active",
    },
    {
      id: 3,
      name: "Manicure",
      category: "Nails",
      price: "₹600",
      duration: "40 mins",
      bookings: 75,
      status: "Inactive",
    },
    {
      id: 4,
      name: "Hair Spa",
      category: "Hair",
      price: "₹1000",
      duration: "1 hr",
      bookings: 60,
      status: "Active",
    },
  ]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Salon Services
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-5 rounded-2xl shadow-md">
          <p className="text-sm text-gray-500">Total Services</p>
          <h3 className="text-2xl font-bold mt-1 text-purple-600">24</h3>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-md">
          <p className="text-sm text-gray-500">Active Services</p>
          <h3 className="text-2xl font-bold mt-1 text-green-600">18</h3>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-md">
          <p className="text-sm text-gray-500">Inactive Services</p>
          <h3 className="text-2xl font-bold mt-1 text-red-500">6</h3>
        </div>
      </div>

      {/* Services Table */}
      <div className="bg-white p-6 rounded-2xl shadow-md overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Service List
        </h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-purple-100 text-gray-700">
              <th className="p-3 font-semibold">#</th>
              <th className="p-3 font-semibold">Service Name</th>
              <th className="p-3 font-semibold">Category</th>
              <th className="p-3 font-semibold">Price</th>
              <th className="p-3 font-semibold">Duration</th>
              <th className="p-3 font-semibold">Bookings</th>
              <th className="p-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, index) => (
              <tr
                key={service.id}
                className="border-b hover:bg-purple-50 transition-all"
              >
                <td className="p-3">{index + 1}</td>
                <td className="p-3 font-medium text-gray-800">
                  {service.name}
                </td>
                <td className="p-3">{service.category}</td>
                <td className="p-3">{service.price}</td>
                <td className="p-3">{service.duration}</td>
                <td className="p-3">{service.bookings}</td>
                <td
                  className={`p-3 font-semibold ${
                    service.status === "Active"
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {service.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
