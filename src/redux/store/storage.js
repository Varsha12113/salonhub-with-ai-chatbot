// src/redux/store/storage.js

export const saveToStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getFromStorage = (key) => {
  const value = localStorage.getItem(key);
  if (!value || value === "undefined" || value === "null") return null;
  try {
    return JSON.parse(value);
  } catch (error) {
    console.error(`Error parsing JSON for key "${key}":`, error);
    return null;
  }
};
export const removeFromStorage = (key) => {
  localStorage.removeItem(key);
};
