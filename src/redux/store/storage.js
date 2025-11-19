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

  if (!value || value === "undefined" || value === "null") return null;

  try {
    // Try parse → only objects will parse successfully
    return JSON.parse(value);
  } catch {
    // If parse fails → it's a raw string (token)
    return value;
  }
};

export const removeFromStorage = (key) => {
  localStorage.removeItem(key);
};
