import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices, addService, updateService, deleteService } from "../../redux/Slice/serviceSlice";
import { Plus, Edit, Trash2, X } from "lucide-react";

export default function AdminServices() {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.services);

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const [formData, setFormData] = useState({
    gender_name: "",
    subcategory_name: "",
    subcategory_description: "",
    service_name: "",
    description: "",
    price: "",
    duration: "",
    image: "",
  });

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEdit && selectedService) {
      dispatch(updateService({ id: selectedService.id, updatedData: formData }));
    } else {
      dispatch(addService(formData));
    }

    setShowModal(false);
    setIsEdit(false);
    setFormData({
      gender_name: "",
      subcategory_name: "",
      subcategory_description: "",
      service_name: "",
      description: "",
      price: "",
      duration: "",
      image: "",
    });
  };

  const handleEdit = (service) => {
    setIsEdit(true);
    setSelectedService(service);
    setFormData(service);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      dispatch(deleteService(id));
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
        <h1 className="text-3xl font-bold text-gray-800">Manage Services</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
        >
          <Plus size={18} /> Add Service
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow-md rounded-xl p-5 overflow-x-auto">
        {loading ? (
          <p className="text-center text-gray-500">Loading services...</p>
        ) : (
          <table className="min-w-[800px] w-full text-sm text-gray-600">
            <thead className="bg-purple-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Duration</th>
                <th className="px-4 py-3">Gender</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.length > 0 ? (
                list.map((s) => (
                  <tr key={s.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{s.service_name}</td>
                    <td className="px-4 py-3">₹{s.price}</td>
                    <td className="px-4 py-3">{s.duration} mins</td>
                    <td className="px-4 py-3">{s.gender_name}</td>
                    <td className="px-4 py-3 text-center space-x-3">
                      <button onClick={() => handleEdit(s)} className="text-blue-500 hover:text-blue-700">
                        <Edit size={18} />
                      </button>
                      <button onClick={() => handleDelete(s.id)} className="text-red-500 hover:text-red-700">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-gray-500 py-4">
                    No services available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 px-3">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {isEdit ? "Edit Service" : "Add New Service"}
              </h2>
              <button onClick={() => setShowModal(false)}>
                <X className="text-gray-600 hover:text-red-600" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              {Object.keys(formData).map((key) => (
                <input
                  key={key}
                  type="text"
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  placeholder={key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-400 outline-none"
                  required={key !== "image"}
                />
              ))}

              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
              >
                {isEdit ? "Update Service" : "Add Service"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
