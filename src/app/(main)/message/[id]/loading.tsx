'use client';

import ChatLoader from '@/components/loaders/ChatLoader';

const loading = () => {
    return (
        <div className='bg-[#1F1F1F] text-[#FFFFFF] w-screen h-screen flex justify-center items-center'>
            {/* <div className='scale-75'></div> */}
            <ChatLoader />
        </div>
    );
};

export default loading;

// 1C1B1B
