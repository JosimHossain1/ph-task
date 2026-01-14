import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // Public routes
  const PUBLIC_ROUTES = ["/login", "/register", "/access-denied"];

  // Admin routes
  const ADMIN_ROUTES = ["/dashboard", "/dashboard/manage-books", "/dashboard/manage-users"];

  // 1. If no token and trying to access protected routes → login
  if (!token) {
    if (PUBLIC_ROUTES.includes(pathname)) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    // 2. Verify token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    const userRole = payload.role as string;

    // 3. Redirect logged-in users away from login/register
    if (pathname === "/login" || pathname === "/register") {
      const redirectPath = userRole === "Admin" ? "/dashboard" : "/";
      return NextResponse.redirect(new URL(redirectPath, request.url));
    }

    // 4. Role-based admin access
    if (ADMIN_ROUTES.some((route) => pathname.startsWith(route)) && userRole !== "Admin") {
      // Redirect normal users to Access Denied page
      return NextResponse.redirect(new URL("/access-denied", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    // Invalid or expired token → delete cookie and go to login
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("token");
    return response;
  }
}

// Apply middleware to all routes except Next.js internals
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
