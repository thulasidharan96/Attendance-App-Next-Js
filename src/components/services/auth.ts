import Router from "next/router";

export const isAuthenticated = (token: string) => {
  if (token) {
    return true;
  } else {
    Router.push("/");
  }
};

export const LogOut = (): void => {
  localStorage.removeItem("authToken"); // Clear token
  localStorage.clear(); // Clear all local storage
  Router.push("/"); // Redirect to login page

  // Prevent user from navigating back
  setTimeout(() => {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function () {
      window.history.pushState(null, "", window.location.href);
    };
  }, 0);
  // Redirect to login page
  Router.push("/");
};

export const validate = (): void => {
  // const token = localStorage.getItem("authToken");
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
