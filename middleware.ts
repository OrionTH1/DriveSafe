import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";
import { verifySession } from "./lib/session";

const publicRouter = [
  {
    path: "/login",
    whenAuthenticated: "redirect",
  },
  {
    path: "/register",
    whenAuthenticated: "redirect",
  },
] as const;
const privateRouter = [
  {
    path: "/",
    whenIsNotAuthenticated: "redirect",
  },
] as const;
const RedirectUrl_WhenIsNotAuthenticated = "/login";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicRoute = publicRouter.find((route) => route.path === path);
  const privateRoute = privateRouter.find((route) => route.path === path);
  const isAuth = (await verifySession()).isAuth;

  if (!isAuth && publicRoute) {
    return NextResponse.next();
  }

  if (!isAuth && privateRoute) {
    const redirectUrl = request.nextUrl.clone();

    redirectUrl.pathname = RedirectUrl_WhenIsNotAuthenticated;

    return NextResponse.redirect(redirectUrl);
  }

  if (isAuth && publicRoute && publicRoute.whenAuthenticated === "redirect") {
    const redirectUrl = request.nextUrl.clone();

    redirectUrl.pathname = "/";

    return NextResponse.redirect(redirectUrl);
  }

  if (isAuth && privateRoute) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  /*
   * Match all request paths except for the ones starting with:
   * - api (API routes)
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - favicon.ico, sitemap.xml, robots.txt (metadata files)
   */
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
