import React from "react";
import { useLocation } from "react-router-dom";



export default function AboutPage() {
  const location = useLocation();
  const showExtendedInfo = location.state?.fromLearnMore;
  

  return (
    <div className="bg-gray-50 text-gray-800">
      {/* ---------- HERO SECTION ---------- */}
      <section className="relative w-full h-[60vh]">
        <img
          src="https://images.unsplash.com/photo-1633681926053-9074b76e21a7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTR8fGludGVyaW9yJTIwZGVzaWduJTIwc2Fsb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600"
          alt="Salon interior"
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
          <h1 className="text-5xl font-serif font-bold mb-4">
            About Our Salon
          </h1>
          <p className="max-w-2xl text-lg">
            Where beauty meets relaxation — experience expert care with a
            personal touch.
          </p>
        </div>
      </section>

      {/* ---------- ABOUT INFO ---------- */}
      <section className="max-w-6xl mx-auto py-16 px-6 md:px-12 leading-relaxed">
        <h2 className="text-4xl font-serif font-bold text-center mb-10 text-purple-600">
          Our Story
        </h2>
        <p className="text-lg mb-8 text-justify font-light">
          Established with passion and precision, our salon is a haven where
          style and comfort unite. From rejuvenating facials to trendsetting
          hairstyles, we bring you a range of services tailored to enhance your
          natural beauty. Our expert stylists and skincare professionals use
          only premium-quality products to ensure you look and feel your best.
        </p>
        <p className="text-lg mb-8 text-justify font-light">
          We believe that self-care isn’t a luxury — it’s a necessity. Every
          visit is designed to give you a soothing escape from your busy
          schedule. Whether it’s your bridal makeover, a relaxing head massage,
          or a quick touch-up, we promise an experience that’s refreshing,
          professional, and filled with warmth.
        </p>
        <p className="text-lg text-justify font-light mb-8">
          Step in to experience a world where creativity, confidence, and care
          come together — because you deserve nothing less.
        </p>

        {showExtendedInfo && (
          <>
            <h3 className="text-3xl font-serif font-bold mt-16 mb-8 text-purple-600">
              Why Choose Us?
            </h3>
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div>
                <h4 className="text-xl font-semibold mb-4 text-gray-700">Expert Team</h4>
                <p className="text-gray-600 mb-6">
                  Our team of certified professionals brings years of experience and continuous training
                  to ensure you receive the latest trends and techniques in beauty care.
                </p>
                
                <h4 className="text-xl font-semibold mb-4 text-gray-700">Premium Products</h4>
                <p className="text-gray-600 mb-6">
                  We use only high-quality, dermatologically tested products from renowned brands
                  to ensure the best results for your skin and hair.
                </p>
              </div>
              
              <div>
                <h4 className="text-xl font-semibold mb-4 text-gray-700">Hygiene Standards</h4>
                <p className="text-gray-600 mb-6">
                  We maintain strict sanitization protocols and use sterilized equipment
                  to ensure your safety and well-being during every visit.
                </p>
                
                <h4 className="text-xl font-semibold mb-4 text-gray-700">Personalized Care</h4>
                <p className="text-gray-600 mb-6">
                  Every service begins with a consultation to understand your needs and preferences,
                  ensuring a customized experience that exceeds your expectations.
                </p>
              </div>
            </div>

            <h3 className="text-3xl font-serif font-bold mb-8 text-purple-600">
              Our Facilities
            </h3>
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h4 className="text-xl font-semibold mb-4 text-gray-700">Comfortable Environment</h4>
                <p className="text-gray-600">
                  Relaxing atmosphere with ambient music, temperature-controlled rooms, and ergonomic furniture.
                </p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h4 className="text-xl font-semibold mb-4 text-gray-700">Modern Equipment</h4>
                <p className="text-gray-600">
                  State-of-the-art tools and equipment to provide the best possible service and results.
                </p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h4 className="text-xl font-semibold mb-4 text-gray-700">Private Sections</h4>
                <p className="text-gray-600">
                  Dedicated areas for different services ensuring privacy and personalized attention.
                </p>
              </div>
            </div>

            <h3 className="text-3xl font-serif font-bold mb-8 text-purple-600">
              Client Care
            </h3>
            <div className="bg-purple-50 p-8 rounded-lg mb-8">
              <h4 className="text-xl font-semibold mb-4 text-gray-700">Our Commitment</h4>
              <ul className="list-disc pl-6 space-y-3 text-gray-600">
                <li>Flexible appointment scheduling to accommodate your busy lifestyle</li>
                <li>Complimentary consultations for new services</li>
                <li>Regular client feedback to continuously improve our services</li>
                <li>Loyalty program rewards for our regular customers</li>
                <li>Professional aftercare advice for maintaining results</li>
              </ul>
            </div>
          </>
        )}
      </section>
      
    </div>
  );
}
