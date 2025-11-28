import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchChildServices } from "../redux/Slice/serviceSlice";
 
const ChildServicesPage = () => {
  const { gender, mainId } = useParams();
  const dispatch = useDispatch();
 
  const { child, loading, error } = useSelector((state) => state.services);
  const childServices = child[mainId] || [];
 
  useEffect(() => {
    if (mainId) {
      dispatch(fetchChildServices(mainId)); // ✔ correct
    }
  }, [mainId, dispatch]);
 
  if (loading) return <p className="text-center mt-5">Loading services...</p>;
  if (error) return <p className="text-center mt-5 text-danger">{error}</p>;
 
  if (!childServices.length)
    return <p className="text-center mt-5">No services found.</p>;
 
  return (
<div className="container mt-5">
<h2 className="mb-4 text-capitalize">{gender} → Services</h2>
 
      <div className="row">
        {childServices.map((service) => (
<div key={service.id} className="col-md-4 mb-4">
<div className="card h-100 shadow-sm">
<img
                src={service.image}
                className="card-img-top"
                alt={service.child_service_name}
                style={{ height: "200px", objectFit: "cover" }}
              />
<div className="card-body">
<h5 className="card-title">{service.child_service_name}</h5>
<p className="card-text">{service.child_service_description}</p>
 
                <p className="card-text">
<strong>Price:</strong> ₹{service.price} <br />
<strong>Duration:</strong> {service.duration} mins
</p>
</div>
</div>
</div>
        ))}
</div>
</div>
  );
};
 
export default ChildServicesPage;