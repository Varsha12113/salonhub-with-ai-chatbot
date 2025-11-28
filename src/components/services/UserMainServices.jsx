import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMainServices } from "../../redux/Slice/serviceSlice";

const UserMainServices = () => {
  const { gender } = useParams(); // female or male
  const dispatch = useDispatch();
  const { main, loading } = useSelector((state) => state.services);

  useEffect(() => {
    dispatch(fetchMainServices(gender));
  }, [dispatch, gender]);

  if (loading)
    return <div className="p-6 text-center text-lg">Loading services...</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 capitalize">{gender} Services</h1>

      {/* No services */}
      {main.length === 0 && (
        <p className="text-gray-600 text-lg">No services available.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {main.map((service) => (
          <Link
            key={service.id}
            to={`/services/${gender}/${service.id}`}
            className="bg-white border shadow hover:shadow-lg rounded-lg p-4 transition cursor-pointer"
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-44 object-cover rounded"
            />

            <h3 className="text-xl font-semibold mt-3">{service.title}</h3>
            <p className="text-gray-600 capitalize">{gender}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserMainServices;
