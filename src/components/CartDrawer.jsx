import React from 'react';
import { getCart, removeFromCart, clearCart } from '../utils/cart';
import { Link, useNavigate } from 'react-router-dom';

export default function CartDrawer({ isOpen, onClose }) {
  const [items, setItems] = React.useState(getCart());
  const navigate = useNavigate();

  React.useEffect(() => {
    setItems(getCart());
    const handler = () => setItems(getCart());
    window.addEventListener('cartUpdated', handler);
    return () => window.removeEventListener('cartUpdated', handler);
  }, []);

  const handleRemove = (index) => {
    removeFromCart(index);
    setItems(getCart());
  };

  const handleClear = () => {
    clearCart();
    setItems([]);
  };

  const total = items.reduce((s, it) => {
    const p = String(it.price || '').replace(/[^0-9]/g, '');
    const num = Number(p) || 0;
    return s + num;
  }, 0);

  return (
    <div
      className={`fixed inset-0 z-40 transition-all ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
    >
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />

      <aside
        className={`absolute right-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="text-lg font-semibold">Your Cart</h3>
          <button onClick={onClose} className="text-gray-600">Close</button>
        </div>

        <div className="p-4 flex-1 overflow-y-auto h-[calc(100%-160px)]">
          {items.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">Your cart is empty.</div>
          ) : (
            <ul className="space-y-4">
              {items.map((it, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="flex-1">
                    <div className="font-medium">{it.name}</div>
                    <div className="text-sm text-gray-500">{it.category}</div>
                  </div>
                  <div className="text-sm font-semibold">{it.price}</div>
                  <button
                    onClick={() => handleRemove(idx)}
                    className="ml-2 text-sm text-red-500"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="p-4 border-t">
  <div className="flex items-center justify-between mb-3">
    <div className="text-sm text-gray-600">Total</div>
    <div className="text-lg font-bold">₹{total}</div>
  </div>

  <div className="flex gap-2">
    {/* Proceed to Booking Button */}
    <button
      onClick={() => {
        onClose();
        navigate('/booking?modal=true');
      }}
      className="flex-1 px-3 py-2 bg-white text-purple-700 rounded-md border border-purple-200 text-center"
    >
      Proceed to Booking
    </button>
    
  </div>
</div>

      </aside>
    </div>
  );
}
