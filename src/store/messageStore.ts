import { messageApi } from '@/lib/api';
import { MessageStoreType } from '@/types';
import { create } from 'zustand';

export const useMessageStore = create<MessageStoreType>((set, get) => ({
    messages: [],
    setMessages: (newMessages) => {
        set({ messages: newMessages });
    },
    addNewMessage: (newMessage) => {
        const { messages } = get();
        set({ messages: [...messages, newMessage] });
    },
    // users
    gettingUsers: false,
    users: [],
    getUsers: async () => {
        set({ gettingUsers: true });
        try {
            const response = await messageApi.get('/users');
            const { data } = response;
            set({ users: data });
        } catch (error) {
            console.log({ error });
        } finally {
            set({ gettingUsers: false });
        }
    },

    getUser: (username) => {
        const { users } = get();
        const user = users.find((user) => user.username === username);
        return user;
    },
    getSelectedUser: (id) => {
        const { users } = get();
        return users.find((user) => user._id === id);
    },

    // getSelectedUser: async (id) => {
    //     try {
    //         const response = await messageApi.get(`/users/${id}`);
    //         const selectedUser = response.data;
    //         return selectedUser;
    //     } catch (error) {
    //         console.log({ error });
    //     }
    // },
}));
