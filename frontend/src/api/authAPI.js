const API = `${import.meta.env.VITE_BACKEND_API}/user`;

export const loginRequest = (email, password) =>
  fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

export const refreshAccessTokenRequest = () =>
  fetch(`${API}/refresh-token`, {
    method: "POST",
    credentials: "include",
  });

