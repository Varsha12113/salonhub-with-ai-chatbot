import React, { useState } from "react";
import { Search, Filter, Eye, Edit, Trash2, Star } from "lucide-react";

export default function Customers() {
  // 🔹 Dummy salon customer data
  const [customers] = useState([
    {
      id: "CUS001",
      name: "Neha Sharma",
      email: "neha.sharma@gmail.com",
      phone: "+91 9876543210",
      totalBookings: 12,
      lastVisit: "9 Nov 2025",
      loyalty: "Gold",
    },
    {
      id: "CUS002",
      name: "Ravi Kumar",
      email: "ravi.kumar@gmail.com",
      phone: "+91 9988776655",
      totalBookings: 5,
      lastVisit: "8 Nov 2025",
      loyalty: "Silver",
    },
    {
      id: "CUS003",
      name: "Priya Singh",
      email: "priya.singh@gmail.com",
      phone: "+91 9900112233",
      totalBookings: 2,
      lastVisit: "5 Nov 2025",
      loyalty: "Bronze",
    },
    {
      id: "CUS004",
      name: "Amit Verma",
      email: "amit.verma@gmail.com",
      phone: "+91 9123456789",
      totalBookings: 8,
      lastVisit: "6 Nov 2025",
      loyalty: "Silver",
    },
  ]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // 🔹 Filter customers by search or loyalty
  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.email.toLowerCase().includes(search.toLowerCase());
    const matchesLoyalty =
      filter === "All" ? true : customer.loyalty === filter;
    return matchesSearch && matchesLoyalty;
  });

  return (
    <div className="space-y-6">
      {/* ===== Header ===== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Customers</h1>

        <div className="flex flex-wrap items-center gap-3 mt-4 sm:mt-0">
          {/* Search */}
          <div className="flex items-center bg-white border rounded-lg px-3 py-2 shadow-sm">
            <Search size={18} className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search by name or email..."
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
              <option>Gold</option>
              <option>Silver</option>
              <option>Bronze</option>
            </select>
          </div>
        </div>
      </div>

      {/* ===== Customers Table ===== */}
      <div className="bg-white p-5 rounded-2xl shadow-md overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Customer ID</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Total Bookings</th>
              <th className="px-4 py-3">Last Visit</th>
              <th className="px-4 py-3">Loyalty</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-6 text-gray-400">
                  No customers found.
                </td>
              </tr>
            ) : (
              filteredCustomers.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {customer.id}
                  </td>
                  <td className="px-4 py-3">{customer.name}</td>
                  <td className="px-4 py-3">{customer.email}</td>
                  <td className="px-4 py-3">{customer.phone}</td>
                  <td className="px-4 py-3 text-center font-semibold">
                    {customer.totalBookings}
                  </td>
                  <td className="px-4 py-3">{customer.lastVisit}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${
                        customer.loyalty === "Gold"
                          ? "bg-yellow-100 text-yellow-700"
                          : customer.loyalty === "Silver"
                          ? "bg-gray-100 text-gray-600"
                          : "bg-orange-100 text-orange-600"
                      }`}
                    >
                      <Star size={14} />
                      {customer.loyalty}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-3 text-gray-500">
                      <Eye
                        size={18}
                        className="cursor-pointer hover:text-purple-600"
                        title="View Profile"
                      />
                      <Edit
                        size={18}
                        className="cursor-pointer hover:text-yellow-600"
                        title="Edit Customer"
                      />
                      <Trash2
                        size={18}
                        className="cursor-pointer hover:text-red-600"
                        title="Delete Customer"
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ===== Summary Cards ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-md p-5">
          <h3 className="text-gray-500 text-sm font-medium">Total Customers</h3>
          <p className="text-2xl font-bold text-gray-800 mt-1">
            {customers.length}
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-5">
          <h3 className="text-gray-500 text-sm font-medium">Gold Members</h3>
          <p className="text-2xl font-bold text-yellow-600 mt-1">
            {customers.filter((c) => c.loyalty === "Gold").length}
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-5">
          <h3 className="text-gray-500 text-sm font-medium">Silver Members</h3>
          <p className="text-2xl font-bold text-gray-600 mt-1">
            {customers.filter((c) => c.loyalty === "Silver").length}
          </p>
        </div>
      </div>
    </div>
  );
}
