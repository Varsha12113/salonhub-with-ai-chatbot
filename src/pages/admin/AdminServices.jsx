/**  
 * ADMIN SERVICES PAGE — PREMIUM UI  
 * Bootstrap 5 + Modern Glass UI  
 */

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
  const servicesState = useSelector((state) => state.services || {});

  const mainServices = servicesState.main || [];
  const childServicesMap = servicesState.child || {};
  const loading = servicesState.loading || false;
  const error = servicesState.error || null;

  const [genders, setGenders] = useState([]);

  // MAIN FORM STATE
  const [mainForm, setMainForm] = useState({
    main_services_name: "",
    main_services_description: "",
    gender: "",
  });
  const [isEditingMain, setIsEditingMain] = useState(false);
  const [editingMainId, setEditingMainId] = useState(null);

  // CHILD FORM STATE
  const [childForm, setChildForm] = useState({
    child_service_name: "",
    child_service_description: "",
    price: "",
    duration: "",
    main_services: "",
  });
  const [isEditingChild, setIsEditingChild] = useState(false);
  const [editingChildId, setEditingChildId] = useState(null);

  // SELECTED MAIN
  const [selectedMainId, setSelectedMainId] = useState("");

  useEffect(() => {
    dispatch(fetchMainServices());
    loadGenders();
  }, []);

  useEffect(() => {
    if (selectedMainId) dispatch(fetchChildServices(selectedMainId));
  }, [selectedMainId]);

  async function loadGenders() {
    try {
      const res = await httpGet("/api/services/user/genders/");
      setGenders(Array.isArray(res) ? res : []);
    } catch {
      setGenders([]);
    }
  }

  // ---------------- MAIN HANDLERS ----------------
  function onMainChange(e) {
    const { name, value } = e.target;
    setMainForm((s) => ({ ...s, [name]: value }));
  }

  async function submitMain(e) {
    e.preventDefault();
    if (!mainForm.main_services_name || !mainForm.gender) {
      alert("Name & gender are required");
      return;
    }

    const payload = {
      main_services_name: mainForm.main_services_name,
      main_services_description: mainForm.main_services_description,
    };

    try {
      if (isEditingMain) {
        await dispatch(updateMainService({ id: editingMainId, data: payload })).unwrap();
      } else {
        await dispatch(
          createMainService({ genderId: Number(mainForm.gender), data: payload })
        ).unwrap();
      }

      dispatch(fetchMainServices());

      setMainForm({ main_services_name: "", main_services_description: "", gender: "" });
      setIsEditingMain(false);
      setEditingMainId(null);
    } catch (err) {
      alert("Error: " + JSON.stringify(err));
    }
  }

  function startEditMain(m) {
    setIsEditingMain(true);
    setEditingMainId(m.id);
    setMainForm({
      main_services_name: m.main_services_name,
      main_services_description: m.main_services_description,
      gender: m.gender_id,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function removeMain(id) {
    if (!window.confirm("Delete this main service?")) return;
    await dispatch(deleteMainService(id)).unwrap();
    dispatch(fetchMainServices());
  }

  // ---------------- CHILD HANDLERS ----------------
  function onChildChange(e) {
    const { name, value } = e.target;
    setChildForm((s) => ({ ...s, [name]: value }));
  }

  async function submitChild(e) {
    e.preventDefault();

    if (!childForm.child_service_name || !childForm.price || !childForm.main_services) {
      alert("Name, price & main service are required");
      return;
    }

    const payload = {
      child_service_name: childForm.child_service_name,
      child_service_description: childForm.child_service_description,
      price: Number(childForm.price),
      duration: childForm.duration ? Number(childForm.duration) : null,
    };

    try {
      if (isEditingChild) {
        await dispatch(
          updateChildService({
            mainId: childForm.main_services,
            childId: editingChildId,
            data: payload,
          })
        ).unwrap();
      } else {
        await dispatch(
          createChildService({ mainId: childForm.main_services, data: payload })
        ).unwrap();
      }

      dispatch(fetchChildServices(childForm.main_services));

      setChildForm({
        child_service_name: "",
        child_service_description: "",
        price: "",
        duration: "",
        main_services: "",
      });
      setIsEditingChild(false);
      setEditingChildId(null);
    } catch (err) {
      alert("Error: " + JSON.stringify(err));
    }
  }

  function startEditChild(c) {
    setIsEditingChild(true);
    setEditingChildId(c.id);
    setChildForm({
      child_service_name: c.child_service_name,
      child_service_description: c.child_service_description,
      price: c.price,
      duration: c.duration,
      main_services: c.main_service,
    });
    setSelectedMainId(c.main_service);
  }

  async function removeChild(childId) {
    if (!window.confirm("Delete child?")) return;
    await dispatch(deleteChildService({ mainId: selectedMainId, childId })).unwrap();
    dispatch(fetchChildServices(selectedMainId));
  }

  const childrenList = childServicesMap[selectedMainId] || [];

  // ---------------------------------------------------------------------
  //                         PREMIUM UI RETURN  
  // ---------------------------------------------------------------------

  return (
    <div className="container py-4">

      {/* Title */}
      <h2 className="fw-bold mb-4 text-gradient">
        Admin — Manage Services
      </h2>

      <style>{`
        .text-gradient {
          background: linear-gradient(45deg, #5b2cff, #b72cff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .premium-card {
          backdrop-filter: blur(10px);
          border-radius: 18px;
          border: 1px solid rgba(255,255,255,0.3);
          background: rgba(255,255,255,0.8);
          transition: transform .2s;
        }
        .premium-card:hover {
          transform: translateY(-3px);
        }
        .premium-header {
          background: linear-gradient(120deg, #5b2cff, #8b2cff);
          color: white !important;
          border-radius: 18px 18px 0 0;
        }
        .premium-header-secondary {
          background: linear-gradient(120deg, #2c6dff, #2cf8ff);
          color: white !important;
          border-radius: 18px 18px 0 0;
        }
        .table-premium thead {
          background: #f4f1ff;
        }
      `}</style>

      <div className="row g-4">

        {/* ---------------- MAIN SERVICES CARD ---------------- */}
        <div className="col-lg-6">
          <div className="card premium-card shadow">

            <div className="card-header premium-header d-flex justify-content-between">
              <h5 className="mb-0 fw-bold">Main Services</h5>

              <button
                className="btn btn-light btn-sm fw-semibold"
                onClick={() => {
                  setIsEditingMain(false);
                  setEditingMainId(null);
                  setMainForm({ main_services_name: "", main_services_description: "", gender: "" });
                }}
              >
                Reset
              </button>
            </div>

            <div className="card-body">

              {/* FORM */}
              <form onSubmit={submitMain} className="mb-3">
                
                <label className="form-label fw-semibold">Service Name</label>
                <input
                  name="main_services_name"
                  className="form-control form-control-lg mb-3"
                  value={mainForm.main_services_name}
                  onChange={onMainChange}
                />

                <label className="form-label fw-semibold">Description</label>
                <textarea
                  name="main_services_description"
                  className="form-control mb-3"
                  rows={2}
                  value={mainForm.main_services_description}
                  onChange={onMainChange}
                />

                <label className="form-label fw-semibold">Gender</label>
                <select
                  name="gender"
                  className="form-select mb-3"
                  value={mainForm.gender}
                  onChange={onMainChange}
                >
                  <option value="">Select gender</option>
                  {genders.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name}
                    </option>
                  ))}
                </select>

                <button className="btn btn-primary w-100 btn-lg shadow-sm">
                  {isEditingMain ? "Update Main Service" : "Add Main Service"}
                </button>
              </form>

              {/* TABLE */}
              <div className="table-responsive">
                <table className="table table-premium table-hover align-middle rounded-3 overflow-hidden">
                  <thead>
                    <tr className="text-center fw-semibold">
                      <th>ID</th>
                      <th>Name</th>
                      <th>Gender</th>
                      <th className="text-end">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {mainServices.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="text-center py-3 text-muted">
                          No main services found
                        </td>
                      </tr>
                    ) : (
                      mainServices.map((m) => (
                        <tr key={m.id}>
                          <td className="text-center">{m.id}</td>
                          <td>{m.main_services_name}</td>
                          <td>{m.gender}</td>

                          <td className="text-end">
                            <button
                              className="btn btn-outline-primary btn-sm me-2"
                              onClick={() => startEditMain(m)}
                            >
                              <Edit size={14} /> Edit
                            </button>

                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => removeMain(m.id)}
                            >
                              <Trash2 size={14} /> Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* ---------------- CHILD SERVICES CARD ---------------- */}
        <div className="col-lg-6">
          <div className="card premium-card shadow">

            <div className="card-header premium-header-secondary d-flex justify-content-between align-items-center">
              <h5 className="mb-0 fw-bold">Child Services</h5>

              <select
                className="form-select form-select-sm w-auto"
                value={selectedMainId}
                onChange={(e) => setSelectedMainId(e.target.value)}
              >
                <option value="">Select Main</option>
                {mainServices.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.main_services_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="card-body">

              <form onSubmit={submitChild} className="mb-3">

                <label className="form-label fw-semibold">Child Name</label>
                <input
                  name="child_service_name"
                  className="form-control form-control-lg mb-3"
                  value={childForm.child_service_name}
                  onChange={onChildChange}
                />

                <label className="form-label fw-semibold">Description</label>
                <textarea
                  name="child_service_description"
                  className="form-control mb-3"
                  rows={2}
                  value={childForm.child_service_description}
                  onChange={onChildChange}
                />

                <div className="row">
                  <div className="col-6">
                    <label className="form-label fw-semibold">Price</label>
                    <input
                      name="price"
                      type="number"
                      className="form-control mb-3"
                      value={childForm.price}
                      onChange={onChildChange}
                    />
                  </div>

                  <div className="col-6">
                    <label className="form-label fw-semibold">Duration (min)</label>
                    <input
                      name="duration"
                      type="number"
                      className="form-control mb-3"
                      value={childForm.duration}
                      onChange={onChildChange}
                    />
                  </div>
                </div>

                <label className="form-label fw-semibold">Main Service</label>
                <select
                  name="main_services"
                  className="form-select mb-3"
                  value={childForm.main_services}
                  onChange={onChildChange}
                >
                  <option value="">Choose</option>
                  {mainServices.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.main_services_name}
                    </option>
                  ))}
                </select>

                <button className="btn btn-info w-100 btn-lg shadow-sm">
                  {isEditingChild ? "Update Child Service" : "Add Child Service"}
                </button>
              </form>

              {/* CHILD TABLE */}
              <div className="table-responsive">
                <table className="table table-premium table-hover align-middle">
                  <thead>
                    <tr className="text-center fw-semibold">
                      <th>ID</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Duration</th>
                      <th className="text-end">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {!selectedMainId ? (
                      <tr>
                        <td colSpan="5" className="text-center py-3 text-muted">
                          Select a main service first
                        </td>
                      </tr>
                    ) : childrenList.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center py-3 text-muted">
                          No child services available
                        </td>
                      </tr>
                    ) : (
                      childrenList.map((c) => (
                        <tr key={c.id}>
                          <td className="text-center">{c.id}</td>
                          <td>{c.child_service_name}</td>
                          <td>₹{c.price}</td>
                          <td>{c.duration} min</td>

                          <td className="text-end">
                            <button
                              className="btn btn-outline-primary btn-sm me-2"
                              onClick={() => startEditChild(c)}
                            >
                              <Edit size={14} /> Edit
                            </button>

                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => removeChild(c.id)}
                            >
                              <Trash2 size={14} /> Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
