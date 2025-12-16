// Updated AdminAnalytics.jsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
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
 Filler, 
} from "recharts";
import {
  fetchAnalyticsSummary,
  fetchMonthlyRevenue,
  fetchServiceDistribution,
} from '../../redux/Slice/AnalyticsSlice';

export default function AdminAnalytics() {
  const dispatch = useDispatch();
  const { summary, revenueData, serviceData, loading, error } = useSelector((state) => state.analytics);

  useEffect(() => {
    dispatch(fetchAnalyticsSummary());
    dispatch(fetchMonthlyRevenue());
    dispatch(fetchServiceDistribution());
  }, [dispatch]);

  // Transform revenue data for recharts
  const chartRevenueData = revenueData.labels?.map((label, index) => ({
    month: label,
    revenue: revenueData.data?.[index] || 0,
  })) || [];

  // Transform service data for recharts
  const chartServiceData = serviceData.labels?.map((label, index) => ({
    name: label,
    value: serviceData.data[index],
  }));

  const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444"];
console.log("serviceData from API:", serviceData);
  console.log("chartServiceData for Pie:", chartServiceData);

  if (loading) return <div className="p-6">Loading analytics...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800">Analytics Overview</h1>

      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-5 rounded-2xl shadow-md">
          <p className="text-sm text-gray-500">Total Revenue</p>
          <h3 className="text-2xl font-bold mt-1 text-purple-600">
            ₹{summary.total_revenue?.toLocaleString() || '0'}
          </h3>
          <p className="text-green-500 text-xs mt-1">▲ +12% from last month</p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-md">
          <p className="text-sm text-gray-500">Appointments</p>
          <h3 className="text-2xl font-bold mt-1 text-purple-600">
            {summary.appointments?.toLocaleString() || '0'}
          </h3>
          <p className="text-green-500 text-xs mt-1">▲ +8% from last week</p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-md">
          <p className="text-sm text-gray-500">New Customers</p>
          <h3 className="text-2xl font-bold mt-1 text-emerald-600">
            {summary.new_customers?.toLocaleString() || '0'}
          </h3>
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
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Monthly Revenue</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartRevenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="#888" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#8b5cf6"
                strokeWidth={3}
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Service Pie Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Service Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartServiceData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label
              >
                {chartServiceData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
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
