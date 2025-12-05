import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getSlotMasters, createSlotMaster } from "../../redux/Slice/schedulerSlice";
import {getWorkingDays,updateWorkingDay,createWorkingDay} from "../../redux/Slice/schedulerSlice";
import {
  getHolidays,
  addHoliday,
  deleteHoliday,
} from "../../redux/Slice/schedulerSlice";
import { Trash2, Plus } from "lucide-react";
import {
  fetchAvailableDates,
  fetchSlotsByDate,
} from "../../redux/Slice/schedulerSlice";

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
            className="px-4 py-2 bg-purple-500 text-white rounded"
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


function HolidaysSection() {
  const dispatch = useDispatch();
  const { holidays, loading } = useSelector((state) => state.scheduler);

  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    date: "",
    description: "",
  });

  useEffect(() => {
    dispatch(getHolidays());
  }, [dispatch]);

  const handleAddHoliday = () => {
    if (!form.date || !form.description) return alert("All fields required");

    dispatch(addHoliday(form)).then(() => {
      setShowModal(false);
      setForm({ date: "", description: "" });
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this holiday?")) {
      dispatch(deleteHoliday(id));
    }
  };

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Holiday Management</h1>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          <Plus size={18} /> Add Holiday
        </button>
      </div>

      {/* Loading */}
      {loading && <p className="text-gray-500">Loading...</p>}

      {/* Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-100 text-left text-sm font-semibold">
            <tr>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Reason</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {holidays.length === 0 && (
              <tr>
                <td colSpan="3" className="px-6 py-6 text-center text-gray-500">
                  No holidays found
                </td>
              </tr>
            )}

            {holidays.map((h) => (
              <tr key={h.id} className="border-t">
                <td className="px-6 py-4">{h.holiday_date}</td>
                <td className="px-6 py-4">{h.reason}</td>

                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDelete(h.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --------------------------- Add Holiday Modal --------------------------- */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white w-[400px] rounded-lg p-6 shadow-lg">
            <h2 className="font-bold text-lg mb-4">Add Holiday</h2>

            <div className="flex flex-col gap-3">
              {/* Date Field */}
              <div>
                <label className="text-sm font-medium">Holiday Date</label>
                <input
                  type="date"
                  className="w-full border p-2 rounded mt-1"
                  value={form.date}
                  onChange={(e) =>
                    setForm({ ...form, date: e.target.value })
                  }
                />
              </div>

              {/* Description Field */}
              <div>
                <label className="text-sm font-medium">Reason</label>
                <input
                  type="text"
                  placeholder="Ex: Diwali, Pongal..."
                  className="w-full border p-2 rounded mt-1"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  onClick={handleAddHoliday}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* ----------------------------------------------------------------------- */}
    </div>
  );

  }










