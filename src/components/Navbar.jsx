import React, { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaMale, FaFemale,  FaSpa, FaPaintBrush, FaGem } from "react-icons/fa";
import { getCartCount } from "../utils/cart";
import CartDrawer from './CartDrawer';
import { FaCut } from "react-icons/fa";
const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [subDropdownOpen, setSubDropdownOpen] = useState(null);
  const [cartCount, setCartCount] = useState(() => getCartCount());
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDropdown = (menu) => {
    setDropdownOpen(dropdownOpen === menu ? null : menu);
    setSubDropdownOpen(null);
  };

  const toggleSubDropdown = (menu) => {
    setSubDropdownOpen(subDropdownOpen === menu ? null : menu);
  };

  React.useEffect(() => {
    const handler = () => setCartCount(getCartCount());
    window.addEventListener('cartUpdated', handler);
    return () => window.removeEventListener('cartUpdated', handler);
  }, []);

  return (
    <>
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* ---------- Logo ---------- */}
        <Link to="/" className="text-2xl font-bold text-gray-800">
          Salon<span className="text-purple-500">Style</span>
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
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[880px] bg-white shadow-2xl rounded-xl border border-gray-100 p-6 z-50">
                <div className="grid grid-cols-12 gap-6">
                  {/* Female column */}
                  <div className="col-span-5">
                    <h4 className="text-sm font-semibold text-gray-600 mb-3 flex items-center gap-2"><FaFemale /> Female Services</h4>
                    <ul className="space-y-2">
                      <li>
                        <Link to="/services/female/hair" onClick={() => setDropdownOpen(null)} className="flex items-start gap-3 p-2 rounded hover:bg-purple-50">
                          <FaCut className="text-purple-500 mt-1" />
                          <div>
                            <div className="font-medium">Hair</div>
                            <div className="text-xs text-gray-500">Cuts, coloring & styling</div>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link to="/services/female/makeup" onClick={() => setDropdownOpen(null)} className="flex items-start gap-3 p-2 rounded hover:bg-purple-50">
                          <FaPaintBrush className="text-purple-500 mt-1" />
                          <div>
                            <div className="font-medium">Makeup</div>
                            <div className="text-xs text-gray-500">Bridal & party makeup</div>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link to="/services/female/waxing" onClick={() => setDropdownOpen(null)} className="flex items-start gap-3 p-2 rounded hover:bg-purple-50">
                          <FaSpa className="text-purple-500 mt-1" />
                          <div>
                            <div className="font-medium">Waxing</div>
                            <div className="text-xs text-gray-500">Face, body & bikini</div>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link to="/services/female/manicure-pedicure" onClick={() => setDropdownOpen(null)} className="flex items-start gap-3 p-2 rounded hover:bg-purple-50">
                          <FaGem className="text-purple-500 mt-1" />
                          <div>
                            <div className="font-medium">Manicure & Pedicure</div>
                            <div className="text-xs text-gray-500">Nail care & polish</div>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link to="/services/female/bridal" onClick={() => setDropdownOpen(null)} className="flex items-start gap-3 p-2 rounded hover:bg-purple-50">
                          <FaGem className="text-purple-500 mt-1" />
                          <div>
                            <div className="font-medium">Bridal</div>
                            <div className="text-xs text-gray-500">Complete bridal packages</div>
                          </div>
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Male column */}
                  <div className="col-span-5">
                    <h4 className="text-sm font-semibold text-gray-600 mb-3 flex items-center gap-2"><FaMale /> Male Services</h4>
                    <ul className="space-y-2">
                      <li>
                        <Link to="/services/male/hair" onClick={() => setDropdownOpen(null)} className="flex items-start gap-3 p-2 rounded hover:bg-purple-50">
                          <FaCut className="text-purple-500 mt-1" />
                          <div>
                            <div className="font-medium">Hair</div>
                            <div className="text-xs text-gray-500">Cuts & styling</div>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link to="/services/male/facial" onClick={() => setDropdownOpen(null)} className="flex items-start gap-3 p-2 rounded hover:bg-purple-50">
                          <FaSpa className="text-purple-500 mt-1" />
                          <div>
                            <div className="font-medium">Facial</div>
                            <div className="text-xs text-gray-500">Skin treatments</div>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link to="/services/male/beard-trim" onClick={() => setDropdownOpen(null)} className="flex items-start gap-3 p-2 rounded hover:bg-purple-50">
                          <FaGem className="text-purple-500 mt-1" />
                          <div>
                            <div className="font-medium">Beard Trim</div>
                            <div className="text-xs text-gray-500">Shaping & grooming</div>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link to="/services/male/manicure-pedicure" onClick={() => setDropdownOpen(null)} className="flex items-start gap-3 p-2 rounded hover:bg-purple-50">
                          <FaGem className="text-purple-500 mt-1" />
                          <div>
                            <div className="font-medium">Manicure & Pedicure</div>
                            <div className="text-xs text-gray-500">Hand & foot care</div>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link to="/services/male/bridal" onClick={() => setDropdownOpen(null)} className="flex items-start gap-3 p-2 rounded hover:bg-purple-50">
                          <FaCut className="text-purple-500 mt-1" />
                          <div>
                            <div className="font-medium">Bridal (Groom)</div>
                            <div className="text-xs text-gray-500">Groom packages</div>
                          </div>
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Promo / CTA */}
                  <div className="col-span-2 flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
                    <div className="text-sm font-semibold text-purple-600 mb-2">Featured</div>
                    <div className="font-bold text-lg mb-2">Summer Glow Pack</div>
                    <p className="text-xs text-gray-600 mb-4 text-center">Save 20% on combined hair + facial packages. Limited time.</p>
                    <Link to="/services" onClick={() => setDropdownOpen(null)} className="px-3 py-2 bg-purple-500 text-white rounded">Explore all services</Link>
                  </div>
                </div>
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

        {/* ---------- Cart Icon (desktop) + Login Button ---------- */}
        <div className="flex items-center space-x-4">
          {/* Cart link - hidden on small screens */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="hidden md:inline-flex relative items-center text-gray-700 hover:text-purple-500"
            aria-label="Open cart"
          >
            <FaShoppingCart className="text-2xl" />
            {/* small badge showing cart count */}
            <span className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{cartCount}</span>
          </button>

          <button 
            onClick={() => navigate('/login')} 
            className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:scale-105 transition-all duration-300">
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
                {/* Male Services */}
                <div
                  onClick={() => toggleSubDropdown("male")}
                  className="cursor-pointer hover:text-purple-500"
                >
                  Male Services
                </div>
                {subDropdownOpen === "male" && (
                  <ul className="pl-4 space-y-1 text-sm">
                    <li>
                      <Link
                        to="/services/male/hair"
                        className="hover:text-purple-500 block"
                        onClick={() => setMenuOpen(false)}
                      >
                        Hair
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/services/male/beard-trim"
                        className="hover:text-purple-500 block"
                        onClick={() => setMenuOpen(false)}
                      >
                        Beard Trim
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/services/male/facial"
                        className="hover:text-purple-500 block"
                        onClick={() => setMenuOpen(false)}
                      >
                        Facial
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/services/male/manicure-pedicure"
                        className="hover:text-purple-500 block"
                        onClick={() => setMenuOpen(false)}
                      >
                        Manicure & Pedicure
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/services/male/bridal"
                        className="hover:text-purple-500 block"
                        onClick={() => setMenuOpen(false)}
                      >
                        Bridal
                      </Link>
                    </li>
                  </ul>
                )}

                {/* Female Services */}
                <div
                  onClick={() => toggleSubDropdown("female")}
                  className="cursor-pointer hover:text-purple-500"
                >
                  Female Services
                </div>
                {subDropdownOpen === "female" && (
                  <ul className="pl-4 space-y-1 text-sm">
                    <li>
                      <Link
                        to="/services/female/hair"
                        className="hover:text-purple-500 block"
                        onClick={() => setMenuOpen(false)}
                      >
                        Hair
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/services/female/makeup"
                        className="hover:text-purple-500 block"
                        onClick={() => setMenuOpen(false)}
                      >
                        Makeup
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/services/female/waxing"
                        className="hover:text-purple-500 block"
                        onClick={() => setMenuOpen(false)}
                      >
                        Waxing
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/services/female/bridal"
                        className="hover:text-purple-500 block"
                        onClick={() => setMenuOpen(false)}
                      >
                        Bridal
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/services/female/manicure-pedicure"
                        className="hover:text-purple-500 block"
                        onClick={() => setMenuOpen(false)}
                      >
                        Pedicure & manicure
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/cart"
                        className="hover:text-purple-500 block"
                        onClick={() => setMenuOpen(false)}
                      >
                        Cart
                      </Link>
                    </li>
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






// import React, { useState } from "react";
// import { Menu, X, ChevronDown } from "lucide-react";
// import { Link } from "react-router-dom";
// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(null);

//   const toggleDropdown = (menu) => {
//     setDropdownOpen(dropdownOpen === menu ? null : menu);
//   };

//   return (
//     <nav className="w-full bg-white shadow-md sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
//         {/* ---------- Logo ---------- */}
//         <h1 className="text-2xl font-bold text-gray-800">
//           Smart<span className="text-blue-600">Nav</span>
//         </h1>

//         {/* ---------- Desktop Menu ---------- */}
//         <ul className="hidden md:flex gap-6 text-gray-700 font-medium">
//           <li className="hover:text-blue-600 transition cursor-pointer">Home</li>

//           <li className="relative group">
//             <div
//               onClick={() => toggleDropdown("services")}
//               className="flex items-center gap-1 cursor-pointer hover:text-blue-600"
//             >
//               Services <ChevronDown size={16} />
//             </div>

//             {dropdownOpen === "services" && (
//                <ul className="absolute bg-white shadow-lg rounded-lg mt-2 py-2 w-40 text-sm">
//         <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
//           <Link to="/services/hair">💆 Hair Care</Link>
//         </li>
//         <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
//           <Link to="/services/skin">🌸 Skin Care</Link>
//         </li>
//         <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
//           <Link to="/services/beauty">💅 Beauty & Grooming</Link>
//         </li>
//         <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
//           <Link to="/services/makeup">💄 Makeup & Styling</Link>
//         </li>
//       </ul>
//             )}
//           </li>

//           <li className="relative group">
//             <div
//               onClick={() => toggleDropdown("resources")}
//               className="flex items-center gap-1 cursor-pointer hover:text-blue-600"
//             >
//               Resources <ChevronDown size={16} />
//             </div>

//             {dropdownOpen === "resources" && (
//               <ul className="absolute bg-white shadow-lg rounded-lg mt-2 py-2 w-40 text-sm">
//                 <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
//                   Blog
//                 </li>
//                 <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
//                   Case Studies
//                 </li>
//                 <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
//                   Docs
//                 </li>
//               </ul>
//             )}
//           </li>

//           <li className="hover:text-blue-600 transition cursor-pointer">About</li>
//           <li className="hover:text-blue-600 transition cursor-pointer">Contact</li>
//         </ul>

//         {/* ---------- Login Button ---------- */}
//         <button className="hidden md:inline-block bg-gradient-to-r from-blue-600 to-indigo-500 text-white px-5 py-2 rounded-lg font-semibold hover:scale-105 transition-all duration-300 shadow-md">
//           Login
//         </button>

//         {/* ---------- Mobile Menu Button ---------- */}
//         <button
//           className="md:hidden text-gray-800"
//           onClick={() => setMenuOpen(!menuOpen)}
//         >
//           {menuOpen ? <X size={28} /> : <Menu size={28} />}
//         </button>
//       </div>

//       {/* ---------- Mobile Dropdown Menu ---------- */}
//       {menuOpen && (
//         <ul className="md:hidden bg-white border-t border-gray-200 py-4 px-6 space-y-3 text-gray-700 font-medium">
//           <li className="hover:text-blue-600">Home</li>
//           <li>
//             <details>
//               <summary className="flex items-center justify-between cursor-pointer hover:text-blue-600">
//                 Services
//               </summary>
//               <ul className="pl-4 mt-2 space-y-2 text-sm">
//                 <li className="hover:text-blue-600">Web Design</li>
//                 <li className="hover:text-blue-600">App Development</li>
//                 <li className="hover:text-blue-600">SEO Optimization</li>
//               </ul>
//             </details>
//           </li>
//           <li>
//             <details>
//               <summary className="flex items-center justify-between cursor-pointer hover:text-blue-600">
//                 Resources
//               </summary>
//               <ul className="pl-4 mt-2 space-y-2 text-sm">
//                 <li className="hover:text-blue-600">Blog</li>
//                 <li className="hover:text-blue-600">Case Studies</li>
//                 <li className="hover:text-blue-600">Docs</li>
//               </ul>
//             </details>
//           </li>
//           <li className="hover:text-blue-600">About</li>
//           <li className="hover:text-blue-600">Contact</li>
//           <li>
//             <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-500 text-white px-5 py-2 rounded-lg font-semibold hover:scale-105 transition-all duration-300 shadow-md">
//               Login
//             </button>
//           </li>
//         </ul>
//       )}
//     </nav>
//   );
// };

// export default Navbar;



// import React from "react";
// import { Outlet, NavLink, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { logout } from "../redux/Slice/authSlice";
// import Navbar from "../components/Navbar"; // ✅ Import Navbar

// export default function MainLayout() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user } = useSelector((state) => state.auth);

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/login");
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gray-100">
//       {/* ---------- Top Navbar ---------- */}
//       <Navbar />

//       {/* ---------- Sidebar + Main Content ---------- */}
//       <div className="flex flex-1 overflow-hidden">
//         {/* ---------- Sidebar ---------- */}
//         <aside className="w-64 bg-white shadow-md flex flex-col">
//           <div className="p-6 border-b">
//             <h1 className="text-2xl font-bold text-blue-600">
//               Appointment App
//             </h1>
//           </div>

//           <nav className="flex-1 p-4 space-y-2">
//             <NavLink
//               to="/"
//               end
//               className={({ isActive }) =>
//                 `block px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-600 ${
//                   isActive ? "bg-blue-500 text-white" : ""
//                 }`
//               }
//             >
//               📋 Dashboard
//             </NavLink>

//             <NavLink
//               to="/calendar"
//               className={({ isActive }) =>
//                 `block px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-600 ${
//                   isActive ? "bg-blue-500 text-white" : ""
//                 }`
//               }
//             >
//               📅 Calendar
//             </NavLink>

//             {/* Show Admin link only if user is admin */}
//             {user?.role === "admin" && (
//               <NavLink
//                 to="/admin"
//                 className={({ isActive }) =>
//                   `block px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-600 ${
//                     isActive ? "bg-blue-500 text-white" : ""
//                   }`
//                 }
//               >
//                 🛠️ Admin Panel
//               </NavLink>
//             )}
//           </nav>

//           {/* Logout button (optional since Navbar has logout too) */}
//           <div className="p-4 border-t">
//             <button
//               onClick={handleLogout}
//               className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
//             >
//               Logout
//             </button>
//           </div>
//         </aside>

//         {/* ---------- Main Content ---------- */}
//         <main className="flex-1 p-6 overflow-y-auto">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }
