'use client';
import { UserType } from '@/types';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const MessageNavbar = ({ user }: Readonly<{ user: UserType }>) => {
    const router = useRouter();

    return (
        <div className='container flex justify-between items-center'>
            <button
                className='size-10 rounded-full flex justify-center items-center hover:bg-black/30'
                onClick={() => router.back()}
            >
                <ChevronLeftIcon className='size-6' />
            </button>
            <div className='flex flex-col text-center'>
                <p className='text-[#FFFFFF]'>{user?.username}</p>
                {/* <p className='text-xs text-[#CCCCCC]'>Available</p> */}
            </div>
            <button className='size-10 rounded-full flex justify-center items-center hover:bg-black/30'>
                {/* <UserCircleIcon className='size-7' /> */}
                <Image
                    src={user.image || '/images/avatars/user.png'}
                    title={user?.username}
                    alt={user?.username || "user's name"}
                    width={32}
                    height={32}
                />
            </button>
        </div>
    );
};

export default MessageNavbar;
