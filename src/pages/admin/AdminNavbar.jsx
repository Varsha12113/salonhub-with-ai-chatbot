// src/pages/admin/AdminNavbar.jsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { User, LogOut } from "lucide-react";
import {logoutUser} from "../../redux/Slice/authSlice";
import { useNavigate } from "react-router-dom";
import { store } from "../../redux/store/store";
export default function AdminNavbar() {
  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  const { user, role } = useSelector((state) => state.auth);
    console.log("Logging out as:", role); 
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
        <div className="relative">
          {/* Avatar / Profile Icon */}
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

          {/* Dropdown */}
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
      )}
    </nav>
  );
}
