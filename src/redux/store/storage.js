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
  const value = localStorage.getItem(key);
  if (value === null) return null;

  try {
    // If it's JSON, parse it
    return JSON.parse(value);
  } catch (err) {
    // If parsing fails, return raw string (JWT, etc.)
    return value;
  }
};

export const removeFromStorage = (key) => {
  localStorage.removeItem(key);
};
