// import React from "react";
// import {
//   FaLinkedinIn,
//   FaFacebookF,
//   FaInstagram,
//   FaTwitter,
//   FaEnvelope,
// } from "react-icons/fa";

// export default function Footer() {
//   const year = new Date().getFullYear();

//   return (
//     <footer className="bg-gray-900 text-gray-300 py-6 text-center">
//       <div>
//         {/* Social Icons */}
//         <ul className="flex justify-center gap-6 mb-4">
//           <li>
//             <a
//               href="https://www.linkedin.com/in/varsha-gp2622b/"
//               target="_blank"
//               rel="noopener noreferrer"
//               aria-label="LinkedIn"
//               className="hover:text-blue-400 transition-transform transform hover:scale-110"
//             >
//               <FaLinkedinIn size={22} />
//             </a>
//           </li>

//           <li>
//             <a
//               href="https://www.facebook.com/"
//               target="_blank"
//               rel="noopener noreferrer"
//               aria-label="Facebook"
//               className="hover:text-blue-500 transition-transform transform hover:scale-110"
//             >
//               <FaFacebookF size={22} />
//             </a>
//           </li>

//           <li>
//             <a
//               href="https://www.instagram.com/"
//               target="_blank"
//               rel="noopener noreferrer"
//               aria-label="Instagram"
//               className="hover:text-pink-500 transition-transform transform hover:scale-110"
//             >
//               <FaInstagram size={22} />
//             </a>
//           </li>

//           <li>
//             <a
//               href="https://twitter.com/"
//               target="_blank"
//               rel="noopener noreferrer"
//               aria-label="Twitter"
//               className="hover:text-sky-400 transition-transform transform hover:scale-110"
//             >
//               <FaTwitter size={22} />
//             </a>
//           </li>

//           <li>
//             <a
//               href="mailto:gpvarsha0930@gmail.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               aria-label="Email"
//               className="hover:text-yellow-400 transition-transform transform hover:scale-110"
//             >
//               <FaEnvelope size={22} />
//             </a>
//           </li>
//         </ul>
//       </div>

//       {/* Footer Text */}
//       <p className="text-sm">
//         &copy; {year}{" "}
//         <a
//           href="https://www.linkedin.com/in/varsha-gp2622b/"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="text-blue-400 hover:underline"
//         >
//           Copyright 
//         </a>{" "}
//         | All rights reserved.
//       </p>
//     </footer>
//   );
// }

import React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-10">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        {/* ---------- Logo & Info ---------- */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">
            Glow<span className="text-purple-400">Salon</span>
          </h2>
          <p className="text-gray-400">
            Experience luxury styling with expert professionals and top-quality
            salon services.
          </p>
        </div>

        {/* ---------- Quick Links ---------- */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#hero" className="hover:text-purple-400">Home</a></li>
            <li><a href="#about" className="hover:text-purple-400">About</a></li>
            <li><a href="#reviews" className="hover:text-purple-400">Reviews</a></li>
            <li><a href="#contact" className="hover:text-purple-400">Contact</a></li>
          </ul>
        </div>

        {/* ---------- Contact & Socials ---------- */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact Us</h3>
          <p className="text-gray-400 mb-3">📍 123 Beauty Street, Bangalore</p>
          <p className="text-gray-400 mb-3">📞 +91 98765 43210</p>

          <div className="flex gap-4 mt-4">
        <a
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-purple-400"
        >
          <Facebook />
        </a>
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-purple-400"
        >
          <Instagram />
        </a>
        <a
          href="https://twitter.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-purple-400"
        >
          <Twitter />
        </a>
      </div>

        </div>
      </div>

      {/* ---------- Bottom Text ---------- */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} GlowSalon. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
