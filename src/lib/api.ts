import axios from 'axios';

export const authApi = axios.create({
    baseURL:
        process.env.NODE_ENV === 'production'
            ? `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/auth`
            : '/api/v1/auth',
    withCredentials: true,
});

export const messageApi = axios.create({
    baseURL:
        process.env.NODE_ENV === 'production'
            ? `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/message`
            : '/api/v1/message',
    withCredentials: true,
});
