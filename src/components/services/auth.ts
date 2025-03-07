export const isAuthenticated = () => {
  if (typeof window === "undefined") return false;
  if (localStorage.getItem("AuthToken")) return true;
  return false;
};

export const LogOut = () => {
  localStorage.removeItem("AuthToken");
  window.location.href = "/";
};
