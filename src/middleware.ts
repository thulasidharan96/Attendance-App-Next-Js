import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Get auth_token from cookies
  const authToken = req.cookies.get("auth_token")?.value;
  const userRole = req.cookies.get("role")?.value; // Assuming role is stored in cookies
  const onboard = req.cookies.get("onboard")?.value; // Assuming onboard is stored in cookies

  // Define protected routes
  const protectedRoutes = ["/dashboard", "/admin", "/validate"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  if (!authToken && isProtectedRoute) {
    // If no token & trying to access a protected route, redirect to "/"
    return NextResponse.redirect(new URL("/", req.url));
  }
  // Redirect
  if (authToken && onboard === "false") {
    return NextResponse.redirect(new URL("/onboard", req.url));
  }
  // Redirect authenticated users from `/` (acting as the login page)
  if (authToken && req.nextUrl.pathname === "/") {
    if (userRole === "admin") {
      return NextResponse.redirect(new URL("/admin", req.url));
    } else {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  return NextResponse.next();
}

// Apply middleware to all routes except `/`
export const config = {
  matcher: ["/((?!^/$).*)"], // Match everything except `/`
};
