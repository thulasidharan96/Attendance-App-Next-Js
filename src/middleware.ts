import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const authToken = req.cookies.get("auth_token")?.value;
  const userRole = req.cookies.get("role")?.value;
  const onboard = req.cookies.get("onboard")?.value;

  const pathname = req.nextUrl.pathname;

  // ✅ Define protected routes
  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isAdminRoute = pathname.startsWith("/admin");
  const isOnboardRoute = pathname.startsWith("/onboard");

  // 🚨 Redirect logged-out users away from protected routes
  if (!authToken) {
    if (isDashboardRoute || isAdminRoute || isOnboardRoute) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  // 🚨 Prevent onboarded users from accessing `/onboard`
  if (onboard === "true" && isOnboardRoute) {
    return NextResponse.redirect(
      new URL(userRole === "admin" ? "/admin" : "/dashboard", req.url)
    );
  }

  // 🚨 Prevent non-admin users from accessing `/admin` or any subroutes (`/admin/*`)
  if (userRole !== "admin" && isAdminRoute) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // 🚨 Prevent admin users from accessing `/dashboard` or any subroutes (`/dashboard/*`)
  if (userRole === "admin" && isDashboardRoute) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  // 🚨 If user is authenticated but NOT onboarded, redirect them to `/onboard`
  if (onboard === "false" && !isOnboardRoute) {
    return NextResponse.redirect(new URL("/onboard", req.url));
  }

  // 🚨 Redirect authenticated users away from `/` (login page)
  if (pathname === "/") {
    return NextResponse.redirect(
      new URL(userRole === "admin" ? "/admin" : "/dashboard", req.url)
    );
  }

  return NextResponse.next();
}

// ✅ Exclude Next.js assets & API routes from middleware execution
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
