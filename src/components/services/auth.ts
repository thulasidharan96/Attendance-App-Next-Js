import { remove } from "./store";

export const isAuthenticated = (token: string | null): boolean => {
  if (token) {
    window.location.href = "/validate";
    return true;
  }
  return false;
};

export const LogOut = (): void => {
  remove();
  window.location.href = "/";
};

export const validate = (): void => {
  const data = localStorage.getItem("role");
  if (data === "admin") {
    window.location.href = "/admin";
  } else if (data === "user") {
    window.location.href = "/dashboard";
  } else {
    window.location.href = "/";
  }
};
