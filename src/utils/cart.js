export function getCart() {
  try {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  } catch (e) {
    return [];
  }
}

export function getCartCount() {
  return getCart().length;
}

export function addToCart(item) {
  const cart = getCart();
  cart.push(item);
  localStorage.setItem('cart', JSON.stringify(cart));
  // notify listeners (e.g. Navbar) that cart changed and request a toast
  try {
    window.dispatchEvent(new Event('cartUpdated'));
    window.dispatchEvent(new CustomEvent('showToast', { detail: { message: `${item.name} added to cart`, type: 'success' } }));
  } catch (e) {
    // ignore in non-browser environments
  }
  return cart.length;
}

export function clearCart() {
  localStorage.removeItem('cart');
  try {
    // notify listeners so UI (Navbar badge, drawers, pages) update
    window.dispatchEvent(new Event('cartUpdated'));
    window.dispatchEvent(new CustomEvent('showToast', { detail: { message: 'Cart cleared', type: 'info' } }));
  } catch (e) {
    // ignore in non-browser environments
  }
}

export function removeFromCart(index) {
  const cart = getCart();
  if (index < 0 || index >= cart.length) return cart.length;
  const removed = cart.splice(index, 1)[0];
  localStorage.setItem('cart', JSON.stringify(cart));
  try {
    window.dispatchEvent(new Event('cartUpdated'));
    window.dispatchEvent(new CustomEvent('showToast', { detail: { message: `${removed.name} removed from cart`, type: 'info' } }));
  } catch (e) {}
  return cart.length;
}
