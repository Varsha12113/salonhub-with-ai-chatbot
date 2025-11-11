import { NavLink } from "react-router-dom";
import { LayoutDashboard, ShoppingBag, Users, BarChart } from "lucide-react";
import { MdOutlineSpa  } from "react-icons/md";

export default function Sidebar() {
  const navItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/admin/dashboard" },
    { name: "Orders", icon: <ShoppingBag size={20} />, path: "/admin/orders" },
    { name: "Customers", icon: <Users size={20} />, path: "/admin/customers" },
    { name: "Services", icon: <MdOutlineSpa  size={20} />, path: "/admin/services" },
    { name: "Analytics", icon: <BarChart size={20} />, path: "/admin/analytics" },
  ];

  return (
    <aside className="w-64 bg-white shadow-lg p-5 flex flex-col">
      <h1 className="text-2xl font-bold text-purple-600 mb-10">Salon Admin</h1>

      <nav className="flex flex-col gap-3">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-lg transition ${
                isActive ? "bg-pink-100 text-purple-600" : "text-gray-600 hover:bg-pink-50"
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
