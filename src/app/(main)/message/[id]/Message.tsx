import { useUserStore } from '@/store/userStore';
import { MessageType, UserType } from '@/types';
import classNames from 'classnames';
import Image from 'next/image';
import React from 'react';
import { format } from 'timeago.js';

const Message = ({
    user,
    message,
}: {
    user: UserType;
    message: MessageType;
}) => {
    const { authUser } = useUserStore();
    return (
        <div
            className={classNames(
                // 'message max-w-[80%] md:max-w-[70%] flex gap-[18px] items-end',
                'message max-w-[80%] md:max-w-[70%] flex gap-[8px] items-end',
                { 'ml-auto': message.senderId === authUser?._id }
            )}
            key={message._id}
        >
            {message.senderId !== authUser?._id && (
                <div className='w-[28px] h-[28px] rounded-full overflow-hidden border border-(--theme-color)/20'>
                    <Image
                        src={user.image || '/images/avatars/user.png'}
                        alt={user?.username || ''}
                        title={user?.username}
                        className='opacity-70 object-cover'
                        width={28}
                        height={28}
                    />
                </div>
            )}
            <div
                // bg-gradient-to-tl from-[#2B2B2B] to-[#454545]
                className={classNames('bg-gradient-to-tl from-[#2B2B2B] p-3', {
                    // 'to-(--theme-color) rounded-[20px_20px_0px_20px] mr-2':
                    //     message.senderId === authUser?._id,
                    'to-(--theme-color) rounded-[20px_20px_0px_20px] mr-0':
                        message.senderId === authUser?._id,
                    'to-[#454545] rounded-[20px_20px_20px_0]':
                        message.senderId !== authUser?._id,
                })}
            >
                {/* <p className='text-[15px] break-all'> */}
                {message.text && (
                    <p
                        className='text-[15px]'
                        dangerouslySetInnerHTML={{
                            __html: message.text.replace(/\n/g, '<br />'),
                        }}
                    />
                )}
                <div className='flex gap-5 justify-between items-end mt-[8px]'>
                    <p className='time text-[12px] text-[#CCCCCC]'>
                        {message.createdAt && format(message.createdAt)}
                    </p>
                    {message.senderId === authUser?._id && (
                        <div className='flex gap-1 items-center'>
                            {/* Sent: single gray check */}
                            {message.sent && !message.received && (
                                <svg
                                    width='18'
                                    height='18'
                                    viewBox='0 0 18 18'
                                    className='text-gray-400'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path
                                        d='M5 9.5L8 12.5L13 7.5'
                                        stroke='currentColor'
                                        strokeWidth='2'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                </svg>
                            )}
                            {/* Delivered: double gray checks */}
                            {message.sent &&
                                message.received &&
                                !message.read && (
                                    <span className='flex'>
                                        <svg
                                            width='18'
                                            height='18'
                                            viewBox='0 0 18 18'
                                            className='text-gray-400 -mr-2'
                                            fill='none'
                                            xmlns='http://www.w3.org/2000/svg'
                                        >
                                            <path
                                                d='M5 9.5L8 12.5L13 7.5'
                                                stroke='currentColor'
                                                strokeWidth='2'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                            />
                                        </svg>
                                        <svg
                                            width='18'
                                            height='18'
                                            viewBox='0 0 18 18'
                                            className='text-gray-400'
                                            fill='none'
                                            xmlns='http://www.w3.org/2000/svg'
                                        >
                                            <path
                                                d='M5 9.5L8 12.5L13 7.5'
                                                stroke='currentColor'
                                                strokeWidth='2'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                            />
                                        </svg>
                                    </span>
                                )}
                            {/* Read: double blue checks */}
                            {message.sent &&
                                message.received &&
                                message.read && (
                                    <span className='flex'>
                                        <svg
                                            width='18'
                                            height='18'
                                            viewBox='0 0 18 18'
                                            className='text-blue-500 -mr-2'
                                            fill='none'
                                            xmlns='http://www.w3.org/2000/svg'
                                        >
                                            <path
                                                d='M5 9.5L8 12.5L13 7.5'
                                                stroke='currentColor'
                                                strokeWidth='2'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                            />
                                        </svg>
                                        <svg
                                            width='18'
                                            height='18'
                                            viewBox='0 0 18 18'
                                            className='text-blue-500'
                                            fill='none'
                                            xmlns='http://www.w3.org/2000/svg'
                                        >
                                            <path
                                                d='M5 9.5L8 12.5L13 7.5'
                                                stroke='currentColor'
                                                strokeWidth='2'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                            />
                                        </svg>
                                    </span>
                                )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Message;
