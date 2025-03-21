import Router from "next/router";
import { jwtDecode } from "jwt-decode";
import { getToken } from "./store";
import * as cookie from "cookie";

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
  document.cookie = "role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  document.cookie = "onboard=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

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

    localStorage.setItem("userId", String(decoded.userId));
    localStorage.setItem("email", String(decoded.email));

    // Set cookies for role and onboard status
    document.cookie = cookie.serialize("role", String(decoded.role), {
      path: "/",
      maxAge: 1200, // 20 minutes
    });

    document.cookie = cookie.serialize("onboard", String(decoded.onboard), {
      path: "/",
      maxAge: 1200, // 20 minutes
    });

    // Redirect based on onboard and role
    if (!decoded.onboard) {
      Router.push("/onboard");
    } else if (decoded.role === "admin") {
      Router.push("/admin");
    } else if (decoded.role === "user") {
      Router.push("/dashboard");
    }
  } catch (error) {
    console.error("Invalid token:", error);
    LogOut();
  }
};
