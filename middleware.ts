import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  const PUBLIC_ROUTES = ["/login", "/register", "/access-denied"];
  
  const ADMIN_ROUTES = ["/dashboard", "/dashboard/manage-books", "/dashboard/manage-users"];

  if (!token) {
    if (PUBLIC_ROUTES.includes(pathname)) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    const userRole = payload.role as string;

    if (pathname === "/login" || pathname === "/register") {
      const redirectPath = userRole === "Admin" ? "/dashboard" : "/my-library";
      return NextResponse.redirect(new URL(redirectPath, request.url));
    }

    const isAdminRoute = ADMIN_ROUTES.some((route) => pathname.startsWith(route));
    if (isAdminRoute && userRole !== "Admin") {
      return NextResponse.redirect(new URL("/access-denied", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("token");
    return response;
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};