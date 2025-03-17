import Router from "next/router";
import { jwtDecode } from "jwt-decode";
import { getToken } from "./store";

interface DecodedToken {
  role?: string;
  exp?: number;
}

export const isAuthenticated = (): boolean => {
  const token = getToken();
  return !!token; // ✅ Simply return true/false, don't push a route
};

export const LogOut = (): void => {
  localStorage.clear(); // Clear all local storage
  Router.push("/"); // Redirect to login page

  // Prevent user from navigating back
  setTimeout(() => {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function () {
      window.history.pushState(null, "", window.location.href);
    };
  }, 0);
};

export const validate = (): void => {
  const token = getToken();

  if (!token) {
    console.error("No token found!");
    Router.push("/");
    return;
  }

  try {
    const decoded: DecodedToken = jwtDecode<DecodedToken>(token);

    if (!decoded.exp || Date.now() >= decoded.exp * 1000) {
      console.error("Token has expired");
      LogOut();
      return;
    }

    switch (decoded.role) {
      case "admin":
        Router.push("/admin");
        break;
      case "user":
        Router.push("/dashboard");
        break;
      default:
        Router.push("/");
    }
  } catch (error) {
    console.error("Invalid token:", error);
    LogOut();
  }
};
