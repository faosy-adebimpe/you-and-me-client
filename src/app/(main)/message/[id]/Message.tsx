'use client';
import ChatLoader from '@/components/loaders/ChatLoader';
import { messageApi } from '@/lib/api';
import { useMessageStore } from '@/store/messageStore';
import { useUserStore } from '@/store/userStore';
import { MessageType, UserType } from '@/types';
import classNames from 'classnames';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { format } from 'timeago.js';

const Message = ({ user }: { user: UserType }) => {
    const messageContainerRef = useRef<HTMLDivElement | null>(null);

    // store
    const { authUser, socket } = useUserStore();
    const { messages, setMessages, addNewMessage } = useMessageStore();

    const [loading, setLoading] = useState(false);
    const [initialScroll, setInitialScroll] = useState(1);

    const getMessagesFunction = async () => {
        setLoading(true);
        try {
            const response = await messageApi.get(`/${user._id}`);
            const { data } = response;
            setMessages(data);
            setInitialScroll(3);
        } catch (error) {
            console.log({ error });
        } finally {
            setLoading(false);
        }
    };

    const getMessages = useCallback(getMessagesFunction, []);

    useEffect(() => {
        // auto scroll
        const messageContainer = messageContainerRef.current;
        messageContainer?.scrollTo({
            top: messageContainer.scrollHeight,
            behavior: initialScroll === 3 ? 'smooth' : 'instant',
        });
    }, [messages, initialScroll]);

    useEffect(() => {
        // handlers
        const handleNewMessage = (newMessage: MessageType) => {
            // setMessages((prev) => [...prev, newMessage]);
            addNewMessage(newMessage);
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
    }, [addNewMessage, getMessages, socket]);

    if (loading) {
        return (
            // <div className='w-full h-full flex justify-center items-center'>
            //     <p className='text-sm'>Loading messages...</p>
            // </div>
            <ChatLoader />
        );
    }
    if (messages.length === 0) {
        return (
            <div className='w-full h-full flex justify-center items-center'>
                <p className='text-sm opacity-30'>
                    Start chat with {user.username}
                </p>
            </div>
        );
    }
    return (
        <div className='container h-full'>
            <div
                className='flex gap-[31px] flex-col h-full overflow-y-scroll pr-3'
                ref={messageContainerRef}
            >
                {messages.map((message) => (
                    <div
                        className={classNames(
                            'message max-w-[90%] md:max-w-[70%] flex gap-[18px] items-end',
                            { 'ml-auto': message.senderId === authUser?._id }
                        )}
                        key={message._id}
                    >
                        {message.senderId !== authUser?._id && (
                            <Image
                                src={'/images/avatars/user.png'}
                                alt={user?.username || ''}
                                title={user?.username}
                                width={28}
                                height={28}
                            />
                        )}
                        <div
                            className={classNames(
                                'bg-gradient-to-tl from-[#2B2B2B] to-[#454545] p-3',
                                {
                                    'rounded-[20px_20px_0px_20px]':
                                        message.senderId === authUser?._id,
                                    'rounded-[20px_20px_20px_0]':
                                        message.senderId !== authUser?._id,
                                }
                            )}
                        >
                            <p className='text text-[15px]'>{message.text}</p>
                            <p className='time text-[13px] mt-[8px] text-[#CCCCCC]'>
                                {message.createdAt && format(message.createdAt)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Message;
