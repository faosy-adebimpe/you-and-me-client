'use client';
import ChatLoader from '@/components/loaders/ChatLoader';
import { messageApi } from '@/lib/api';
import { useMessageStore } from '@/store/messageStore';
import { useUserStore } from '@/store/userStore';
import { MessageType, UserType } from '@/types';
import classNames from 'classnames';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { format } from 'timeago.js';

const Message = ({ user }: { user: UserType }) => {
    // store
    const { authUser, socket } = useUserStore();
    const { messages, setMessages, addNewMessage } = useMessageStore();

    const [loading, setLoading] = useState(false);

    const getMessagesFunction = async () => {
        setLoading(true);
        try {
            const response = await messageApi.get(`/${user._id}`);
            const { data } = response;
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
        <div className='h-full w-full'>
            <div className='flex gap-[31px] flex-col h-full w-full'>
                {messages.map((message) => (
                    <div
                        className={classNames(
                            // 'message max-w-[80%] md:max-w-[70%] flex gap-[18px] items-end',
                            'message max-w-[80%] md:max-w-[70%] flex gap-[8px] items-end',
                            { 'ml-auto': message.senderId === authUser?._id }
                        )}
                        key={message._id}
                    >
                        {message.senderId !== authUser?._id && (
                            <div className='w-[28px] h-[28px] rounded-full overflow-hidden'>
                                <Image
                                    src={
                                        user.image || '/images/avatars/user.png'
                                    }
                                    alt={user?.username || ''}
                                    title={user?.username}
                                    className='opacity-50 object-cover'
                                    width={28}
                                    height={28}
                                />
                            </div>
                        )}
                        <div
                            // bg-gradient-to-tl from-[#2B2B2B] to-[#454545]
                            className={classNames(
                                'bg-gradient-to-tl from-[#2B2B2B] p-3',
                                {
                                    'to-(--theme-color) rounded-[20px_20px_0px_20px]':
                                        message.senderId === authUser?._id,
                                    'to-[#454545] rounded-[20px_20px_20px_0]':
                                        message.senderId !== authUser?._id,
                                }
                            )}
                        >
                            <p className='text-[15px] break-all'>
                                {message.text}
                            </p>
                            <p className='time text-[12px] mt-[8px] text-[#CCCCCC]'>
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
