import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCiudadBySlug, getOficioBySlug, PROVINCIA_SLUG } from "@/lib/seo-data";

const STATIC_PREFIXES = ["dashboard", "admin", "api", "login", "register", "professionals", "_next", "favicon"];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 2 && segments[0] !== PROVINCIA_SLUG && !STATIC_PREFIXES.includes(segments[0])) {
    const [ciudadSlug, oficioSlug] = segments;
    const ciudad = getCiudadBySlug(ciudadSlug);
    const oficio = getOficioBySlug(oficioSlug);
    if (ciudad && oficio) {
      return NextResponse.redirect(
        new URL(`/${PROVINCIA_SLUG}/${ciudadSlug}/${oficioSlug}`, request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:ciudad/:oficio"],
};
