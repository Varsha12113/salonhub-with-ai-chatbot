import React, { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaMale,
  FaFemale,
  FaSpa,
  FaPaintBrush,
  FaGem,
  FaCut,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getGenders, getMainServices } from "../redux/Slice/genderSlice";
import { getCartCount } from "../utils/cart";
import CartDrawer from "./CartDrawer";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { genders, mainServices } = useSelector((state) => state.gender);

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [subDropdownOpen, setSubDropdownOpen] = useState(null);
  const [selectedGenderId, setSelectedGenderId] = useState(null);
  const [cartCount, setCartCount] = useState(() => getCartCount());
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDropdown = (menu) => {
    setDropdownOpen(dropdownOpen === menu ? null : menu);
    setSubDropdownOpen(null);
  };

  const toggleSubDropdown = (menu) => {
    setSubDropdownOpen(subDropdownOpen === menu ? null : menu);
  };

  useEffect(() => {
    dispatch(getGenders());
    const handler = () => setCartCount(getCartCount());
    window.addEventListener("cartUpdated", handler);
    return () => window.removeEventListener("cartUpdated", handler);
  }, [dispatch]);

  // Fetch main services when a gender is selected
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

            {/* ---------- Services Dropdown ---------- */}
            <li className="relative group">
              <div
                onClick={() => toggleDropdown("services")}
                className="flex items-center gap-1 cursor-pointer hover:text-purple-500 relative"
              >
                Services <ChevronDown size={16} />
              </div>

              {dropdownOpen === "services" && (
                <div
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[90vw] max-w-[500px] 
bg-white shadow-lg rounded-2xl border-[0.5px] border-gray-200 p-3 z-50
before:content-[''] before:absolute before:top-[-6px] before:left-1/2 before:-translate-x-1/2 
before:w-2.5 before:h-2.5 before:bg-white before:rotate-45 before:border-t-[0.5px] before:border-l-[0.5px] before:border-gray-200"
                >
                  {/* STEP 1: Select Gender */}
                  {!subDropdownOpen && (
                    <div className="grid grid-cols-2 gap-2 text-center">
                      {genders?.map((g) => (
                        <div
                          key={g.id}
                          onClick={() => {
                            setSubDropdownOpen(g.name);
                            setSelectedGenderId(g.id);
                          }}
                          className={`cursor-pointer transition p-1.5 rounded-md flex flex-col items-center
                            ${g.name === "female" ? "bg-purple-50 hover:bg-purple-100" : ""}
                            ${g.name === "male" ? "bg-blue-50 hover:bg-blue-100" : ""}`}
                        >
                          {g.name === "female" && (
                            <FaFemale className="text-lg text-purple-500 mb-1" />
                          )}
                          {g.name === "male" && (
                            <FaMale className="text-lg text-blue-500 mb-1" />
                          )}
                          <span className="text-xs font-medium text-gray-700 capitalize">
                            {g.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* STEP 2: Show Main Services dynamically */}
                  {subDropdownOpen && mainServices?.length > 0 && (
                    <div className="flex flex-col gap-1.5">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-xs font-semibold text-gray-600 flex items-center gap-2 capitalize">
                          {subDropdownOpen === "female" ? (
                            <FaFemale className="text-purple-500" />
                          ) : (
                            <FaMale className="text-blue-500" />
                          )}{" "}
                          {subDropdownOpen} Services
                        </h4>
                        <button
                          className="text-xs text-gray-500 hover:text-purple-600"
                          onClick={() => setSubDropdownOpen(null)}
                        >
                          ← Back
                        </button>
                      </div>

                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {mainServices.map((service) => (
                          <li key={service.id}>
                            <Link
                              to={`/services/${service.gender}/${service.main_services_name}`}
                              onClick={() => setDropdownOpen(null)}
                              className="flex items-center gap-3 p-2 rounded hover:bg-purple-50 transition capitalize"
                            >
                              <FaCut className="text-purple-500" />
                              {service.main_services_name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
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

          {/* ---------- Cart + Login ---------- */}
          <div className="flex items-center space-x-4">
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

            <button
              onClick={() => navigate("/login")}
              className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:scale-105 transition-all duration-300"
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
            <li>
              <Link
                to="/"
                className="hover:text-purple-500 transition"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
            </li>

            <li>
              <div
                onClick={() => toggleDropdown("services")}
                className="flex items-center justify-between cursor-pointer hover:text-purple-500"
              >
                Services <ChevronDown size={16} />
              </div>

              {dropdownOpen === "services" && (
                <div className="pl-4 mt-2 space-y-2">
                  {genders?.map((g) => (
                    <div
                      key={g.id}
                      onClick={() => {
                        setSubDropdownOpen(g.name);
                        setSelectedGenderId(g.id);
                      }}
                      className="cursor-pointer hover:text-purple-500"
                    >
                      {g.name} Services
                    </div>
                  ))}

                  {subDropdownOpen && mainServices?.length > 0 && (
                    <ul className="pl-4 space-y-1 text-sm">
                      {mainServices.map((service) => (
                        <li key={service.id}>
                          <Link
                            to={`/services/${service.gender}/${service.main_services_name}`}
                            className="hover:text-purple-500 block"
                            onClick={() => setMenuOpen(false)}
                          >
                            {service.main_services_name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </li>

            <li>
              <Link
                to="/about"
                className="hover:text-purple-500 transition"
                onClick={() => setMenuOpen(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-purple-500 transition"
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </Link>
            </li>
          </ul>
        )}
      </nav>

      <CartDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
};

export default Navbar;
