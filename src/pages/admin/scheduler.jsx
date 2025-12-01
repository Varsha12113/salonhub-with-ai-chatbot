import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getSlotMasters, createSlotMaster } from "../../redux/Slice/schedulerSlice";
import {getWorkingDays,updateWorkingDay,createWorkingDay} from "../../redux/Slice/schedulerSlice";

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

 

// function WorkingDaysSection() { 

//  const dispatch = useDispatch();
//   const { workingDays, loading } = useSelector((state) => state.scheduler);

//   useEffect(() => {
//     if (typeof getWorkingDays === "function") {
//       dispatch(getWorkingDays());
//     } else {
//       console.warn("getWorkingDays thunk is not available from schedulerSlice");
//     }
//   }, [dispatch]);

  
//    const toggleDay = (day) => {
//   dispatch(
//     updateWorkingDay({
//       id: day.id,
//       weekday: day.weekday,
//       is_working: !day.is_working,
//     })
//   );

//      if (typeof updateWorkingDay === "function") {
//       dispatch(
//         updateWorkingDay({
//           id: day.id,
//           data: { is_working: !day.is_working },
//         })
//       );
//     } else {
//       console.warn("updateWorkingDay thunk is not available from schedulerSlice");
//     }
//   };


//   const daysName = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

//    const list =
//     Array.isArray(workingDays) ? workingDays :
//     workingDays && Array.isArray(workingDays.results) ? workingDays.results :
//     workingDays ? Object.values(workingDays).filter(Boolean) :
//     [];


//  return (
//     <div className="p-5 bg-white rounded-lg shadow-md w-full max-w-3xl mx-auto">
//       <h2 className="text-2xl font-semibold mb-4">Working Days</h2>

//       {loading && <p className="text-blue-600">Loading...</p>}

//       <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
//         {list.length === 0 && !loading && (
//           <p className="col-span-full text-gray-600">No working days available.</p>
//         )}

//         {list.map((day, index) => {
//           // Skip entries that are falsy or missing weekday/is_working
//           if (!day || typeof day.weekday !== "number" || typeof day.is_working !== "boolean") {
//             // optional: you could show a placeholder, but avoid creating objects without id
//             return null;
//           }

//           const weekdayLabel = daysName[day.weekday] ?? `Day ${index + 1}`;
//           const key = day.id ?? `weekday-${day.weekday}-${index}`;

//           return (
//             <div
//               key={key}
//               className={`flex items-center justify-between p-4 rounded-lg border ${
//                 day.is_working ? "bg-green-100 border-green-400" : "bg-red-100 border-red-400"
//               }`}
//             >
//               <span className="font-medium">{weekdayLabel}</span>

//               <button
//                 onClick={() => toggleDay(day)}
//                 className={`px-4 py-1 rounded-full text-white text-sm font-medium ${
//                   day.is_working ? "bg-green-500" : "bg-red-500"
//                 }`}
//               >
//                 {day.is_working ? "ON" : "OFF"}
//               </button>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );

//  }

function WorkingDaysSection() {
  const dispatch = useDispatch();
  const { workingDays, loading } = useSelector((state) => state.scheduler);

  const [selectedDay, setSelectedDay] = useState("");

  useEffect(() => {
    if (typeof getWorkingDays === "function") {
      dispatch(getWorkingDays());
    }
  }, [dispatch]);

  const toggleDay = (day) => {
    if (typeof updateWorkingDay === "function") {
      dispatch(
        updateWorkingDay({
          id: day.id,
          data: { is_working: !day.is_working },
        })
      );
    }
  };

  const addDay = () => {
    if (!selectedDay) return;
    const weekdayIndex = daysName.indexOf(selectedDay);
    if (typeof createWorkingDay === "function") {
      dispatch(
        createWorkingDay({
          weekday: weekdayIndex,
          is_working: true, // default to working day
        })
      );
    }
    setSelectedDay("");
  };

  const daysName = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const list =
    Array.isArray(workingDays) ? workingDays :
    workingDays && Array.isArray(workingDays.results) ? workingDays.results :
    workingDays ? Object.values(workingDays).filter(Boolean) :
    [];

  // Filter out days already in the list for dropdown
  const availableDays = daysName.filter(
    (_, index) => !list.some((d) => d.weekday === index)
  );

  return (
    <div className="p-5 bg-white rounded-lg shadow-md w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Working Days</h2>

      {loading && <p className="text-blue-600">Loading...</p>}

      {/* Dropdown to add day */}
      {availableDays.length > 0 && (
        <div className="flex gap-2 mb-4">
          <select
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Select a day to add</option>
            {availableDays.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
          <button
            onClick={addDay}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add Day
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {list.length === 0 && !loading && (
          <p className="col-span-full text-gray-600">No working days available.</p>
        )}

        {list.map((day, index) => {
          if (!day || typeof day.weekday !== "number" || typeof day.is_working !== "boolean") return null;

          const weekdayLabel = daysName[day.weekday] ?? `Day ${index + 1}`;
          const key = day.id ?? `weekday-${day.weekday}-${index}`;

          return (
            <div
              key={key}
              className={`flex items-center justify-between p-4 rounded-lg border ${
                day.is_working ? "bg-green-100 border-green-400" : "bg-red-100 border-red-400"
              }`}
            >
              <span className="font-medium">{weekdayLabel}</span>

              <button
                onClick={() => toggleDay(day)}
                className={`px-4 py-1 rounded-full text-white text-sm font-medium ${
                  day.is_working ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {day.is_working ? "ON" : "OFF"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}


function HolidaysSection() {  }
function DailySlotsSection() { }