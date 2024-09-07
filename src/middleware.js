import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  // console.log("L-6, middleware------------>", request);
  // Extract cookies from the request
  const authToken = request.cookies.get("authToken")?.value;
  const userId = request.cookies.get("user")?.value;
  console.log("L-9, userId------------>", userId);
  const token = authToken;

  const url = request.nextUrl;
  // console.log("L-20, request------------>", url);

  // Redirect to dashboard if the user is already authenticated
  // and trying to access sign-in, sign-up, or home page
  if (
    token &&
    (url.pathname.startsWith("/login") ||
      url.pathname.startsWith("/signup") ||
      url.pathname === "/")
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!token && url.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/dashboard/:path*", "/login/:path*"],
};
