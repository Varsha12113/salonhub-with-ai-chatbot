import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaMale, FaFemale } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getGenders, getMainServices } from "../redux/Slice/genderSlice";
import {
  fetchGenders,
  fetchMainServices,
} from "../redux/Slice/userSlice";

export default function Services() {
  const dispatch = useDispatch();

  const { genders, mainServices } = useSelector(
    (state) => state.userServices
  );

  const [groupedServices, setGroupedServices] = useState({});

  // Fetch genders on mount
  useEffect(() => {
    dispatch(fetchGenders());
  }, [dispatch]);

  // Fetch main services for each gender
  useEffect(() => {
    if (genders?.length > 0) {
      genders.forEach((g) => dispatch(fetchMainServices(g.id)));
    }
  }, [genders, dispatch]);

  // Group services by gender
  useEffect(() => {
    if (!mainServices) return;

    const groups = {};

    genders?.forEach((g) => {
      groups[g.name] = mainServices[g.id] || [];
    });

    setGroupedServices(groups);
  }, [mainServices, genders]);

  return(
     <div
      id="services" 
      className="relative min-h-screen bg-cover bg-center bg-fixed text-gray-800 py-12 px-4"
      style={{
        backgroundImage:
          "url('https://images.squarespace-cdn.com/content/v1/6091e6edc456d57a746254a2/1850bf2a-85fe-4011-81ef-5e726d5ed752/Salon+Main+IMG_0067.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-white/70 backdrop-blur-sm"></div>

      <div className="relative max-w-6xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-purple-700 drop-shadow-sm">
            Explore All Services
          </h1>
          <p className="text-gray-900 mt-2">
            Browse our full range of salon services and pick what suits you best.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          {genders?.map((g) => (
            <section
              key={g.id}
              className="bg-white/80 rounded-xl shadow-lg p-6 border border-purple-100 hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                {g.name === "female" ? (
                  <FaFemale className="text-purple-500 text-2xl" />
                ) : (
                  <FaMale className="text-purple-500 text-2xl" />
                )}
                <h2 className="text-xl font-semibold text-gray-800 capitalize">
                  {g.name} Services
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                {groupedServices[g.name]?.map((service) => (
                  <Link
                    key={service.id}
                    to={`/services/${service.gender}/${service.id}`}
                    className="p-3 rounded-lg border hover:shadow-md hover:bg-purple-50 transition flex items-start gap-3"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">
                        {service.main_services_name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {service.description || "Salon service"}
                      </div>
                    </div>
                    <div className="text-purple-500 font-semibold">View</div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
  
}
