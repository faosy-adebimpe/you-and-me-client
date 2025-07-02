'use client';

import { useMessageStore } from '@/store/messageStore';
import { useUserStore } from '@/store/userStore';
import { useEffect } from 'react';

const ConnectSocket = () => {
    const { checkAuth, connectSocket, socket, getOnlineUsers } = useUserStore();
    const { getUsers, getUnreadMessages, getAllMessages } = useMessageStore();

    useEffect(() => {
        // check user authentication
        checkAuth();

        // connect socket
        connectSocket();

        // get users
        getUsers();

        // get unread messages
        getUnreadMessages();

        // get all messages
        getAllMessages();
    }, [checkAuth, connectSocket, getUsers, getUnreadMessages, getAllMessages]);

    useEffect(() => {
        if (!socket || !getOnlineUsers) return;

        socket.on('get-online-users', getOnlineUsers);

        return () => {
            socket.off('get-online-users', getOnlineUsers);
        };
    }, [socket, getOnlineUsers]);

    // const { socket } = useUserStore();

    // useEffect(() => {
    //     if (!socket.connected) {
    //         socket.connect();
    //     }
    // }, []);
    // return <div>ConnectSocket</div>;
    return null;
};

export default ConnectSocket;
