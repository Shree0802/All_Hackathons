const API_BASE = '/api';

export const getAuthToken = () => localStorage.getItem('edutech_token');
export const setAuthToken = (token) => localStorage.setItem('edutech_token', token);
export const removeAuthToken = () => localStorage.removeItem('edutech_token');

export const apiFetch = async (endpoint, options = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers
  };

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'API Request Failed');
    }
    return data;
  } catch (err) {
    console.warn(`[API Client Warning] Request to ${endpoint} failed:`, err.message);
    throw err;
  }
};
