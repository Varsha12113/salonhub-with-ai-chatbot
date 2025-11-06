import React from 'react'

export default function Step4Time({ formData, onChange, onNext, onPrev }) {
  const { time } = formData || {};

  const slots = [
    '09:00', '10:00', '11:00', '12:00',
    '14:00', '15:00', '16:00', '17:00',
  ];

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Step 4 — Choose Time</h2>

      <div className="mb-6 grid grid-cols-2 gap-2">
        {slots.map((s) => (
          <button
            key={s}
            onClick={() => onChange('time', s)}
            className={`px-3 py-2 rounded border ${time === s ? 'bg-purple-500 text-white' : 'bg-white'}`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="flex justify-between">
        <button onClick={onPrev} className="px-4 py-2 bg-gray-200 rounded">Back</button>
        <button
          onClick={onNext}
          disabled={!time}
          className="px-4 py-2 bg-purple-500 text-white rounded disabled:opacity-60"
        >
          Next
        </button>
      </div>
    </div>
  );
}