// src/pages/admin/AdminPanel.jsx

//adminpanel acts as nested layout 
import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function AdminPanel() {
  return (
    <div className="flex h-full bg-gray-50">
      {/* Sidebar */}
      <Sidebar/>


      {/* Page Content */}
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
