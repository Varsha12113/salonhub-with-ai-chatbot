import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  TrendingUp,
  DollarSign,
  CreditCard,
  CheckCircle,
  Clock,
  Package,
} from "lucide-react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import {
  fetchAdminNotifications,
  acceptBooking,
  declineBooking,
} from "../../redux/Slice/adminNotificationsSlice";
import { 
  fetchDashboardStats, 
  fetchRecentBookings, 
  fetchCustomers,
  fetchChartData  
} from "../../redux/Slice/DashboardSlice";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function AdminDashboard() {
  const dispatch = useDispatch();
  
  // ✅ All dynamic data from Redux
  const { 
    stats = {}, 
    recentBookings = [], 
    customers = [],
    chartData = { labels: [], data: [] },
    status 
  } = useSelector(state => state.dashboard || {});
  
  const { items: notifications } = useSelector(state => state.adminNotifications);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const handleAccept = (bookingId) => {
    dispatch(acceptBooking(bookingId));
  };

  const handleDecline = (bookingId) => {
    dispatch(declineBooking(bookingId));
  };

// ✅ Dynamic chart config
const data = {
  labels: chartData.labels || [],          // e.g. ["Dec"]
  datasets: [
    {
      label: "Customer Visits",
      data: chartData.data || [],          // e.g. [1]
      borderColor: "oklch(55.8% 0.288 302.321)",
      backgroundColor: "rgba(236, 72, 153, 0.1)",
      fill: true,
      tension: 0.4,
    },
  ],
};

  const options = { responsive: true, plugins: { legend: { position: "top" } } };

  const showBookingToast = (notification) => {
    toast.custom((t) => (
      <div className="max-w-sm w-full bg-white shadow-lg rounded-2xl p-4 border-l-4 border-purple-500">
        <p className="text-sm font-semibold text-gray-800">New Booking #{notification.booking_id}</p>
        <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
        <p className="text-[11px] text-gray-400 mt-1">{notification.created_at}</p>
        <div className="flex gap-2 mt-3">
          <button type="button" onClick={() => { handleAccept(notification.booking_id); toast.dismiss(t.id); }} className="px-3 py-1 text-xs rounded bg-green-600 text-white">Accept</button>
          <button type="button" onClick={() => { handleDecline(notification.booking_id); toast.dismiss(t.id); }} className="px-3 py-1 text-xs rounded bg-red-600 text-white">Decline</button>
        </div>
      </div>
    ));
  };

  // ✅ Fetch ALL data
  useEffect(() => {
    dispatch(fetchDashboardStats());
    dispatch(fetchRecentBookings());
    dispatch(fetchCustomers());
     dispatch(fetchChartData());
    dispatch(fetchAdminNotifications())
      .unwrap()
      .then((data) => {
        data.forEach((n) => {
          if (n.status === "pending") showBookingToast(n);
        });
      })
      .catch(() => {});
  }, [dispatch]);

  if (status === 'loading') {
    return (
      <div className="space-y-6 pt-16 md:pt-0 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-500">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pt-16 md:pt-0 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-2xl shadow-md flex items-center justify-between border-l-4 border-purple-500">
          <div>
            <h2 className="text-gray-500 font-medium">Sales</h2>
            <p className="text-2xl font-bold text-gray-800">{stats.sales || 0}</p>
            <span className="text-sm text-gray-400">Last 24 hours</span>
          </div>
          <div className="bg-purple-100 p-3 rounded-full">
            <TrendingUp className="text-purple-500" size={28} />
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-md flex items-center justify-between border-l-4 border-green-500">
          <div>
            <h2 className="text-gray-500 font-medium">Revenue</h2>
            <p className="text-2xl font-bold text-gray-800">{formatCurrency(stats.revenue || 0)}</p>
            <span className="text-sm text-gray-400">Last 24 hours</span>
          </div>
          <div className="bg-green-100 p-3 rounded-full">
            <DollarSign className="text-green-500" size={28} />
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-md flex items-center justify-between border-l-4 border-yellow-500">
          <div>
            <h2 className="text-gray-500 font-medium">Expenses</h2>
            <p className="text-2xl font-bold text-gray-800">{formatCurrency(stats.expenses || 0)}</p>
            <span className="text-sm text-gray-400">Last 24 hours</span>
          </div>
          <div className="bg-yellow-100 p-3 rounded-full">
            <CreditCard className="text-yellow-500" size={28} />
          </div>
        </div>
      </div>

      {/* ✅ DYNAMIC Recent Bookings (Last 3) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white p-5 rounded-2xl shadow-md overflow-x-auto">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Bookings</h2>
          <table className="min-w-[600px] w-full text-sm text-left text-gray-600">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-gray-500">
                    No recent bookings
                  </td>
                </tr>
              ) : (
                recentBookings.map((booking) => (
                  <tr key={booking.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{booking.customer}</td>
                    <td className="px-4 py-3">{booking.service}</td>
                    <td className="px-4 py-3">{booking.date}</td>
                    <td className="px-4 py-3">{booking.time}</td>
                    <td className="px-4 py-3 font-semibold text-green-600">
                      {formatCurrency(booking.price)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          booking.status === "Pending"
                            ? "bg-yellow-100 text-yellow-600"
                            : booking.status === "Confirmed"
                            ? "bg-blue-100 text-blue-600"
                            : booking.status === "Completed"
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-purple-600 hover:underline cursor-pointer text-sm">Details</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Updates Section - Dynamic from customers */}
        <div className="lg:col-span-4 bg-white p-5 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Customers</h2>
          <ul className="space-y-4">
            {customers.slice(0, 3).map((customer) => (
              <li key={customer.customer_id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-semibold text-sm">
                    {customer.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-gray-700 font-medium">{customer.name}</p>
                  <p className="text-xs text-gray-500">{customer.total_bookings} bookings</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-5 rounded-2xl shadow-md">
  <h2 className="text-xl font-semibold text-gray-800 mb-4">
    Customer Trend
  </h2>
  {chartData.labels.length === 0 ? (
    <div className="flex items-center justify-center h-64 text-gray-500">
      Loading chart...
    </div>
  ) : (
    <Line data={data} options={options} height={100} />
  )}
</div>
    </div>
  );
}
