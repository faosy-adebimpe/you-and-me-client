import { messageApi } from '@/lib/api';
import { MessageStoreType } from '@/types';
import { nanoid } from 'nanoid';
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

    // search user
    username: '',
    setUsername: (value) => {
        const { searchUser } = get();
        set({ username: value });
        searchUser();
    },
    searchingUser: false,
    searchUser: async () => {
        const { username } = get();
        // if (!username) return;
        set({ searchingUser: true });
        try {
            const response = await messageApi.get(
                `/users?username=${username}`
            );
            const { data } = response;
            set({ users: data });
        } catch (error: unknown) {
            console.log({ error });
        } finally {
            set({ searchingUser: false });
        }
    },
    clearSearch: () => {
        const { setUsername } = get();
        setUsername('');
        // ----------- or -------------
        // const { searchUser } = get();
        // set({ username: '' });
        // searchUser();
    },

    // online users
    onlineUsers: false,
    setOnlineUsers: (event) => {
        const checked = event.target.checked;
        set({ onlineUsers: checked });
    },
    toggleOnlineUsers: () => {
        const { onlineUsers } = get();
        set({ onlineUsers: !onlineUsers });
    },

    allMessages: [],
    gettingAllMessages: false,
    getAllMessages: async () => {
        set({ gettingAllMessages: true });
        try {
            const response = await messageApi.get('/get-all/messages');
            const { data } = response;
            set({ allMessages: data });
        } catch (error: unknown) {
            console.log({ error });
        } finally {
            set({ gettingAllMessages: false });
        }
    },

    unreadMessages: [],
    gettingUnreadMessages: false,
    getUnreadMessages: async () => {
        set({ gettingUnreadMessages: true });
        try {
            const response = await messageApi.get('/unread/messages');
            const { data } = response;
            set({ unreadMessages: data });
        } catch (error: unknown) {
            console.log({ error });
        } finally {
            set({ gettingUnreadMessages: false });
        }
    },

    readMessagesData: [],
    readingMessages: false,
    readMessages: async (senderId) => {
        set({ readingMessages: true });
        try {
            const response = await messageApi.patch(`/read/${senderId}`);
            const { data } = response;
            set({ readMessagesData: data });

            // remove read messages or fetch new
            const { unreadMessages } = get();
            const newUnreadMessages = unreadMessages.filter(
                (message) => message.senderId !== senderId
            );
            set({ unreadMessages: newUnreadMessages });
        } catch (error: unknown) {
            console.log({ error });
        } finally {
            set({ readingMessages: false });
        }
    },

    awaitingMessages: [],
    setAwaitingMessages: (message) => {
        const { awaitingMessages } = get();
        const newAwaitingMessages = [...awaitingMessages, message];

        set({ awaitingMessages: newAwaitingMessages });
    },

    removeAwaitingMessage: (id) => {
        const { awaitingMessages } = get();
        const newAwaitingMessages = awaitingMessages.filter(
            (message) => message.id !== id
        );
        set({ awaitingMessages: newAwaitingMessages });
    },
    clearAwaitingMessages: () => {
        set({ awaitingMessages: [] });
    },
    awaitingMessage: null,

    //
    sendingMessage: false,
    sendMessage: async (user, message) => {
        const {
            addNewMessage,
            setAwaitingMessages,
            removeAwaitingMessage,
            getAllMessages,
        } = get();
        if (!message) {
            return;
        }
        set({ sendingMessage: true });
        try {
            const newMessage = {
                id: nanoid(),
                text: message,
            };
            setAwaitingMessages(newMessage);
            const response = await messageApi.post(
                `/send/${user._id}`,
                newMessage
            );
            const { data } = response;

            // add message
            addNewMessage(data);
            getAllMessages();

            // remove placeholder
            removeAwaitingMessage(newMessage.id);
        } catch (error: unknown) {
            console.log({ error });
        } finally {
            set({ sendingMessage: false });
        }
    },
}));
