import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

const publicRoutes = [
	//  {path: '/', whenAuthenticated: 'next'},
	{ path: '/', whenAuthenticated: 'redirect' },
	{ path: '/login', whenAuthenticated: 'redirect' },
] as const

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = '/'
export const TOKEN_KEY = 'token_sm'

export async function middleware(request: NextRequest) {
	const path = request.nextUrl.pathname

	const publicRoute = publicRoutes.find((route) => route.path === path)
	const cookie = await cookies()

	const token = cookie.get(TOKEN_KEY)

	if (!token && publicRoute) {
		return NextResponse.next()
	}

	if (!token && !publicRoute) {
		const redirectUrl = request.nextUrl.clone()
		redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE

		return NextResponse.redirect(redirectUrl)
	}

	if (token && publicRoute && publicRoute.whenAuthenticated === 'redirect') {
		const redirectUrl = request.nextUrl.clone()
		redirectUrl.pathname = '/dashboard'

		return NextResponse.redirect(redirectUrl)
	}

	if (token && !publicRoute) {
		//poderia checar validade do token jwtDecode
		return NextResponse.next()
	}

	return NextResponse.next()
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico, sitemap.xml, robots.txt (metadata files)
		 */
		'/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
	],
}
