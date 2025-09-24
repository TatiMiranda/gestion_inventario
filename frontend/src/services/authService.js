import api from "./api";

export async function login(credentials) {
  const { data } = await api.post("/auth/login", credentials);
  localStorage.setItem("token", data.token);
  return data;
}

export function logout() {
  localStorage.removeItem("token");
}

export function getToken() {
  return localStorage.getItem("token");
}
