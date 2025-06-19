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

            uploadingProfilePicture: false,

            uploadProfilePicture: async (profilePicture) => {
                set({ uploadingProfilePicture: true });
                try {
                    const response = authApi.post('/upload-profile-picture', {
                        profilePicture, // base64 string
                    });
                    const { data } = await response;
                    console.log({ data });
                    // todo:get message and toast it
                    const { user } = data;
                    set({ authUser: user });
                } catch (error) {
                    console.log({ error });
                } finally {
                    set({ uploadingProfilePicture: false });
                }
            },
        }),
        { name: 'userStore' }
    )
);
