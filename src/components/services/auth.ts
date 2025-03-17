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

export const LogOut = () => {
  // Clear authentication data
  document.cookie =
    "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  localStorage.clear();
  sessionStorage.clear();

  // Detect if running as a PWA
  function isPWA(): boolean {
    const navigatorStandalone = (
      window.navigator as Navigator & { standalone?: boolean }
    ).standalone;
    return (
      window.matchMedia("(display-mode: standalone)").matches ||
      navigatorStandalone === true
    );
  }

  // Unregister service worker to clear old cached pages (Optional)
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => registration.unregister());
    });
  }

  // Redirect user to home (`/`)
  if (isPWA()) {
    location.replace("/"); // Full page reload in PWA mode
  } else {
    Router.replace("/"); // Use Router.replace to avoid back navigation
  }

  // Prevent back navigation
  setTimeout(() => {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, "", window.location.href);
    };
  }, 10); // Small delay ensures redirect is processed first
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
