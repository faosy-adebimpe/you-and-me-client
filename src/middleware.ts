import { NextRequest, NextResponse } from 'next/server';

const publicRoutes = [
    '/auth/register',
    '/auth/login',
    '/auth/forgot-password',
    '/auth/reset-password',
];

const hybridRoutes = [
    // Routes accessible to both authenticated and unauthenticated users
    '/auth/verify-email',
];

const isMatch = (routes: string[], pathname: string) =>
    routes.some((route) => pathname.startsWith(route));

export const middleware = (request: NextRequest) => {
    const pathname = request.nextUrl.pathname;
    const authToken = request.cookies.get('auth-token')?.value;

    if (
        !authToken &&
        !isMatch(publicRoutes, pathname) &&
        !isMatch(hybridRoutes, pathname)
    ) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    if (
        authToken &&
        isMatch(publicRoutes, pathname) &&
        !isMatch(hybridRoutes, pathname)
    ) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
};

export const config = {
    matcher: ['/((?!api|_next|static|favicon.ico).*)'],
};
