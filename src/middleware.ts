import { NextRequest, NextResponse } from 'next/server';

const publicRoutes = ['/auth/register', '/auth/login'];
// const privateRoutes = [];
// const hybridRoutes = [];

export const middleware = (request: NextRequest) => {
    const pathname = request.nextUrl.pathname;
    const authToken = request.cookies.get('auth-token')?.value;

    if (!authToken && !publicRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    if (authToken && publicRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
};

export const config = {
    matcher: ['/((?!api|_next|static|favicon.ico).*)'],
};
