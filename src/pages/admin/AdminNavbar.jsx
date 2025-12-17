// src/pages/admin/AdminNavbar.jsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { User, LogOut,Bell  } from "lucide-react";
import {logoutUser} from "../../redux/Slice/authSlice";
import { acceptBooking, declineBooking } from "../../redux/Slice/adminNotificationsSlice";
import { useNavigate } from "react-router-dom";
import { store } from "../../redux/store/store";
export default function AdminNavbar() {
  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  const { user, role } = useSelector((state) => state.auth);
    console.log("Logging out as:", role);
    const { items: notifications = [] } = useSelector(
    (state) => state.adminNotifications
  );
  const notificationCount = notifications.filter(
    (n) => n.status === "pending"
  ).length;
 
  const [dropdownOpen, setDropdownOpen] = useState(false);

// show a toast for one notification
const showBookingToast = (notification) => {
  toast.custom((t) => (
    <div className="max-w-sm w-full bg-white shadow-lg rounded-2xl p-4 border-l-4 border-purple-500">
      <p className="text-sm font-semibold text-gray-800">
        New Booking #{notification.booking_id}
      </p>
      <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
      <p className="text-[11px] text-gray-400 mt-1">{notification.created_at}</p>
      <div className="flex gap-2 mt-3">
        <button
          type="button"
          onClick={() => {
            dispatch(acceptBooking(notification.booking_id));
            toast.dismiss(t.id);
          }}
          className="px-3 py-1 text-xs rounded bg-green-600 text-white"
        >
          Accept
        </button>
        <button
          type="button"
          onClick={() => {
            dispatch(declineBooking(notification.booking_id));
            toast.dismiss(t.id);
          }}
          className="px-3 py-1 text-xs rounded bg-red-600 text-white"
        >
          Decline
        </button>
      </div>
    </div>
  ));
};

const handleBellClick = () => {
  // open toasts only for pending notifications
  notifications
    .filter((n) => n.status === "pending")
    .forEach((n) => showBookingToast(n));
};



  const handleLogout = async () => {
  console.log("Logging out as:", role); // role from useSelector

  try {
    await dispatch(logoutUser()).unwrap(); // call backend logout
  } catch (e) {
    console.error("logoutUser error:", e);
  } finally {
    dispatch(logoutUser());                    // clear auth state + storage
    navigate("/login");                    // redirect after logout
  }
};
  return (
  <nav className="w-full bg-gradient-to-r from-purple-500 to-purple-600 shadow-md h-16 flex justify-end items-center px-6 relative z-50">
  {user && (
    <div className="flex items-center gap-4">
      {/* Notification Bell */}
        <button
      onClick={handleBellClick}
      className="relative text-white hover:text-yellow-200 transition"
      aria-label="Notifications"
    >
      <Bell className="w-6 h-6" />

      {!!notificationCount && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold h-5 min-w-[1.25rem] px-1 rounded-full flex items-center justify-center">
          {notificationCount}
        </span>
      )}
    </button>

      {/* Avatar / Profile Icon */}
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-white shadow-md hover:scale-105 transition-transform duration-200"
          aria-label="Profile"
        >
          {user.avatar ? (
            <img
              src={user.avatar}
              alt="avatar"
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <User className="w-6 h-6 text-white" />
          )}
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2 flex flex-col">
            <span className="px-4 py-2 text-gray-700 font-medium">
              {user.name || user.username}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 transition rounded-md font-semibold"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        )}
      </div>
    </div>
  )}
</nav>

  );
}
