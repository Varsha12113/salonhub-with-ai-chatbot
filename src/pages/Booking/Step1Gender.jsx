import React from 'react'

export default function Step1Gender({ formData, onChange, onNext }) {
  const { gender } = formData || {};

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Step 1 — Choose Gender</h2>

      <div className="space-y-2 mb-6">
        {['female', 'male'].map((g) => (
          <label key={g} className="flex items-center gap-3">
            <input
              type="radio"
              name="gender"
              value={g}
              checked={gender === g}
              onChange={(e) => onChange('gender', e.target.value)}
              className="form-radio"
            />
            <span className="capitalize">{g}</span>
          </label>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          onClick={onNext}
          disabled={!gender}
          className="px-4 py-2 bg-purple-500 text-white rounded disabled:opacity-60"
        >
          Next
        </button>
      </div>
    </div>
  );
}