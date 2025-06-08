import { authApi } from '@/lib/api';
import { UserStoreType } from '@/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
// import { io } from 'socket.io-client';
import { getSocket } from '@/lib/socket';

export const useUserStore = create<UserStoreType>()(
    devtools(
        (set, get) => ({
            authUser: null,
            checkAuth: async () => {
                try {
                    const { connectSocket } = get();
                    const response = await authApi.get('/check-auth');
                    const { data } = response;
                    set({ authUser: data });
                    connectSocket();
                } catch (error) {
                    console.log({ error });
                }
            },
            setAuthUser: (data) => {
                set({ authUser: data });
            },

            // socket io
            socket: getSocket(),
            connectSocket: () => {
                const { authUser, socket } = get();
                if (!authUser || socket?.connected) {
                    return;
                }
                socket.auth = { id: authUser._id };
                socket.connect();
            },
            disconnectSocket: () => {
                const { socket } = get();
                if (socket?.disconnected) {
                    return;
                }
                socket.disconnect();
            },
        }),
        { name: 'userStore' }
    )
);
