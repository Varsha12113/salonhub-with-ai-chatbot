import React,{useEffect}from "react";
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const { items: notifications } = useSelector(
    (state) => state.adminNotifications
  );

  const handleAccept = (bookingId) => {
    dispatch(acceptBooking(bookingId));
  };

  const handleDecline = (bookingId) => {
    dispatch(declineBooking(bookingId));
  };

  // Sample chart data
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Customer Visits",
        data: [30, 50, 40, 70, 60, 90],
        borderColor: "oklch(55.8% 0.288 302.321)", // Tailwind pink-500
        backgroundColor: "rgba(236, 72, 153, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
    },
  };

 const showBookingToast = (notification) => {
  toast.custom(
    <div className="max-w-sm w-full bg-white shadow-lg rounded-2xl p-4 border-l-4 border-purple-500">
      <p className="text-sm font-semibold text-gray-800">
        New Booking #{notification.booking_id}
      </p>
      <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
      <p className="text-[11px] text-gray-400 mt-1">
        {notification.created_at}
      </p>

      <div className="flex gap-2 mt-3">
        <button
          onClick={() => handleAccept(notification.booking_id)}
          className="px-3 py-1 text-xs rounded bg-green-600 text-white"
        >
          Accept
        </button>
        <button
          onClick={() => handleDecline(notification.booking_id)}
          className="px-3 py-1 text-xs rounded bg-red-600 text-white"
        >
          Decline
        </button>
      </div>
    </div>
  );
};

 useEffect(() => {
    dispatch(fetchAdminNotifications())
      .unwrap()
      .then((data) => {
              console.log("NOTIFICATIONS DATA:", data);
        data.forEach((n) => {
          if (n.status === "pending") showBookingToast(n);
        });
      })
      .catch(() => {});
        
  }, [dispatch]);
 

  return (
     <div className="space-y-6 pt-16 md:pt-0 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>

   
      </div>
   
      {/* ===== Page Header ===== */}
      <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>

      {/* ===== Stats Cards ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-2xl shadow-md flex items-center justify-between border-l-4 border-purple-500">
          <div>
            <h2 className="text-gray-500 font-medium">Sales</h2>
            <p className="text-2xl font-bold text-gray-800">$25,970</p>
            <span className="text-sm text-gray-400">Last 24 hours</span>
          </div>
          <div className="bg-purple-100 p-3 rounded-full">
            <TrendingUp className="text-purple-500" size={28} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-md flex items-center justify-between border-l-4 border-red-500">
          <div>
            <h2 className="text-gray-500 font-medium">Revenue</h2>
            <p className="text-2xl font-bold text-gray-800">$14,270</p>
            <span className="text-sm text-gray-400">Last 24 hours</span>
          </div>
          <div className="bg-red-100 p-3 rounded-full">
            <DollarSign className="text-red-500" size={28} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-md flex items-center justify-between border-l-4 border-yellow-500">
          <div>
            <h2 className="text-gray-500 font-medium">Expenses</h2>
            <p className="text-2xl font-bold text-gray-800">$4,270</p>
            <span className="text-sm text-gray-400">Last 24 hours</span>
          </div>
          <div className="bg-yellow-100 p-3 rounded-full">
            <CreditCard className="text-yellow-500" size={28} />
          </div>
        </div>
      </div>

      {/* ===== Main Content Section ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
    {/* ===== Recent Bookings ===== */}
        <div className="lg:col-span-8 bg-white p-5 rounded-2xl shadow-md overflow-x-auto">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Recent Bookings
          </h2>

          <table className="min-w-[600px] w-full text-sm text-left text-gray-600">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {[
                { name: "Alice Johnson", service: "Hair Spa", date: "10 Nov 2025", status: "Approved" },
                { name: "Mark Smith", service: "Facial", date: "10 Nov 2025", status: "Pending" },
                { name: "Riya Patel", service: "Haircut", date: "9 Nov 2025", status: "Delivered" },
              ].map((b, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap">{b.name}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{b.service}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{b.date}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        b.status === "Approved"
                          ? "bg-green-100 text-green-600"
                          : b.status === "Pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center text-purple-600 hover:underline cursor-pointer whitespace-nowrap">
                    Details
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>


        {/* ===== Updates Section ===== */}
        <div className="lg:col-span-4 bg-white p-5 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Recent Updates
          </h2>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <CheckCircle className="text-green-500 mt-1" />
              <div>
                <p className="text-gray-700">
                  <strong>Neha</strong> booked a Hair Spa appointment.
                </p>
                <span className="text-xs text-gray-400">2 minutes ago</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="text-yellow-500 mt-1" />
              <div>
                <p className="text-gray-700">
                  <strong>Ravi</strong> rescheduled his Facial booking.
                </p>
                <span className="text-xs text-gray-400">30 minutes ago</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Package className="text-purple-500 mt-1" />
              <div>
                <p className="text-gray-700">
                  <strong>Priya</strong> completed her Haircut session.
                </p>
                <span className="text-xs text-gray-400">2 hours ago</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* ===== Chart Section ===== */}
      <div className="bg-white p-5 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Customer Review Trend
        </h2>
        <Line data={data} options={options} height={100} />
      </div>
    </div>
  );
}
