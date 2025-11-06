import React from 'react'

export default function Step2Category({ formData, onChange, onNext, onPrev }) {
  const { category, stylist } = formData || {};

  const categories = [
    'hair',
    'makeup',
    'waxing',
    'mani-pedi',
    'bridal',
    'facial',
    'beard',
  ];

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Step 2 — Choose Category & Stylist</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
        <select
          value={category || ''}
          onChange={(e) => onChange('category', e.target.value)}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Select a category</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Stylist (optional)</label>
        <input
          value={stylist || ''}
          onChange={(e) => onChange('stylist', e.target.value)}
          placeholder="Enter stylist name or leave blank"
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div className="flex justify-between">
        <button onClick={onPrev} className="px-4 py-2 bg-gray-200 rounded">Back</button>
        <button
          onClick={onNext}
          disabled={!category}
          className="px-4 py-2 bg-purple-500 text-white rounded disabled:opacity-60"
        >
          Next
        </button>
      </div>
    </div>
  );
}