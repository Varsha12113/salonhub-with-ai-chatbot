import React from 'react';
import { getCart, removeFromCart, clearCart } from '../utils/cart';
import { useNavigate } from 'react-router-dom';
export default function Cart() {
  const [items, setItems] = React.useState(() => getCart());
  const navigate = useNavigate(); 
  React.useEffect(() => {
    const h = () => setItems(getCart());
    window.addEventListener('cartUpdated', h);
    return () => window.removeEventListener('cartUpdated', h);
  }, []);

  const handleRemove = (i) => {
    removeFromCart(i);
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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

        {items.length === 0 ? (
          <div className="text-gray-600">Your cart is empty.</div>
        ) : (
          <div>
            <ul className="space-y-4 mb-6">
              {items.map((it, idx) => (
                <li key={idx} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{it.name}</div>
                    <div className="text-sm text-gray-500">{it.category}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="font-semibold">{it.price}</div>
                    <button onClick={() => handleRemove(idx)} className="text-red-500 text-sm">Remove</button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold">Total: ₹{total}</div>
              <div className="flex gap-2">
                <button onClick={handleClear} className="px-3 py-2 bg-gray-100 rounded">Clear</button>
                <button onClick={() => navigate('/booking')}className="px-4 py-2 bg-purple-500 text-white rounded">Proceed to Checkout</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
