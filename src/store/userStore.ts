import { authApi } from '@/lib/api';
import { UserStoreType } from '@/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
// import { io } from 'socket.io-client';
import { getSocket } from '@/lib/socket';
import { errorMessage } from '@/lib/utils';
import toast from 'react-hot-toast';

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

            // updating profile
            updatingProfile: false,
            updateProfile: async (formData) => {
                set({ updatingProfile: true });
                try {
                    const response = await authApi.post(
                        '/update-profile',
                        formData
                    );
                    const { message } = response.data;
                    toast.success(message);
                } catch (error: unknown) {
                    const message = errorMessage(error);
                    toast.error(message);
                } finally {
                    set({ updatingProfile: false });
                }
            },

            // update profile picture
            uploadingProfilePicture: false,
            uploadProfilePicture: async (profilePicture) => {
                set({ uploadingProfilePicture: true });
                try {
                    const response = authApi.post('/upload-profile-picture', {
                        profilePicture, // base64 string
                    });
                    const { data } = await response;
                    const { message } = data;
                    toast.success(message);
                    // console.log({ data });
                    // todo:get message and toast it
                    const { user } = data;
                    set({ authUser: user });
                } catch (error: unknown) {
                    const message = errorMessage(error);
                    toast.error(message);
                    // console.log({ error });
                } finally {
                    set({ uploadingProfilePicture: false });
                }
            },

            // request-verification-email
            requestingVerificationEmail: false,
            requestVerificationEmail: async () => {
                set({ requestingVerificationEmail: true });
                try {
                    const response = await authApi.post(
                        '/request-verification-email'
                    );
                    const { message } = response.data;
                    toast.success(message);
                } catch (error: unknown) {
                    // console.log({ error });
                    const message = errorMessage(error);
                    toast.error(message);
                } finally {
                    set({ requestingVerificationEmail: false });
                }
            },

            // online users
            onlineUsers: [],
            getOnlineUsers: (onlineUsers) => {
                set({ onlineUsers });
                // console.log({ onlineUsers });
            },

            // logout
            loggingOut: false,
            logout: async () => {
                const { disconnectSocket } = get();
                set({ loggingOut: true });
                try {
                    // remove _id from local storage
                    if (localStorage.getItem('_id'))
                        localStorage.removeItem('_id');
                    const response = await authApi.post('/logout');
                    const { message } = response.data;

                    // disconnect socket
                    disconnectSocket();

                    toast.success(message);
                    return true;
                } catch (error: unknown) {
                    const message = errorMessage(error);
                    toast.error(message);
                    return false;
                } finally {
                    set({ loggingOut: false });
                }
            },
        }),
        { name: 'userStore' }
    )
);
