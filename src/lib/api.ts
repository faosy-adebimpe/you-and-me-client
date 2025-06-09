import axios from 'axios';

export const authApi = axios.create({
    baseURL: '/api/v1/auth',
    withCredentials: true,
});
export const messageApi = axios.create({
    baseURL: '/api/v1/message',
    withCredentials: true,
});
