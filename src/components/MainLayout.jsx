import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Toast from "./Toast";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
  {/* Global Navbar */}
  <Navbar />
  {/* Global Toasts */}
  <Toast />
      
      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
