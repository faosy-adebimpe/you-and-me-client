'use client';
import ChatLoader from '@/components/loaders/ChatLoader';
import { messageApi } from '@/lib/api';
import { useMessageStore } from '@/store/messageStore';
import { useUserStore } from '@/store/userStore';
import { MessageType, UserType } from '@/types';
import { useCallback, useEffect, useRef, useState } from 'react';
import Message from './Message';
import AwaitingMessage from './AwaitingMessage';

const Messages = ({ user }: { user: UserType }) => {
    // store
    const { socket } = useUserStore();
    const { messages, awaitingMessages } = useMessageStore();
    const setMessages = useMessageStore((state) => state.setMessages);
    const addNewMessage = useMessageStore((state) => state.addNewMessage);
    const readMessages = useMessageStore((state) => state.readMessages);

    const messageContainer = useRef<HTMLDivElement>(null);
    const initialScroll = useRef(true);

    const [loading, setLoading] = useState(false);

    const getMessagesFunction = async () => {
        setLoading(true);
        try {
            const response = await messageApi.get(`/${user._id}`);
            const { data } = response;
            initialScroll.current = true; // <--- Ensure instant scroll on first load
            setMessages(data);
        } catch (error) {
            console.log({ error });
        } finally {
            setLoading(false);
        }
    };

    const getMessages = useCallback(getMessagesFunction, [
        setMessages,
        user._id,
    ]);

    useEffect(() => {
        // handlers
        const handleNewMessage = (newMessage: MessageType) => {
            // setMessages((prev) => [...prev, newMessage]);
            addNewMessage(newMessage);

            // read messages
            readMessages(user._id);
        };

        // events
        socket.on('new-message', handleNewMessage);

        // get initials messages
        // get messages
        getMessages();

        // clean up the useEffect
        return () => {
            socket.off('new-message', handleNewMessage);
        };
    }, [addNewMessage, getMessages, socket, readMessages, user._id]);

    useEffect(() => {
        const container = messageContainer.current;
        if (!container) return;
        container.scrollTo({
            top: container.scrollHeight,
            behavior: initialScroll.current ? 'auto' : 'smooth', // 'auto' for instant, 'smooth' for animation
        });
        if (initialScroll.current) {
            initialScroll.current = false;
        }
    }, [messages, awaitingMessages]);

    // read messages
    useEffect(() => {
        readMessages(user._id);
    }, [readMessages, user._id]);

    if (loading) {
        return (
            <div className='w-full h-[100vh] flex justify-center items-center'>
                <ChatLoader />
            </div>
        );
    }
    if (messages.length === 0) {
        return (
            <div className='w-full h-[100vh] flex justify-center items-center'>
                <p className='text-sm opacity-30'>
                    Start chat with {user.username}
                </p>
            </div>
        );
    }
    return (
        // <main className='h-full w-full'>
        <main className='p-3 overflow-auto flex-1' ref={messageContainer}>
            <div
                // className='flex gap-[31px] flex-col h-full w-full overflow-auto'
                className='flex gap-[20px] flex-col h-full w-full overflow-auto'
                // ref={messageContainer}
            >
                {messages.map((message, index) => (
                    <Message key={index} user={user} message={message} />
                ))}
                {awaitingMessages.map((message, index) => (
                    <AwaitingMessage key={index} message={message} />
                ))}
            </div>
        </main>
    );
};

export default Messages;
