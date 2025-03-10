import { remove } from "./store";

export const isAuthenticated = (token: string) => {
  if (token) {
    window.location.href = "/validate";
  } else {
    window.location.href = "/";
  }
};

export const LogOut = (): void => {
  remove();
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
      window.location.href = "/dashboard";
  }
};
