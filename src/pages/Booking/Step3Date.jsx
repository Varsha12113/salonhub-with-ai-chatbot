import React from 'react'

export default function Step3Date({ formData, onChange, onNext, onPrev }) {
  const { date } = formData || {};

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Step 3 — Choose Date</h2>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select a date</label>
        <input
          type="date"
          value={date || ''}
          onChange={(e) => onChange('date', e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div className="flex justify-between">
        <button onClick={onPrev} className="px-4 py-2 bg-gray-200 rounded">Back</button>
        <button
          onClick={onNext}
          disabled={!date}
          className="px-4 py-2 bg-purple-500 text-white rounded disabled:opacity-60"
        >
          Next
        </button>
      </div>
    </div>
  );
}