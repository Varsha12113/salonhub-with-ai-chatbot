// src/pages/admin/AdminPanel.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import AdminNavbar from "./AdminNavbar"; // make sure the path is correct
import { Toaster } from "react-hot-toast";

export default function AdminPanel() {
  const { user, role } = useSelector((state) => state.auth);

  return (
     <div className="flex min-h-screen">
      <Toaster position="top-right" />

      <Sidebar />

      <div className="flex-1 flex flex-col bg-gray-50">
        <AdminNavbar />          {/* visible on ALL /admin pages */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <Outlet />             {/* AdminDashboard, Orders, Customers, ... */}
        </main>
      </div>
    </div>
  );
}
