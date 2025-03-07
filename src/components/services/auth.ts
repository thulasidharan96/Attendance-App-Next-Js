import { remove } from "./store";

export const isAuthenticated = (token: string | null): boolean => {
  if (!token) {
    return false;
  }
  return true;
};

export const LogOut = (): void => {
  remove();
  window.location.href = "/";
};

export const validate = (): void => {
  const role = localStorage.getItem("role");

  switch (role) {
    case "admin":
      window.location.href = "/admin";
      break;
    case "user":
      window.location.href = "/dashboard";
      break;
    default:
      window.location.href = "/";
  }
};
