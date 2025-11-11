import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function AdminAnalytics() {
  // Dummy revenue data (monthly)
  const revenueData = [
    { month: "Jan", revenue: 12000 },
    { month: "Feb", revenue: 15000 },
    { month: "Mar", revenue: 17000 },
    { month: "Apr", revenue: 14000 },
    { month: "May", revenue: 19000 },
    { month: "Jun", revenue: 22000 },
  ];

  // Service distribution
  const serviceData = [
    { name: "Haircut", value: 40 },
    { name: "Spa", value: 25 },
    { name: "Facial", value: 20 },
    { name: "Manicure", value: 15 },
  ];

  const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444"];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-gray-800">Analytics Overview</h1>

      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-5 rounded-2xl shadow-md">
          <p className="text-sm text-gray-500">Total Revenue</p>
          <h3 className="text-2xl font-bold mt-1 text-purple-600">₹82,500</h3>
          <p className="text-green-500 text-xs mt-1">▲ +12% from last month</p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-md">
          <p className="text-sm text-gray-500">Appointments</p>
          <h3 className="text-2xl font-bold mt-1 text-purple-600">1,240</h3>
          <p className="text-green-500 text-xs mt-1">▲ +8% from last week</p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-md">
          <p className="text-sm text-gray-500">New Customers</p>
          <h3 className="text-2xl font-bold mt-1 text-emerald-600">320</h3>
          <p className="text-green-500 text-xs mt-1">▲ +10% this month</p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-md">
          <p className="text-sm text-gray-500">Products Sold</p>
          <h3 className="text-2xl font-bold mt-1 text-yellow-600">580</h3>
          <p className="text-red-500 text-xs mt-1">▼ -5% this week</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Line Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Monthly Revenue
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="#888" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#8b5cf6"  // purple-600
                strokeWidth={3}
                dot={{ r: 5 }}
                />

            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Service Pie Chart */}
       <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Service Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={serviceData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#a855f7" 
                dataKey="value"
                label
              >
                {serviceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
