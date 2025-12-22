const API = `${import.meta.env.VITE_BACKEND_API}/user`;

export const registerRequest = (name, email, username, password) =>
  fetch(`${API}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ name, email, username, password }),
  });

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

export const logoutRequest = () =>
  fetch(`${API}/logout`, {
    method: "GET",
    credentials: "include",
  });

export const forgotPasswordRequest = (email) =>
  fetch(`${API}/forgot-password/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
