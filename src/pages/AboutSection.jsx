// import React from "react";
// import { useNavigate } from "react-router-dom";

// const AboutSection = () => {
//   const navigate = useNavigate();

//   return (
//     <section
//       id="about"
//       className="bg-white text-gray-800 py-24 px-6 border-t border-gray-100"
//     >
//       <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
//         {/* ---------- Left Image ---------- */}
//         <div className="w-full md:w-1/2 flex justify-center">
//           <div className="bg-white p-4 rounded-xl shadow-lg transform rotate-2 hover:rotate-0 transition-all duration-500 shadow-[0_0_25px_rgba(168,85,247,0.6)]">
//             <img
//               src="https://media.istockphoto.com/id/170031509/photo/the-crew.jpg?s=612x612&w=0&k=20&c=2DpdQoXZ7Mljz--DcUP48Vl0VqpBRh86oOItofAwYdo="
//               alt="Team working"
//               className="rounded-lg w-80 h-80 object-cover"
//             />
//             <p className="text-center text-gray-700 font-semibold mt-3">
//               Our Amazing Team
//             </p>
//           </div>
//         </div>

//         {/* ---------- Right Content ---------- */}
//         <div className="w-full md:w-1/2 space-y-6">
//           <h2 className="text-4xl font-bold text-purple-600">
//             About <span className="text-purple-500">Us</span>
//           </h2>
//           <p className="text-lg text-gray-600 leading-relaxed">
//             We are a passionate team of stylists and beauty experts dedicated to bringing out the best in you. Our goal is to provide exceptional beauty services and create unforgettable experiences for our clients.
//           </p>
//           <p className="text-gray-600 leading-relaxed">
//             From trendsetting hairstyles to rejuvenating spa treatments, we focus on quality, creativity, and personalization to help you achieve your desired look.
//           </p>

//           <button
//             onClick={() =>
//               navigate("/about", { state: { fromLearnMore: true } })
//             }
//             className="mt-4 bg-gradient-to-r from-purple-600 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-all duration-300 shadow-md"
//           >
//             Learn More About Us
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AboutSection;


import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const AboutSection = () => {
  const navigate = useNavigate();

  return (
    <section
      id="about"
      className="relative bg-white text-gray-800 py-24 px-6 border-t border-gray-100 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* ---------- Left Swinging Frame ---------- */}
        <div className="w-full md:w-1/2 flex justify-center relative pt-16">
          {/* Hanging String */}
          {/* <div className="absolute top-0 left-1/2 w-[2px] h-14 bg-gray-500 transform -translate-x-1/2 z-0" /> */}

          {/* Visible Nail */}
          <div className="absolute top-[30px] left-1/2 transform -translate-x-1/2 z-20">
  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-200 via-gray-400 to-gray-700 shadow-md border border-gray-500 relative">
    {/* Nail shine highlight */}
    <div className="absolute top-[3px] left-[3px] w-[8px] h-[8px] bg-white/70 rounded-full blur-[1px]" />
  </div>
  {/* Small nail stem */}
  <div className="w-[2px] h-5 bg-gray-500 mx-auto -mt-1 rounded-full shadow-sm" />
</div>

          {/* Swinging Frame */}
          <motion.div
            className="relative bg-white p-4 rounded-xl shadow-lg origin-top shadow-[0_0_25px_rgba(168,85,247,0.5)] z-20"
            animate={{
              rotate: [3, -3, 3],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          >
            <img
              src="https://media.istockphoto.com/id/164327025/photo/hairdresser-teamwork.jpg?s=612x612&w=0&k=20&c=JBlf60PEbXN-tOGqwD6mJrxGn3BaWJRa93ZODUX3aqE="
              alt="Team working"
              className="rounded-lg w-64 sm:w-72 md:w-80 h-64 sm:h-72 md:h-80 object-cover"
            />
            <p className="text-center text-gray-700 font-semibold mt-3">
              Our Amazing Team
            </p>
          </motion.div>
        </div>

        {/* ---------- Right Content ---------- */}
        <div className="w-full md:w-1/2 space-y-6">
          <h2 className="text-4xl font-bold text-purple-600">
            About <span className="text-purple-500">Us</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Our salon is home to a team of passionate and highly trained professionals who stay updated with the latest industry trends and techniques. Each member of our staff is committed to delivering personalized services, ensuring that every client receives the attention and care they deserve.
          </p>
          <p className="text-gray-600 leading-relaxed">
            From trendsetting hairstyles to rejuvenating spa treatments, we
            focus on quality, creativity, and personalization to help you
            achieve your desired look.
          </p>

          <button
            onClick={() =>
              navigate("/about", { state: { fromLearnMore: true } })
            }
            className="mt-4 bg-gradient-to-r from-purple-600 to-purple-500 text-white 
                       px-6 py-3 rounded-lg font-semibold hover:scale-105 
                       transition-all duration-300 shadow-md"
          >
            Learn More About Us
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
