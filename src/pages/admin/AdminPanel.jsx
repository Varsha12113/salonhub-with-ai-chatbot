// src/pages/admin/AdminPanel.jsx

//adminpanel acts as nested layout 
import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function AdminPanel() {
  return (
    <div className="flex h-full bg-gray-50">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-white border-r shadow-md flex flex-col">
        <div className="p-4 text-xl font-semibold border-b">🛠️ Admin Panel</div>

        <nav className="flex-1 p-4 space-y-2">
          <NavLink
            to="dashboard"
            className={({ isActive }) =>
              `block px-4 py-2 rounded hover:bg-blue-100 ${
                isActive ? "bg-blue-200 font-semibold" : ""
              }`
            }
          >
            📊 Admin Dashboard
          </NavLink>

          <NavLink
            to="appointments"
            className={({ isActive }) =>
              `block px-4 py-2 rounded hover:bg-blue-100 ${
                isActive ? "bg-blue-200 font-semibold" : ""
              }`
            }
          >
            📅 Appointments
          </NavLink>

          <NavLink
            to="add-provider"
            className={({ isActive }) =>
              `block px-4 py-2 rounded hover:bg-blue-100 ${
                isActive ? "bg-blue-200 font-semibold" : ""
              }`
            }
          >
            ➕ Add Provider
          </NavLink>

          <NavLink
            to="providers"
            className={({ isActive }) =>
              `block px-4 py-2 rounded hover:bg-blue-100 ${
                isActive ? "bg-blue-200 font-semibold" : ""
              }`
            }
          >
            👥 Provider List
          </NavLink>
        </nav>
      </aside>

      {/* Page Content */}
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
