
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchChildServices } from "../redux/Slice/serviceSlice";
import { addToCart as addToCartUtil } from "../utils/cart";

const ChildServicesPage = ({ addToCart }) => {
  const { gender, mainId } = useParams();
  const normalizedMainId = String(mainId);
  const dispatch = useDispatch();

  const { child, loading, error } = useSelector((state) => state.services);
  const childServices = child[normalizedMainId] || [];
  console.log("ChildServicesPage:", { mainId, normalizedMainId, childFromStore: child, childServices });


  useEffect(() => {
  if (normalizedMainId) {
    dispatch(fetchChildServices(normalizedMainId));
  }
}, [normalizedMainId, dispatch]);



  const handleAddToCart = (service) => {
    addToCartUtil({
      id: service.id,
      name: service.child_service_name,
      price: service.price,
      duration: service.duration,
      image: service.image,
    });
  };

  if (loading) return <p className="text-center mt-5">Loading services...</p>;
  if (error) return <p className="text-center mt-5 text-danger">{error}</p>;
  if (!childServices.length)
    return <p className="text-center mt-5">No services found.</p>;

  return (
    <div className="max-w-6xl mx-auto mt-8 px-4">
  <h2 className="mb-6 text-2xl font-semibold capitalize">{gender} → Services</h2>

  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {childServices.map((service) => (
      <div key={service.id} className="bg-white rounded-xl shadow-md flex flex-col overflow-hidden">
        <img
          src={service.image || "https://via.placeholder.com/200"}
          alt={service.child_service_name}
          className="h-48 w-full object-cover"
        />
        <div className="p-4 flex flex-col flex-1">
          <h5 className="text-lg font-semibold mb-1">{service.child_service_name}</h5>
          <p className="text-sm text-gray-600 mb-3">
            {service.child_service_description || "No description"}
          </p>
          <p className="text-sm mb-4">
            <span className="font-semibold">Price:</span> ₹{service.price} <br />
            <span className="font-semibold">Duration:</span> {service.duration} mins
          </p>
          <button
            className="mt-auto inline-flex justify-center rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700"
            onClick={() => handleAddToCart(service)}
          >
            Book Now
          </button>
          
        </div>
      </div>
    ))}
  </div>
</div>

  );
};

export default ChildServicesPage;
