import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import { LayoutDashboard, ShoppingBag, Users, BarChart, Menu, X, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { useLocation } from "react-router-dom";
import { MdOutlineSpa } from "react-icons/md";



export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [schedulerOpen, setSchedulerOpen] = useState(false); // submenu state
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/admin/dashboard" },
    { name: "Orders", icon: <ShoppingBag size={20} />, path: "/admin/orders" },
    { name: "Customers", icon: <Users size={20} />, path: "/admin/customers" },
    { name: "Services", icon: <MdOutlineSpa size={20} />, path: "/admin/services" },
    { name: "Analytics", icon: <BarChart size={20} />, path: "/admin/analytics", },
    { name: "Scheduler", icon: <Calendar size={20} />, path:  "/admin", submenu: [
        { name: "Slot Masters", path: "/admin/scheduler/slot-masters" },
        { name: "Working Days", path: "/admin/scheduler/working-days" },
        { name: "Holidays", path: "/admin/scheduler/holidays" },
        { name: "Daily Slots", path: "/admin/scheduler/daily-slots" },
      ] 
    },
  ];


  

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-purple-600 text-white p-2 rounded-lg shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full md:h-auto w-64 bg-white shadow-lg p-5 flex flex-col transform transition-transform duration-300 z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <h1 className="text-2xl font-bold text-purple-600 mb-10">Salon Admin</h1>

        <nav className="flex flex-col gap-3">
          {navItems.map((item) => {
            const isScheduler = !!item.submenu;
            // determine if any submenu route matches current location
            const activeParent = isScheduler && item.submenu.some((s) => location.pathname.startsWith(s.path));
            return (
              <div key={item.name}>
                {/* If item has submenu, render a toggle button instead of direct NavLink */}
                {isScheduler ? (
                  <button
                    type="button"
                    onClick={() => {
                      setSchedulerOpen((s) => !s);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between gap-3 p-2 rounded-lg transition text-left ${
                      activeParent ? "bg-purple-100 text-purple-700 font-semibold" : "text-gray-600 hover:bg-purple-50"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.name}</span>
                    </span>
                    <span className="ml-2">
                      {schedulerOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </span>
                  </button>
                ) : (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-2 rounded-lg transition ${
                        isActive
                          ? "bg-purple-100 text-purple-700 font-semibold"
                          : "text-gray-600 hover:bg-purple-50"
                      }`
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </NavLink>
                )}

                {/* Submenu for Scheduler */}
                {isScheduler && schedulerOpen && (
                  <div className="flex flex-col ml-8 mt-1 gap-1">
                    {item.submenu.map((sub) => (
                      <NavLink
                        key={sub.name}
                        to={sub.path}
                        className={({ isActive }) =>
                          `text-gray-600 hover:text-purple-700 hover:bg-purple-50 p-2 rounded-lg transition ${
                            isActive ? "bg-purple-100 text-purple-700 font-semibold" : ""
                          }`
                        }
                        onClick={() => setIsOpen(false)}
                      >
                        {sub.name}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>

      {/* Background overlay when sidebar is open on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
