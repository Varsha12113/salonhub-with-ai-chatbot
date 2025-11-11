import React, { useState } from "react";
import { Search, Filter, Eye, Edit, Trash2 } from "lucide-react";

export default function AdminOrders() {
  // 🔹 Dummy salon order data
  const [orders] = useState([
    {
      id: "ORD001",
      customer: "Neha Sharma",
      service: "Hair Spa",
      date: "10 Nov 2025",
      time: "11:00 AM",
      price: 1200,
      status: "Approved",
    },
    {
      id: "ORD002",
      customer: "Ravi Kumar",
      service: "Facial",
      date: "10 Nov 2025",
      time: "02:00 PM",
      price: 800,
      status: "Pending",
    },
    {
      id: "ORD003",
      customer: "Priya Singh",
      service: "Haircut",
      date: "9 Nov 2025",
      time: "05:00 PM",
      price: 500,
      status: "Completed",
    },
    {
      id: "ORD004",
      customer: "Amit Verma",
      service: "Pedicure",
      date: "9 Nov 2025",
      time: "04:00 PM",
      price: 900,
      status: "Cancelled",
    },
  ]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // 🔹 Filtered data
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.customer
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus =
      filter === "All" ? true : order.status === filter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* ===== Header ===== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Orders</h1>

        <div className="flex flex-wrap items-center gap-3 mt-4 sm:mt-0">
          {/* Search */}
          <div className="flex items-center bg-white border rounded-lg px-3 py-2 shadow-sm">
            <Search size={18} className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search by customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="outline-none text-sm text-gray-600"
            />
          </div>

          {/* Filter */}
          <div className="flex items-center bg-white border rounded-lg px-3 py-2 shadow-sm">
            <Filter size={18} className="text-gray-400 mr-2" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="outline-none text-sm text-gray-600 bg-transparent"
            >
              <option>All</option>
              <option>Pending</option>
              <option>Approved</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* ===== Orders Table ===== */}
      <div className="bg-white p-5 rounded-2xl shadow-md overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Service</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Time</th>
              <th className="px-4 py-3">Price (₹)</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-6 text-gray-400">
                  No matching orders found.
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {order.id}
                  </td>
                  <td className="px-4 py-3">{order.customer}</td>
                  <td className="px-4 py-3">{order.service}</td>
                  <td className="px-4 py-3">{order.date}</td>
                  <td className="px-4 py-3">{order.time}</td>
                  <td className="px-4 py-3 font-semibold text-gray-700">
                    ₹{order.price}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === "Approved"
                          ? "bg-green-100 text-green-600"
                          : order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : order.status === "Completed"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-3 text-gray-500">
                      <Eye
                        size={18}
                        className="cursor-pointer hover:text-pink-600"
                        title="View Details"
                      />
                      <Edit
                        size={18}
                        className="cursor-pointer hover:text-yellow-600"
                        title="Edit Order"
                      />
                      <Trash2
                        size={18}
                        className="cursor-pointer hover:text-red-600"
                        title="Delete Order"
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ===== Summary Section ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-md p-5">
          <h3 className="text-gray-500 text-sm font-medium">Total Orders</h3>
          <p className="text-2xl font-bold text-gray-800 mt-1">
            {orders.length}
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-5">
          <h3 className="text-gray-500 text-sm font-medium">
            Completed Orders
          </h3>
          <p className="text-2xl font-bold text-blue-600 mt-1">
            {orders.filter((o) => o.status === "Completed").length}
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-5">
          <h3 className="text-gray-500 text-sm font-medium">Pending Orders</h3>
          <p className="text-2xl font-bold text-yellow-600 mt-1">
            {orders.filter((o) => o.status === "Pending").length}
          </p>
        </div>
      </div>
    </div>
  );
}
