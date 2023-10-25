
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

let hasRedirected = false; // Add this variable

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath =
    path === "/login" ||
    path === "/signup" ||
    path === "/" ||
    path === "/verifyemail";
  const token = request.cookies.get("token")?.value || "";

  if (!hasRedirected) {
    if (!isPublicPath && token) {
      // Decode the token to retrieve isAdmin information
      const decodedToken = jwt.decode(token);
      console.log(decodedToken);
      // Check if the user is an admin
      // @ts-ignore
      if (decodedToken && decodedToken.isAdmin) {
        hasRedirected = true;
        return NextResponse.redirect(
          new URL("/AdminDashboard", request.nextUrl)
        );
      }
    }
  }

  // Check if the user is an admin and trying to access the "/dashboard" route
  if (path.startsWith("/dashboard") && token) {
    const decodedToken = jwt.decode(token);
    // @ts-ignore
    if (decodedToken && decodedToken.isAdmin) {
      hasRedirected = true;
      return NextResponse.redirect(new URL("/AdminDashboard", request.nextUrl));
    }
  }

  // Check if the user is not an admin and trying to access the "/AdminDashboard" route
  if (path.startsWith("/AdminDashboard") && token) {
    const decodedToken = jwt.decode(token);
    // @ts-ignore
    if (decodedToken && !decodedToken.isAdmin) {
      hasRedirected = true;
      return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
    }
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  // If none of the conditions match, allow the request to continue
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/AdminDashboard/:path*",
    "/login",
    "/signup",
    "/verifyemail/:path*",
    "/settings/:path*",
    "/referrals/:path*",
  ],
};
