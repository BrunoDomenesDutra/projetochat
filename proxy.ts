import { NextRequest, NextResponse } from 'next/server'
import { getSessionCookie } from 'better-auth/cookies'

export async function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request)

  // Rotas públicas: não exigem autenticação
  const publicRoutes = ['/login', '/obs']

  const path = request.nextUrl.pathname

  // Se for rota pública → permite
  if (publicRoutes.some((route) => path === route || path.startsWith(route + '/'))) {
    return NextResponse.next()
  }

  // Se for rota privada e sem sessão → redireciona
  if (!sessionCookie) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Caso contrário → permite
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next|favicon.ico).*)'], // aplica a todas as rotas não-API
}
