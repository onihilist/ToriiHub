import axios from 'axios';

// Shared axios instance pointed at the Spring Boot backend.
export const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Placeholder for future authenticated requests. Once a real auth flow exists,
// attach the bearer token here:
// api.interceptors.request.use((config) => {
//   const token = getToken();
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

export default api;
