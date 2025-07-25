'use client';

import { filterMessages } from '@/lib/utils';
import { useMessageStore } from '@/store/messageStore';
import { useUserStore } from '@/store/userStore';
import { UserType } from '@/types';
import classNames from 'classnames';
// import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const User = ({ user }: { user: UserType }) => {
    const { unreadMessages, allMessages } = useMessageStore();
    const { onlineUsers } = useUserStore();

    // unread messages
    const messages = filterMessages(unreadMessages, user._id);
    const messageCount = messages.length;

    // all messages
    const allUsermessages = allMessages.filter(
        (message) =>
            message.senderId === user._id || message.receiverId === user._id
    );
    const allMessagesCount = allUsermessages.length;
    const latestMessage = allUsermessages[allMessagesCount - 1];

    // check if it will not modiry the original message;
    // const latestMessage = messages[messageCount - 1];
    const online = onlineUsers.includes(user._id);
    return (
        <Link
            href={`/message/${user._id}`}
            key={user.username}
            className='flex items-center gap-5 transition-all hover:bg-[#1F1F1F] p-3 rounded-md'
        >
            <div className='relative'>
                <div className='w-[40px] h-[40px] rounded-full border border-(--theme-color)/20 overflow-hidden'>
                    <Image
                        src={user.image || '/images/avatars/user.png'}
                        className='opacity-70 object-cover'
                        title={user.username}
                        alt={user.username}
                        width={40}
                        height={40}
                    />
                </div>
                <div
                    className={classNames(
                        'size-[14px] rounded-full border-2 border-[#1C1B1B] absolute right-0 bottom-0',
                        {
                            ' bg-(--theme-color)': online,
                            ' bg-[#636363]': !online,
                        }
                    )}
                ></div>
            </div>
            <div className='flex-1/2 w-1/2'>
                <p className='text-[#FFFFFF]'>{user.username}</p>
                <p className='text-[#CCCCCC]/50 text-sm truncate w-2/3'>
                    {latestMessage
                        ? latestMessage.text
                        : 'Send a message to start chatting'}
                </p>
            </div>
            {messageCount >= 1 && (
                <div className='size-6 bg-red-500 rounded-full flex justify-center items-center'>
                    <p className='text-white text-[11px]'>
                        {messageCount >= 100 ? '99+' : messageCount}
                    </p>
                </div>
            )}
        </Link>
    );
};

export default User;
