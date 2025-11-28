import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchChildServices } from "../../redux/Slice/serviceSlice";

const UserChildServices = () => {
  const { gender, mainId } = useParams();
  const dispatch = useDispatch();

  const { child, loading } = useSelector((state) => state.services);

  const childData = child[mainId] || [];

  useEffect(() => {
    dispatch(fetchChildServices(mainId));
  }, [dispatch, mainId]);

  if (loading)
    return <div className="p-6 text-center text-lg">Loading child services...</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 capitalize">
        {gender} → Services
      </h1>

      {/* No child services */}
      {childData.length === 0 && (
        <p className="text-gray-600 text-lg">No child services available.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {childData.map((item) => (
          <div
            key={item.id}
            className="bg-white border rounded-lg shadow p-4 hover:shadow-lg transition"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-40 object-cover rounded"
            />

            <h3 className="text-xl font-semibold mt-2">{item.title}</h3>
            <p className="text-gray-600">{item.description}</p>

            <p className="text-lg font-bold mt-3">₹{item.price}</p>

            <button className="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg">
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserChildServices;
