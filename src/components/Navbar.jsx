import React, { useState, useEffect } from "react";
import { Menu, X, ChevronDown, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaMale, FaFemale, FaCut } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getGenders, getMainServices } from "../redux/Slice/genderSlice";
import { getCartCount } from "../utils/cart";
import CartDrawer from "./CartDrawer";
import { logout } from "../redux/Slice/authSlice"; // import logout
import { User } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { genders, mainServices } = useSelector((state) => state.gender);
  const { user } = useSelector((state) => state.auth);

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [subDropdownOpen, setSubDropdownOpen] = useState(null);
  const [selectedGenderId, setSelectedGenderId] = useState(null);
  const [cartCount, setCartCount] = useState(() => getCartCount());
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [avatarDropdownOpen, setAvatarDropdownOpen] = useState(false);

  const toggleDropdown = (menu) => {
    setDropdownOpen(dropdownOpen === menu ? null : menu);
    setSubDropdownOpen(null);
  };

  const toggleSubDropdown = (menu) => {
    setSubDropdownOpen(subDropdownOpen === menu ? null : menu);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    dispatch(getGenders());
    const handler = () => setCartCount(getCartCount());
    window.addEventListener("cartUpdated", handler);
    return () => window.removeEventListener("cartUpdated", handler);
  }, [dispatch]);

  useEffect(() => {
    if (selectedGenderId) {
      dispatch(getMainServices(selectedGenderId));
    }
  }, [selectedGenderId, dispatch]);

  return (
    <>
      <nav className="w-full bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          {/* ---------- Logo ---------- */}
          <Link to="/" className="text-2xl font-bold text-gray-800">
            Glowup<span className="text-purple-500">Salon</span>
          </Link>

          {/* ---------- Desktop Menu ---------- */}
          <ul className="hidden md:flex gap-6 text-gray-700 font-medium">
            <li>
              <Link to="/" className="hover:text-purple-500 transition">
                Home
              </Link>
            </li>
           <li>
  <Link to="/services" className="hover:text-purple-500 transition">
    Services
  </Link>
</li>
            <li>
              <Link to="/about" className="hover:text-purple-500 transition">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-purple-500 transition">
                Contact
              </Link>
            </li>
          </ul>

          {/* ---------- Cart + User Avatar / Login ---------- */}
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setDrawerOpen(true)}
              className="hidden md:inline-flex relative items-center text-gray-700 hover:text-purple-500"
              aria-label="Open cart"
            >
              <FaShoppingCart className="text-2xl" />
              <span className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            </button>

      {/* Login Button */}
    <button
      onClick={() => {navigate('/login'); }}
      className="px-3 py-2 bg-purple-600 text-white rounded-md"
    >
      Login
    </button>
          </div>

          {/* ---------- Mobile Menu Toggle ---------- */}
          <div
            className="md:hidden cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </div>
        </div>

        {/* ---------- Mobile Dropdown ---------- */}
        {menuOpen && (
          <ul className="md:hidden bg-white shadow-md py-4 px-6 space-y-3 text-gray-700 font-medium">
            {/* ...mobile links same as before */}
          </ul>
        )}
      </nav>

      <CartDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
};

export default Navbar;


