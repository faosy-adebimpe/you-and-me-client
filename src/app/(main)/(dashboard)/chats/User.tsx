'use client';

import { filterMessages } from '@/lib/utils';
import { useMessageStore } from '@/store/messageStore';
import { UserType } from '@/types';
// import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const User = ({ user }: { user: UserType }) => {
    const { unreadMessages } = useMessageStore();
    const messages = filterMessages(unreadMessages, user._id);
    // const messages = unreadMessages.filter(message => message.senderId === user._id);
    const messageCount = messages.length;

    // check if it will not modiry the original message;
    const latestMessage = messages[messageCount - 1];
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
                {/* <div className='size-[14px] rounded-full border-2 border-[#1C1B1B] bg-[#0FDB66] absolute right-0 bottom-0'></div> */}
            </div>
            {/* <div className='flex-1/2 bg-red-200'> */}
            <div className='flex-1/2 w-1/2'>
                <p className='text-[#FFFFFF]'>{user.username}</p>
                <p className='text-[#CCCCCC]/50 text-sm truncate w-2/3'>
                    {latestMessage?.text}
                </p>
            </div>
            {messageCount >= 1 && (
                <div className='size-6 bg-red-500 rounded-full flex justify-center items-center'>
                    {/* <p className='text-[#CCCCCC] text-sm'> */}
                    <p
                        // className={classNames('text-white', {
                        //     'text-xs': messageCount >= 100,
                        //     'text-[10px]': messageCount <= 0,
                        // })}
                        className='text-white text-[11px]'
                    >
                        {messageCount >= 100 ? '99+' : messageCount}
                    </p>
                </div>
            )}
            {/* <div className=''>
                                        <p className='text-[#CCCCCC] text-sm'>
                                            12:00
                                        </p>
                                    </div> */}
        </Link>
    );
};

export default User;
