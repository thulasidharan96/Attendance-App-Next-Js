import Router from "next/router";

export const isAuthenticated = (token: string) => {
  if (token) {
    return true;
  } else {
    Router.push("/");
  }
};

export const LogOut = (): void => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("name");
  localStorage.removeItem("RegisterNumber");
  localStorage.removeItem("userId");
  localStorage.removeItem("department");

  // Redirect to login page
  Router.push("/");
};

export const validate = (): void => {
  const role = localStorage.getItem("role");

  switch (role) {
    case "admin":
      Router.push("/admin");
      break;
    case "user":
      Router.push("/dashboard");
      break;
    default:
      Router.push("/dashboard");
  }
};
