import React from 'react'

export default function Step5Customer({ formData, onChange, onPrev, onSubmit }) {
  const { name, phone, email } = formData || {};

  const canSubmit = name && phone && email;

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Step 5 — Customer Details</h2>

      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
        <input value={name || ''} onChange={(e) => onChange('name', e.target.value)} className="w-full border px-3 py-2 rounded" />
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
        <input value={phone || ''} onChange={(e) => onChange('phone', e.target.value)} className="w-full border px-3 py-2 rounded" />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input value={email || ''} onChange={(e) => onChange('email', e.target.value)} className="w-full border px-3 py-2 rounded" />
      </div>

      <div className="flex justify-between">
        <button onClick={onPrev} className="px-4 py-2 bg-gray-200 rounded">Back</button>
        <button onClick={onSubmit} disabled={!canSubmit} className="px-4 py-2 bg-purple-500 text-white rounded disabled:opacity-60">Submit</button>
      </div>
    </div>
  );
}