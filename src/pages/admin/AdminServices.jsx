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
  <h2 className="fw-bold mb-5 text-gradient display-6">
    Admin — Manage Services
  </h2>

 <style>{`
/* ----------------- Buttons ----------------- */
.btn-purple {
  background-color: #8b2cff;
  border: 1px solid #6e1fcc;
  color: white;
  border-radius: 6px;
  padding: 0.75rem;
  font-size: 1rem;
  width: 100%;
}
.btn-purple:hover {
  background-color: #a34dff;
  border-color: #8b2cff;
  color: white;
}

.btn-info-purple {
  background-color: #5b2cff;
  border: 1px solid #4a1fcc;
  color: white;
  border-radius: 6px;
  padding: 0.75rem;
  font-size: 1rem;
  width: 100%;
}
.btn-info-purple:hover {
  background-color: #7d4dff;
  border-color: #5b2cff;
}

.btn-outline-purple {
  color: #8b2cff;
  border: 1px solid #8b2cff;
  border-radius: 6px;
  width: 100%;
}
.btn-outline-purple:hover {
  background-color: #f0e0ff;
  color: #8b2cff;
}

/* ----------------- Form Fields ----------------- */
.premium-card .form-control,
.premium-card .form-select,
.premium-card textarea {
  border: 1px solid #8b2cff;
  border-radius: 6px;
  margin-bottom: 1rem;
  padding: 0.5rem;
  width: 100%;
}

.premium-card .form-control:focus,
.premium-card .form-select:focus,
.premium-card textarea:focus {
  border-color: #6e1fcc;
  box-shadow: 0 0 0 0.2rem rgba(139,44,255,0.25);
  outline: none;
}

/* ----------------- Tables ----------------- */
.table-premium {
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
}

.table-premium th,
.table-premium td {
  border-bottom: 1px solid rgba(139, 44, 255, 0.3);
  padding: 0.75rem 1rem;
  vertical-align: middle;
}

.table-premium th {
  background-color: rgba(139, 44, 255, 0.15);
  color: #fff;
  font-weight: 600;
  text-align: center;
}

.table-premium td {
  color: #000000;
}

.table-premium tbody tr:hover {
  background-color: rgba(139, 44, 255, 0.1);
}

.table-premium .text-end {
  text-align: right;
}

/* Responsive adjustments */
@media (max-width: 767px) {
  .table-premium th, .table-premium td {
    padding: 0.5rem;
  }
}
`}</style>



  <div className="row g-4">

    {/* Main Services Card */}
    <div className="col-lg-6">
      <div className="card premium-card shadow">

        <div className="card-header premium-header d-flex justify-content-between align-items-center">
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
          {/* Form */}
          <form onSubmit={submitMain} className="mb-4 p-3 rounded">

            <div className="mb-3">
              <label className="form-label fw-semibold">Service Name</label>
              <input
                name="main_services_name"
                className="form-control form-control-lg"
                placeholder="Enter service name"
                value={mainForm.main_services_name}
                onChange={onMainChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Description</label>
              <textarea
                name="main_services_description"
                className="form-control"
                rows={3}
                placeholder="Enter description"
                value={mainForm.main_services_description}
                onChange={onMainChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Gender</label>
              <select
                name="gender"
                className="form-select"
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
            </div>

            <button className="btn btn-primary w-100 btn-lg shadow-sm">
              {isEditingMain ? "Update Main Service" : "Add Main Service"}
            </button>
          </form>

          {/* Table */}
          <div className="table-responsive">
            <table className="table table-premium table-hover align-middle rounded-3 overflow-hidden">
              <thead>
                <tr className="text-center">
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

    {/* Child Services Card */}
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
          {/* Child Form */}
          <form onSubmit={submitChild} className="mb-3 p-3 rounded">
            <div className="mb-3">
              <label className="form-label fw-semibold">Child Name</label>
              <input
                name="child_service_name"
                className="form-control form-control-lg"
                value={childForm.child_service_name}
                onChange={onChildChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Description</label>
              <textarea
                name="child_service_description"
                className="form-control"
                rows={2}
                value={childForm.child_service_description}
                onChange={onChildChange}
              />
            </div>

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

          {/* Child Table */}
          <div className="table-responsive">
            <table className="table table-premium table-hover align-middle">
              <thead>
                <tr className="text-center">
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
