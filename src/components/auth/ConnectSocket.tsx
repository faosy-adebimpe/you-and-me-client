'use client';

import { useMessageStore } from '@/store/messageStore';
import { useUserStore } from '@/store/userStore';
import { useEffect } from 'react';

const ConnectSocket = () => {
    const { checkAuth, connectSocket } = useUserStore();
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
