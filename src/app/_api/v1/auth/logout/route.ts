// import { authApi } from '@/lib/api';
import { NextResponse } from 'next/server';

export const POST = async () => {
    try {
        // const axiosResponse = await authApi.post('/logout');
        // console.log({ axiosResponse });

        // create response
        const response = NextResponse.json(
            { message: 'Logged out successfully' },
            { status: 200 }
        );

        // expire cookie
        response.cookies.set('auth-token', '', {
            httpOnly: true,
            path: '/',
            maxAge: 0,
        });

        return response;
    } catch (error) {
        const message = error instanceof Error ? error.message : error;
        return NextResponse.json({ message }, { status: 500 });
    }
};
