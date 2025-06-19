// socket.ts
import { io, Socket } from 'socket.io-client';

let socket: Socket;

export const getSocket = () => {
    if (!socket) {
        socket = io(process.env.NEXT_PUBLIC_BACKEND_API_URL, {
            autoConnect: false, // optional: you can manually connect
            transports: ['websocket'], // optional: optimize transport
        });
    }
    return socket;
};
