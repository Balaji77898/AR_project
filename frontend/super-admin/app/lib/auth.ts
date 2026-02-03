export function getAuthToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("superadmin_token");
}

export function isAuthenticated() {
  return !!getAuthToken();
}
