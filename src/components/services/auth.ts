import Router from "next/router";
import { jwtDecode } from "jwt-decode";
import { getToken } from "./store";

interface DecodedToken {
  email(email: string): string; // Replace 'any' with 'string'
  userId(arg0: string, userId: string): unknown;
  role?: string;
  exp?: number;
  onboard: boolean;
}

export const isAuthenticated = (): boolean => {
  const token = getToken();
  if (token) {
    return true;
  }
  return false; // ✅ Simply return true/false, don't push a route
};

export const LogOut = () => {
  // Clear authentication data
  document.cookie =
    "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  localStorage.clear();
  sessionStorage.clear();

  // Detect if running as a PWA
  const isPWA = (): boolean => {
    return (
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as Navigator & { standalone?: boolean }).standalone ===
        true
    );
  };

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => registration.unregister());
    });
  }

  // Prevent back navigation (More effective on mobile browsers)
  const disableBackNavigation = () => {
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", () => {
      window.history.pushState(null, "", window.location.href);
    });
  };

  // Redirect user based on PWA or mobile web mode
  setTimeout(() => {
    if (isPWA()) {
      location.replace("/"); // Full page reload to ensure fresh session
    } else {
      Router.replace("/"); // Prevents back navigation in browser history
    }
    disableBackNavigation(); // Ensures the back button doesn't navigate to previous state
  }, 50); // Slight delay ensures proper execution order
};

export const validate = (): void => {
  const token = getToken();

  if (!isAuthenticated()) {
    Router.push("/");
    return;
  }

  try {
    if (!token) {
      console.error("No token found!");
      Router.push("/");
      return;
    }

    const decoded: DecodedToken = jwtDecode<DecodedToken>(token);
    if (!decoded.exp || Date.now() >= decoded.exp * 1000) {
      console.error("Token has expired");
      LogOut();
      return;
    }

    if (!decoded.onboard) {
      Router.push("/onboard");
    }

    localStorage.setItem("userId", String(decoded.userId));
    localStorage.setItem("email", String(decoded.email));

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
