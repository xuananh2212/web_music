import { NextRequest, NextResponse } from "next/server";
import middlewareCookies, { manageCookies } from "./middleware/helpers/cookies";
import setResponseHeaders from "./middleware/helpers/headers";
import { authMiddleware } from "./middleware/utils";

export const AUTH_ROUTES = ["/login", "/register","/reset-password"];

export async function middleware(request: NextRequest) {
  let response = NextResponse.next();
  let { pathname, search } = request.nextUrl;

  // setResponseHeaders(response, {
  //   pathname,
  //   search,
  // });

  // const actionCheckAuth = await authMiddleware({
  //   nextUrl: request.nextUrl,
  //   cookies: middlewareCookies(request),
  // });

  // if (actionCheckAuth.action === "redirect") {
  //   let redirectResponse = NextResponse.redirect(new URL(actionCheckAuth.path || "/", request.url));
  //   setResponseHeaders(redirectResponse, {
  //     pathname,
  //     search,
  //   });
  //   if (actionCheckAuth?.cookies) {
  //     redirectResponse = manageCookies(redirectResponse, actionCheckAuth.cookies);
  //   }
  //   return redirectResponse;
  // } else {
  //   if (actionCheckAuth?.cookies) {
  //     response = manageCookies(response, actionCheckAuth.cookies);
  //   }
  // }

  return response;
}

export const config = {
  matcher: ["/((?!api|mock|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|webp)$).*)"],
};
