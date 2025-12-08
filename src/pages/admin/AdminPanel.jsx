// src/pages/admin/AdminPanel.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import AdminNavbar from "./AdminNavbar"; // make sure the path is correct

export default function AdminPanel() {
  console.log("Rendering AdminPanel");
  const { user, role } = useSelector((state) => state.auth);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        {user && role === "admin" && <AdminNavbar />}

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
