'use client';

import { useMessageStore } from '@/store/messageStore';
import { useUserStore } from '@/store/userStore';
import { useEffect } from 'react';

const ConnectSocket = () => {
    const { checkAuth, connectSocket } = useUserStore();
    const { getUsers } = useMessageStore();

    useEffect(() => {
        // check user authentication
        checkAuth();

        // get users
        getUsers();

        // connect socket
        connectSocket();
    }, [checkAuth, getUsers, connectSocket]);
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
