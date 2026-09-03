import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET as string);

async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("auth_session")?.value;
  const payload = token ? await verifyToken(token) : null;
  const adminPath = "/admin";
  const loginPath = "/login";
  const adminDashboardPath = "/admin/dashboard";
  const stfPath = "/stf";
  const protectedUserPaths = ["/profile", "/aktivitas"];
  const publicUserPaths = ["/aktivitas", "/aktivitas/"];

  const adminRoles = ["admin", "superadmin", "sqc", "pjl"];
  const isAdminUser = payload && adminRoles.includes(payload.Role as string);
  if (payload && (!payload.Role || payload.Role === "")) {
    const url = new URL(loginPath, request.url);
    url.searchParams.set("error", "bukan_maba_lu");

    const response = NextResponse.redirect(url);

    response.cookies.delete("auth_session");

    return response;
  }

  if (pathname === "/" && isAdminUser) {
    return NextResponse.redirect(new URL(adminDashboardPath, request.url));
  }

  if (pathname.startsWith(adminPath)) {
    if (!payload || !adminRoles.includes(payload.Role as string)) {
      const url = new URL(loginPath, request.url);
      url.searchParams.set("error", "unauthorized");
      return NextResponse.redirect(url);
    }
  }

  if (pathname.startsWith(stfPath) && !isAdminUser) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (
    !publicUserPaths.includes(pathname) &&
    protectedUserPaths.some((path) => pathname.startsWith(path))
  ) {
    if (!payload) {
      const url = new URL(loginPath, request.url);
      url.searchParams.set("error", "unauthorized");
      url.searchParams.set("redirect", pathname + request.nextUrl.search);
      return NextResponse.redirect(url);
    }
  }

  if (pathname.startsWith(loginPath)) {
    if (payload) {
      if (isAdminUser) {
        return NextResponse.redirect(new URL(adminDashboardPath, request.url));
      }
      const tujuan = request.nextUrl.searchParams.get("redirect");
      const tujuanAman =
        tujuan && tujuan.startsWith("/") && !tujuan.startsWith("//");
      return NextResponse.redirect(
        new URL(tujuanAman ? tujuan : "/aktivitas", request.url),
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