function DailySlotsSection() {
  const dispatch = useDispatch();

  // provide safe defaults so `.length` and `.map` are always valid
  const { availableDates = [], dailySlots = [], selectedDate, loading } = useSelector(
    (state) => state.scheduler
  );

  const [activeDate, setActiveDate] = useState(null);

  // Load available dates on page load
  useEffect(() => {
    dispatch(fetchAvailableDates());
  }, [dispatch]);

  // when availableDates arrive, set a sensible activeDate if none selected
  useEffect(() => {
    if (!activeDate && availableDates && availableDates.length > 0) {
      // prefer selectedDate from state if present, otherwise first available date
      setActiveDate(selectedDate || availableDates[0]);
      // optionally fetch slots for that date
      const dateToLoad = selectedDate || availableDates[0];
      if (dateToLoad) dispatch(fetchSlotsByDate(dateToLoad));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availableDates, selectedDate, dispatch]);

  // Handle clicking a date
  const handleDateClick = (date) => {
    if (!date) return;
    setActiveDate(date);
    dispatch(fetchSlotsByDate(date));
  };

  // ⏮ Previous date
  const handlePrevDate = () => {
    if (!activeDate || !Array.isArray(availableDates) || availableDates.length === 0) return;
    const index = availableDates.indexOf(activeDate);
    if (index > 0) {
      const prevDate = availableDates[index - 1];
      handleDateClick(prevDate);
    }
  };

  // ⏭ Next date
  const handleNextDate = () => {
    if (!activeDate || !Array.isArray(availableDates) || availableDates.length === 0) return;
    const index = availableDates.indexOf(activeDate);
    if (index >= 0 && index < availableDates.length - 1) {
      const nextDate = availableDates[index + 1];
      handleDateClick(nextDate);
    }
  };

  // 📅 Date Picker Load
  const [manualDate, setManualDate] = useState("");

  const handleManualLoad = () => {
    if (!manualDate) return;
    handleDateClick(manualDate);
  };

  return (
    <div className="p-6 text-gray-800">
      {/* Page Title */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#1A237E]">
            Daily Slots
          </h1>
          <p className="text-gray-500 text-sm">
            View generated daily slots for each date
          </p>
        </div>

        {/* DATE PICKER + CONTROLS */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrevDate}
            className="px-3 py-2 border rounded-lg hover:bg-gray-100"
          >
            ◀
          </button>

          <input
            type="date"
            value={manualDate}
            onChange={(e) => setManualDate(e.target.value)}
            className="border rounded-lg px-3 py-2"
          />

          <button
            onClick={handleNextDate}
            className="px-3 py-2 border rounded-lg hover:bg-gray-100"
          >
            ▶
          </button>

          <button
            onClick={handleManualLoad}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg"
          >
            Load
          </button>
        </div>
      </div>

      {/* DATE PICKER BOX */}
      <div className="bg-white shadow rounded-xl p-5 border border-gray-200">
        <h2 className="text-lg font-medium text-gray-700 mb-3">
          Available dates (quick pick):
        </h2>

        <div className="flex gap-3 overflow-x-auto pb-2">
          {availableDates.length === 0 && (
            <p className="text-gray-500">No available dates</p>
          )}

          {availableDates.map((date) => (
            <button
              key={date}
              onClick={() => handleDateClick(date)}
              className={`px-4 py-2 rounded-lg border text-sm min-w-[120px]
                ${
                  activeDate === date
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                }
              `}
            >
              {date}
            </button>
          ))}
        </div>
      </div>

      {/* Slots Section */}
      <div className="mt-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-700">
            {selectedDate ? `Slots for ${selectedDate}` : "Select a date to view slots"}
          </h2>

          {Array.isArray(dailySlots) && dailySlots.length > 0 && (
            <p className="text-sm text-gray-600">{dailySlots.length} slots</p>
          )}
        </div>

        <p className="text-gray-500 text-sm">
          These slots are generated from templates (SlotMasters). Admin cannot edit daily slots here.
        </p>

        {/* LOADING */}
        {loading && (
          <p className="text-blue-600 text-sm font-medium mt-2">Loading slots...</p>
        )}

        {/* SLOT GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {(dailySlots || []).map((slot) => (
            <div
              key={slot.id}
              className={`p-4 rounded-xl border shadow-sm relative
              ${
                slot.status === "available"
                  ? "bg-green-50 border-green-400"
                  : "bg-red-50 border-red-400"
              }`}
            >
              {/* Top-right date */}
              <p className="text-xs text-gray-400 absolute top-2 right-3">
                {selectedDate}
              </p>

              {/* Time */}
              <p className="text-lg font-semibold text-gray-800">
                {slot.slot_master?.start_time} — {slot.slot_master?.end_time}
              </p>

              {/* Status */}
              <p
                className={`mt-1 text-sm font-medium ${
                  slot.status === "available"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                Status: {slot.status}
              </p>

              {/* Booked User */}
              {slot.status !== "available" && (
                <p className="text-xs mt-1 text-gray-600">
                  Booked by: {slot.booked_by || "N/A"}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {!loading && selectedDate && (dailySlots || []).length === 0 && (
          <p className="text-gray-500 mt-4">No slots available for this date.</p>
        )}
      </div>
    </div>
  );
}


 