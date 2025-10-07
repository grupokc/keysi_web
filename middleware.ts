// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserHome } from "./app/utils/getUserHome";

export function middleware(request: NextRequest) {
  const { pathname: path, origin, hostname } = request.nextUrl;
  
  // Log para debugging
  // console.log('Middleware - Hostname:', hostname);
  // console.log('Middleware - Path:', path);

  // Leer cookies
  const titanGuid = request.cookies.get("titan_guid");
  const userDataCookie = request.cookies.get("user_data");
  const impersonationMode = request.cookies.get("impersonation_mode");

  // Rutas públicas
  const isPublicRoute = (
    path.startsWith("/auth") ||
    path.startsWith("/auth/forms/resetForm") ||
    path.startsWith("/auth/resetPassword")
  );

  // 1) Sin titanGuid y no es pública => forzar login
  if (!titanGuid && !isPublicRoute) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  // 2) Sin titanGuid pero la ruta es /auth o rutas de reset => permitir
  if (!titanGuid && (
    path === "/auth" ||
    path.startsWith("/auth/forms/resetForm") ||
    path.startsWith("/auth/resetPassword")
  )) {
    return NextResponse.next();
  }

  // 3) Hay titanGuid pero NO userData => limpiar y redirigir
  if (titanGuid && !userDataCookie) {
    const res = NextResponse.redirect(new URL("/auth", request.url));
    res.cookies.delete("titan_guid");
    res.cookies.delete("user_data");
    res.cookies.delete("impersonation_mode");
    return res;
  }

  // 4) Verificar userData
  const userData = userDataCookie?.value ? JSON.parse(userDataCookie.value) : null;
  if (!userData) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  // 5) Checar rol
  const isCollaborator = userData.Id_Tipo === 1; 
  const isRestricted = [2, 3, 4, 7].includes(userData.Id_Tipo);

  // 6) Si impersonation_mode => se comporta como el rol que indique "user_data"
  //    No hacemos "return" inmediato, sino que seguimos la lógica para
  //    que aplique el bloqueo manual si Id_Tipo=2 (restringido).

  const userHome = getUserHome(userData);
  const referer = request.headers.get("referer") || "";

  // ─────────────────────────────────────────────────────────────────
  // A) Colaborador (tipo 1) 
  //    => Solo teclear manualmente "/inbox/kc". Si no, redirige a "/inbox/kc".
  // ─────────────────────────────────────────────────────────────────
  if (isCollaborator && !impersonationMode) {
    // (Si estás en modo suplantación y userData=2, pasa a la sección restringido)
    if (!referer.includes(origin)) {
      // typed en la barra
      if (path !== "/inbox/kc") {
        return NextResponse.redirect(new URL("/inbox/kc", request.url));
      }
    }
    return NextResponse.next();
  }

  // ─────────────────────────────────────────────────────────────────
  // B) Restringido => Bloquear rutas manuales salvo "su" home
  // ─────────────────────────────────────────────────────────────────
  if (isRestricted) {
    // Permitir recargar "home"
    if (path === userHome) {
      return NextResponse.next();
    }
    if (!referer.includes(origin)) {
      // typed manual => redirigir a home
      return NextResponse.redirect(new URL(userHome, request.url));
    }
  }

  // 7) Resto => next
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Aplica a todas las rutas, excepto /_next etc.
    '/((?!api|_next/static|_next/image|img/logos|favicon.ico|\\.png|\\.jpg|\\.jpeg|\\.svg|\\.webp).*)',
  ],
};
