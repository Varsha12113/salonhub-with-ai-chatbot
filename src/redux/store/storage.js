// src/redux/store/storage.js

export const saveToStorage = (key, value) => {
  if (typeof value === "string") {
    // Save raw string → important for JWT token
    localStorage.setItem(key, value);
  } else {
    // Save objects as JSON
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const getFromStorage = (key) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (err) {
    return null;
  }
};

export const removeFromStorage = (key) => {
  localStorage.removeItem(key);
};
