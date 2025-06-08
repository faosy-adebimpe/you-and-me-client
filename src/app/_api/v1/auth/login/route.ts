import { authApi } from '@/lib/api';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest) => {
    try {
        const body = await request.json();

        const axiosResponse = await authApi.post('/login', body);
        const { data } = axiosResponse;
        const { _id, authToken } = data;

        const response = NextResponse.json(
            { message: 'Logged in successfully', _id },
            { status: 200 }
        );

        response.cookies.set('auth-token', authToken, {
            httpOnly: true,
            path: '/',
            maxAge: 24 * 60 * 60 * 1000,
        });

        return response;
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : error;
        return NextResponse.json({ message }, { status: 500 });
    }
};
