'use client';

import GradientCover from '@/components/covers/GradientCover';
import ChatLoader from '@/components/loaders/ChatLoader';
import { useMessageStore } from '@/store/messageStore';
import Image from 'next/image';
import Link from 'next/link';

const Chats = () => {
    const { users, gettingUsers } = useMessageStore();

    return (
        <div className='container h-full relative'>
            {/* <div className='cover w-full h-full absolute bg-gradient-to-b from-black/0 to-black/50 pointer-events-none'></div> */}
            <GradientCover />
            {gettingUsers ? (
                // <div className='w-full h-full flex justify-center items-center'>
                //     <p className='text-sm'>Loading...</p>
                // </div>
                <ChatLoader />
            ) : (
                <div className='users h-full flex gap-5 flex-col overflow-y-scroll pr-3'>
                    {users.map((user) => (
                        <Link
                            href={`/message/${user._id}`}
                            key={user.username}
                            className='flex items-center gap-5 transition-all hover:bg-[#1F1F1F] p-3 rounded-md'
                        >
                            <div className='relative'>
                                <Image
                                    src={
                                        user.image || '/images/avatars/user.png'
                                    }
                                    className='opacity-50'
                                    title={user.username}
                                    alt={user.username}
                                    width={40}
                                    height={40}
                                />
                                <div className='size-[14px] rounded-full border-2 border-[#1C1B1B] bg-[#0FDB66] absolute right-0 bottom-0'></div>
                            </div>
                            <div className='flex-1/2'>
                                <p className='text-[#FFFFFF]'>
                                    {user.username}
                                </p>
                                <p className='text-[#CCCCCC] text-sm'>
                                    {/* {user.latestMessage} */}
                                    None yet...
                                </p>
                            </div>
                            <div className=''>
                                <p className='text-[#CCCCCC] text-sm'>
                                    {/* {user.time} */}
                                    12:00
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Chats;
