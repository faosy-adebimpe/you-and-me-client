'use client';
import { UserType } from '@/types';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const MessageNavbar = ({ user }: Readonly<{ user: UserType }>) => {
    const router = useRouter();

    return (
        <div className='p-3 h-[10dvh] flex justify-between items-center border-b border-(--theme-color)/10'>
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
                <div className='w-[32px] h-[32px] rounded-full overflow-hidden border border-(--theme-color)/20'>
                    <Image
                        src={user.image || '/images/avatars/user.png'}
                        title={user?.username}
                        alt={user?.username || "user's name"}
                        width={32}
                        height={32}
                        className='opacity-70 object-cover'
                    />
                </div>
            </button>
        </div>
    );
};

export default MessageNavbar;
