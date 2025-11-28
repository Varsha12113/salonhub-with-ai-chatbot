import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getSlotMasters, createSlotMaster } from "../../redux/Slice/schedulerSlice";
export default function Scheduler() {
  return (
   <div>
      <Routes>
        <Route index element={<Navigate to="slot-masters" replace />} />
        <Route path="slot-masters" element={<SlotMasterSection />} />
        <Route path="working-days" element={<WorkingDaysSection />} />
        <Route path="holidays" element={<HolidaysSection />} />
        <Route path="daily-slots" element={<DailySlotsSection />} />
      </Routes>
    </div>
  );
   function SlotMasterSection() {
  const dispatch = useDispatch();

  const { slotMasters = [], loading, error } = useSelector((state) => state.scheduler);

  const [showModal, setShowModal] = useState(false);

  // Form state
  const [form, setForm] = useState({
    start_time: "",
    end_time: "",
    status: "active",
  });

  // Fetch slot masters on mount
  useEffect(() => {
    dispatch(getSlotMasters());
  }, [dispatch]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createSlotMaster(form))
      .then(() => {
        setShowModal(false);
        setForm({
          start_time: "",
          end_time: "",
          status: "active",
        });
        dispatch(getSlotMasters());
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="max-w-6xl mx-auto my-8 px-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-extrabold text-purple-800">Slot Masters</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-xl shadow-md transition"
        >
          + Add Slot Master
        </button>
      </div>

      {/* Loading & Error */}
      {loading && <p className="text-purple-600 font-semibold">Loading…</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-md border border-purple-50 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-purple-100">
            <tr>
              <th className="px-4 py-3 font-semibold text-purple-700">#</th>
              <th className="px-4 py-3 font-semibold text-purple-700">Start Time</th>
              <th className="px-4 py-3 font-semibold text-purple-700">End Time</th>
              <th className="px-4 py-3 font-semibold text-purple-700">Status</th>
            </tr>
          </thead>

          <tbody>
            {slotMasters.length > 0 ? (
              slotMasters.map((item, index) =>
                item ? (
                  <tr key={item.id || index} className="border-t">
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">{item.start_time || "-"}</td>
                    <td className="px-4 py-3">{item.end_time || "-"}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-lg text-sm ${
                          item.is_active
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                  </tr>
                ) : null
              )
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-5 text-gray-500">
                  No slot masters found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-40 z-40"></div>

          <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6">

              {/* Modal Header */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-purple-800">Create Slot Master</h3>
                <button
                  className="text-gray-600 hover:text-red-500 text-xl"
                  onClick={() => setShowModal(false)}
                >
                  ✕
                </button>
              </div>

              {/* Form */}
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-purple-700 mb-1">
                      Start Time
                    </label>
                    <input
                      type="time"
                      value={form.start_time}
                      onChange={(e) => setForm({ ...form, start_time: e.target.value })}
                      className="w-full border border-purple-200 rounded-lg px-3 py-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-purple-700 mb-1">
                      End Time
                    </label>
                    <input
                      type="time"
                      value={form.end_time}
                      onChange={(e) => setForm({ ...form, end_time: e.target.value })}
                      className="w-full border border-purple-200 rounded-lg px-3 py-2"
                      required
                    />
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-purple-700 mb-1">
                    Status
                  </label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full border border-purple-200 rounded-lg px-3 py-2"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                {/* Footer */}
                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white shadow-md"
                  >
                    Save Slot Master
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
}

 

function WorkingDaysSection() { 

 }




function HolidaysSection() {  }
function DailySlotsSection() { }