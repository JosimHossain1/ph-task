import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  const PUBLIC_ROUTES = ["/login", "/register", "/access-denied"];
  
  const ADMIN_ROUTES = ["/dashboard", "/dashboard/manage-books", "/dashboard/manage-users"];

  // 1. If no token
  if (!token) {
    // Allow public routes
    if (PUBLIC_ROUTES.includes(pathname)) {
      return NextResponse.next();
    }
    // Redirect everything else to login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    // 2. Verify token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    const userRole = payload.role as string;

    // 3. If logged in, don't allow access to Login/Register
    if (pathname === "/login" || pathname === "/register") {
      const redirectPath = userRole === "Admin" ? "/dashboard" : "/my-library";
      return NextResponse.redirect(new URL(redirectPath, request.url));
    }

    // 4. Role-based protection
    const isAdminRoute = ADMIN_ROUTES.some((route) => pathname.startsWith(route));
    if (isAdminRoute && userRole !== "Admin") {
      return NextResponse.redirect(new URL("/access-denied", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    // If token is invalid or expired
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("token");
    return response;
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};