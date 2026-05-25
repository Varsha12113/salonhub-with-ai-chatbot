import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMainServices,
  createMainService,
  updateMainService,
  deleteMainService,
  fetchChildServices,
  createChildService,
  updateChildService,
  deleteChildService,
} from "../../redux/Slice/serviceSlice";

import { httpGet } from "../../config/httphandler";
import { Edit, Trash2 } from "lucide-react";

export default function AdminServices() {
  const dispatch = useDispatch();
  const { main: mainServices = [], child = {}, loading, error } = useSelector((state) => state.services || {});

  const [genders, setGenders] = useState([]);

  // Main service form state
  const [mainForm, setMainForm] = useState({
  main_services_name: "",
  main_services_description: "",
  gender: "",
});
  const [isEditingMain, setIsEditingMain] = useState(false);
  const [editingMainId, setEditingMainId] = useState(null);

  // Child service form state
  const [childForm, setChildForm] = useState({
    child_service_name: "",
    child_service_description: "",
    price: "",
    duration: "",
    image: null,    
  });
  const [isEditingChild, setIsEditingChild] = useState(false);
  const [editingChildId, setEditingChildId] = useState(null);

  // Selected main service for child services
  const [selectedMainId, setSelectedMainId] = useState("");

  useEffect(() => {
    dispatch(fetchMainServices());
    loadGenders();
  }, []);

  useEffect(() => {
    if (selectedMainId) {
      dispatch(fetchChildServices(selectedMainId));
    }
  }, [selectedMainId]);

  async function loadGenders() {
    try {
      const res = await httpGet("/api/services/user/genders/");
      setGenders(Array.isArray(res) ? res : []);
    } catch {
      setGenders([]);
    }
  }

  // Handle changes in main service form inputs
  function onMainChange(e) {
    const { name, value } = e.target;
    setMainForm((prev) => ({ ...prev, [name]: value }));
  }

  // Submit main service (create or update)
  async function submitMain(e) {
    e.preventDefault();
    if (!mainForm.main_services_name.trim() || !mainForm.gender) {
      alert("Name and Gender are required.");
      return;
    }
    const payload = {
      main_services_name: mainForm.main_services_name.trim(),
      main_services_description: mainForm.main_services_description.trim(),
    };
    try {
      if (isEditingMain) {
        await dispatch(updateMainService({ id: editingMainId, data: payload })).unwrap();
      } else {
        await dispatch(createMainService({ genderId: Number(mainForm.gender), data: payload })).unwrap();
      }
      dispatch(fetchMainServices());
      setMainForm({ main_services_name: "", main_services_description: "", gender: "" });
      setIsEditingMain(false);
      setEditingMainId(null);
    } catch (err) {
      alert("Failed to save main service: " + JSON.stringify(err));
    }
  }

  // Initialize edit for main service
  function startEditMain(service) {
    setIsEditingMain(true);
    setEditingMainId(service.id);
    setMainForm({
      main_services_name: service.main_services_name,
      main_services_description: service.main_services_description,
      gender: service.gender_id,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Remove main service
  async function removeMain(id) {
    if (window.confirm("Are you sure you want to delete this main service?")) {
      await dispatch(deleteMainService(id)).unwrap();
      dispatch(fetchMainServices());
      if (selectedMainId === id) setSelectedMainId("");
    }
  }

  // Handle changes in child service form inputs (including file)
  const onChildChange = (e) => {
  const { name, value, files } = e.target;
 
  setChildForm((prev) => ({
    ...prev,
    [name]: files ? files[0] : value,
  }));
}; 

  // Submit child service (create or update)
  async function submitChild(e) {
    e.preventDefault();
    if (!childForm.child_service_name.trim() || !childForm.price || !selectedMainId) {
      alert("Child Name, Price, and Main Service selection are required.");
      return;
    }
    const payload = {
      child_service_name: childForm.child_service_name.trim(),
      child_service_description: childForm.child_service_description.trim(),
      price: childForm.price,
      duration: childForm.duration,
      ...(childForm.image && { image: childForm.image }),
    };
    try {
      if (isEditingChild) {
        await dispatch(updateChildService({ mainId: selectedMainId, childId: editingChildId, data: payload })).unwrap();
      } else {
        await dispatch(createChildService({ mainId: selectedMainId, data: payload })).unwrap();
      }
      dispatch(fetchChildServices(selectedMainId));
      setChildForm({ child_service_name: "", child_service_description: "", price: "", duration: "", image: null });
      setIsEditingChild(false);
      setEditingChildId(null);
    } catch (err) {
      alert("Failed to save child service: " + JSON.stringify(err));
    }
  }

  // Initialize edit for child service
function startEditChild(childService) {
  setIsEditingChild(true);
  setEditingChildId(childService.id);
  setChildForm({
    child_service_name: childService.child_service_name,
    child_service_description: childService.child_service_description,
    price: childService.price,
    duration: childService.duration || "",
    image: null,
  });
  setSelectedMainId(childService.main_service); // ✅ use main_service (matches serializer)
  window.scrollTo({ top: 0, behavior: "smooth" });
}


  // Remove child service
 async function removeChild(childId) {
  if (!window.confirm("Delete this child service?")) return;

  try {
    await dispatch(deleteChildService({ mainId: selectedMainId, childId })).unwrap();
    dispatch(fetchChildServices(selectedMainId));
  } catch (err) {
    console.error("Delete child error:", err);
    const msg =
      typeof err === "string"
        ? err
        : err?.detail || err?.error || JSON.stringify(err);
    alert("Failed to delete child service: " + msg);
  }
}

  const childrenList = child[selectedMainId] || [];

  return (
    <div className="max-w-7xl mx-auto my-8 px-4">
      <h1 className="mb-6 text-3xl font-extrabold text-purple-800">Admin Panel — Manage Services</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Services Panel */}
        <section className="w-full lg:w-1/2 p-6 bg-white border border-purple-50 rounded-2xl shadow-md">
          <h3 className="mb-4 text-xl font-semibold text-purple-700">Main Service</h3>
          <form onSubmit={submitMain} className="mb-6">
            <div className="mb-4">
              <label htmlFor="main_services_name" className="block text-sm font-medium text-purple-700">
                Service Name <span className="text-red-500">*</span>
              </label>
              <input
                id="main_services_name"
                name="main_services_name"
                type="text"
                className="mt-1 block w-full rounded-lg border border-purple-200 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
                placeholder="Enter service name"
                value={mainForm.main_services_name}
                onChange={onMainChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="main_services_description" className="block text-sm font-medium text-purple-700">
                Description
              </label>
              <textarea
                id="main_services_description"
                name="main_services_description"
                className="mt-1 block w-full rounded-lg border border-purple-200 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
                rows="3"
                placeholder="Enter description (optional)"
                value={mainForm.main_services_description}
                onChange={onMainChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="gender" className="block text-sm font-medium text-purple-700">
                Gender <span className="text-red-500">*</span>
              </label>
              <select
                id="gender"
                name="gender"
                className="mt-1 block w-full rounded-lg border border-purple-200 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
                value={mainForm.gender}
                onChange={onMainChange}
                required
              >
                <option value="">Select gender</option>
                {genders.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-3">
              <button type="submit" className="flex-1 rounded-lg  bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">
                {isEditingMain ? "Update Main Service" : "Add Main Service"}
              </button>
              <button
                type="button"
                className="rounded-lg border border-purple-200 px-4 py-2 text-sm font-medium text-purple-700 bg-white hover:bg-purple-50"
                onClick={() => {
                  setIsEditingMain(false);
                  setEditingMainId(null);
                  setMainForm({ main_services_name: "", main_services_description: "", gender: "" });
                }}
              >
                Clear
              </button>
            </div>
          </form>

          {/* Main Services Table */}
          <div className="rounded-xl shadow-sm overflow-auto" style={{ maxHeight: "400px" }}>
            <table className="min-w-full divide-y divide-gray-200 table-auto text-sm text-center">
              <thead className="bg-purple-600 text-white sticky top-0">
                <tr>
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Gender</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {mainServices.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-gray-500 p-3">
                      No main services available.
                    </td>
                  </tr>
                )}
                {mainServices.map((m, idx) => (
                  <tr key={m.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-purple-50'}>
                    <td className="px-4 py-2">{m.id}</td>
                    <td className="px-4 py-2 text-left">{m.main_services_name}</td>
                    <td className="px-4 py-2">{m.gender}</td>
                    <td className="px-4 py-2">
                      <button className="inline-flex items-center gap-2 rounded-md border border-purple-200 px-3 py-1 text-sm text-purple-700 hover:bg-purple-50 mr-2" onClick={() => startEditMain(m)}>
                        <Edit size={16} /> Edit
                      </button>
                      <button className="inline-flex items-center gap-2 rounded-md border border-red-200 bg-red-50 px-3 py-1 text-sm text-red-700 hover:bg-red-100" onClick={() => removeMain(m.id)}>
                        <Trash2 size={16} /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Child Services Panel */}
        <section className="w-full lg:w-1/2 p-6 bg-white border border-purple-50 rounded-2xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-purple-700">Child Services</h3>
            <select
              className="rounded-lg border border-purple-200 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
              value={selectedMainId || ""}
              onChange={(e) => setSelectedMainId(Number(e.target.value))}
            >
              <option value="">Select Main Service</option>
              {mainServices.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.main_services_name}
                </option>
              ))}
            </select>
          </div>
          <form onSubmit={submitChild} encType="multipart/form-data" className="mb-6">
            <div className="mb-4">
              <label htmlFor="child_service_name" className="block text-sm font-medium text-purple-700">
                Child Service Name <span className="text-red-500">*</span>
              </label>
              <input
                id="child_service_name"
                name="child_service_name"
                type="text"
                className="mt-1 block w-full rounded-lg border border-purple-200 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
                placeholder="Enter child service name"
                value={childForm.child_service_name}
                onChange={onChildChange}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="child_service_description" className="block text-sm font-medium text-purple-700">
                Description
              </label>
              <textarea
                id="child_service_description"
                name="child_service_description"
                className="mt-1 block w-full rounded-lg border border-purple-200 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
                rows="2"
                placeholder="Enter description (optional)"
                value={childForm.child_service_description}
                onChange={onChildChange}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-purple-700">
                  Price (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  className="mt-1 block w-full rounded-lg border border-purple-200 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
                  placeholder="Price"
                  value={childForm.price}
                  onChange={onChildChange}
                  min="0"
                  required
                />
              </div>
              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-purple-700">
                  Duration (minutes)
                </label>
                <input
                  id="duration"
                  name="duration"
                  type="number"
                  className="mt-1 block w-full rounded-lg border border-purple-200 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
                  placeholder="e.g. 30"
                  value={childForm.duration}
                  onChange={onChildChange}
                  min="0"
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="image" className="block text-sm font-medium text-purple-700">
                Upload Image
              </label>
              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                className="mt-1 block w-full text-sm text-gray-700"
                onChange={onChildChange}
              />
            </div>

              <div className="flex gap-3">
                <button type="submit" className="flex-1 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">
                  {isEditingChild ? "Update Child Service" : "Add Child Service"}
                </button>
                <button
                  type="button"
                  className="rounded-lg border border-purple-200 px-4 py-2 text-sm font-medium text-purple-700 bg-white hover:bg-purple-50"
                  onClick={() => {
                    setIsEditingChild(false);
                    setEditingChildId(null);
                    setChildForm({
                      child_service_name: "",
                      child_service_description: "",
                      price: "",
                      duration: "",
                      image: null,
                    });
                  }}
                >
                  Clear
                </button>
              </div>
            </form>

            {/* Child Service List Table */}
            <div className="rounded-xl shadow-sm overflow-auto" style={{ maxHeight: "400px" }}>
              <table className="min-w-full divide-y divide-gray-200 table-auto text-sm text-center">
                <thead className="bg-purple-600 text-white">
                  <tr>
                    <th className="px-4 py-2">ID</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Price</th>
                    <th className="px-4 py-2">Duration</th>
                     <th className="px-4 py-2">Description</th>  {/* <-- add this */}
                    <th className="px-4 py-2">Image</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {!selectedMainId ? (
                    <tr>
                      <td colSpan="6" className="text-gray-500 p-3">
                        Please select a main service to view child services.
                      </td>
                    </tr>
                  ) : !child[selectedMainId] || child[selectedMainId].length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-gray-500 p-3">
                        No child services found for the selected main service.
                      </td>
                    </tr>
                  ) : (
                    child[selectedMainId].map((c) => (
                      <tr key={c.id}>
                        <td className="px-4 py-2">{c.id}</td>
                        <td className="px-4 py-2">{c.child_service_name}</td>
                            <td className="px-4 py-2">₹{c.price}</td>
                        <td className="px-4 py-2">{c.duration ? `${c.duration} min` : "-"}</td>
                         <td className="px-4 py-2">{c.child_service_description || "-"}</td>
                        <td className="px-4 py-2">
                          {c.image && (
                            <img
                              src={c.image}
                              alt="service"
                              width="60"
                              height="60"
                              style={{ objectFit: "cover", borderRadius: "8px" }}
                            />
                          )}
                        </td>
                        <td className="px-4 py-2">
                          <button className="inline-flex items-center gap-2 rounded-md border border-purple-200 px-3 py-1 text-sm text-purple-700 hover:bg-purple-50 mr-2" onClick={() => startEditChild(c)}>
                            Edit
                          </button>
                          <button className="inline-flex items-center gap-2 rounded-md border border-red-200 bg-red-50 px-3 py-1 text-sm text-red-700 hover:bg-red-100" onClick={() => removeChild(c.id)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    );
  }
