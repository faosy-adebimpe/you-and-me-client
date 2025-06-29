'use client';

import GradientCover from '@/components/covers/GradientCover';
import ChatLoader from '@/components/loaders/ChatLoader';
import SearchingLoader from '@/components/loaders/SearchingLoader';
import { useMessageStore } from '@/store/messageStore';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';

const Chats = () => {
    const {
        users,
        gettingUsers,
        username,
        setUsername,
        searchingUser,
        clearSearch,
        onlineUsers,
        toggleOnlineUsers,
    } = useMessageStore();

    return (
        <div className='h-full relative'>
            <GradientCover />
            {gettingUsers ? (
                <ChatLoader />
            ) : (
                <div className='h-full flex flex-col gap-5'>
                    <div className=' px-3 py-1 h-12'>
                        <div className='h-12 flex gap-3 not-checked:items-center'>
                            <div className='flex items-center relative w-full h-full'>
                                <input
                                    type='text'
                                    value={username}
                                    onChange={(event) =>
                                        setUsername(event.target.value)
                                    }
                                    className='bg-black/20 outline-none text-white p-2 rounded-md w-full h-full text-sm pr-11'
                                />
                                <div className='absolute right-3'>
                                    {searchingUser ? (
                                        <div className='text-sm'>
                                            <SearchingLoader />
                                        </div>
                                    ) : (
                                        <div className=''>
                                            {username ? (
                                                <button
                                                    className='flex justify-center items-center cursor-pointer'
                                                    onClick={clearSearch}
                                                >
                                                    <XMarkIcon className='size-5' />
                                                </button>
                                            ) : (
                                                <MagnifyingGlassIcon className='size-5' />
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className='flex-1 flex items-center text-sm w-full h-full'>
                                <button
                                    className={classNames(
                                        'p-2 rounded-md w-full h-full text-sm transition-all',
                                        {
                                            'bg-black/20 text-white/50 ':
                                                !onlineUsers,
                                            'bg-(--theme-color) text-white':
                                                onlineUsers,
                                        }
                                    )}
                                    onClick={toggleOnlineUsers}
                                >
                                    <span className={classNames('')}>
                                        Online
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='users h-full flex gap-5 flex-col overflow-y-scroll pr-3'>
                        {users.map((user) => (
                            <Link
                                href={`/message/${user._id}`}
                                key={user.username}
                                className='flex items-center gap-5 transition-all hover:bg-[#1F1F1F] p-3 rounded-md'
                            >
                                <div className='relative'>
                                    <div className='w-[40px] h-[40px] rounded-full border border-(--theme-color)/20 overflow-hidden'>
                                        <Image
                                            src={
                                                user.image ||
                                                '/images/avatars/user.png'
                                            }
                                            className='opacity-70 object-cover'
                                            title={user.username}
                                            alt={user.username}
                                            width={40}
                                            height={40}
                                        />
                                    </div>
                                    {/* <div className='size-[14px] rounded-full border-2 border-[#1C1B1B] bg-[#0FDB66] absolute right-0 bottom-0'></div> */}
                                </div>
                                <div className='flex-1/2'>
                                    <p className='text-[#FFFFFF]'>
                                        {user.username}
                                    </p>
                                    {/* <p className='text-[#CCCCCC] text-sm'>
                                    None yet...
                                </p> */}
                                </div>
                                <div className=''>
                                    {/* <p className='text-[#CCCCCC] text-sm'>
                                    12:00
                                </p> */}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chats;
