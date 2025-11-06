import React, { useState, useEffect } from 'react';

export default function Toast() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handler = (e) => {
      const detail = e.detail || { message: String(e), type: 'info' };
      const id = Date.now() + Math.random();
      setToasts((t) => [...t, { id, message: detail.message || 'Notification', type: detail.type || 'info' }]);
    };

    window.addEventListener('showToast', handler);
    return () => window.removeEventListener('showToast', handler);
  }, []);

  useEffect(() => {
    if (toasts.length === 0) return;
    const timers = toasts.map((toast) =>
      setTimeout(() => {
        setToasts((t) => t.filter((x) => x.id !== toast.id));
      }, 3000)
    );
    return () => timers.forEach((id) => clearTimeout(id));
  }, [toasts]);

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`px-4 py-2 rounded-lg shadow-md text-white max-w-xs w-full ${
            t.type === 'success' ? 'bg-green-500' : t.type === 'error' ? 'bg-red-500' : 'bg-gray-700'
          }`}
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}
