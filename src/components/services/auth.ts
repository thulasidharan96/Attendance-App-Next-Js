import { remove } from "./store";

export const isAuthenticated = (token: any) => {
  if (token) {
    window.location.href = "/validate";
    return true;
  } else {
    return false;
  }
};

export const LogOut = () => {
  remove();
  window.location.href = "/";
};

export const validate = () => {
  const data = localStorage.getItem("role");
  if (data === "admin") {
    window.location.href = "/admin";
  } else if (data === "user") {
    window.location.href = "/dashboard";
  } else {
    window.location.href = "/";
  }
};
