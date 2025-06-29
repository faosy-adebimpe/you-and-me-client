'use client';

import Message from './Message';
import MessageNavbar from '@/components/navs/MessageNavbar';
import MessageFooter from '@/components/footers/MessageFooter';
import { useMessageStore } from '@/store/messageStore';
import { useEffect, useRef } from 'react';

const MessagePageWrapper = ({ id }: { id: string }) => {
    const { getSelectedUser, messages } = useMessageStore();
    const containerRef = useRef<HTMLDivElement | null>(null);
    const isFirstLoad = useRef(true); // Track if it's the first load

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        container.scrollTo({
            top: container.scrollHeight,
            behavior: isFirstLoad.current ? 'auto' : 'smooth', // 'auto' is instant
        });

        isFirstLoad.current = false; // After first render, set to false
    }, [messages]);

    //
    const user = getSelectedUser(id);
    if (!user) {
        return;
    }
    return (
        <div className='grid grid-rows-[1fr_8fr_1fr] min-h-[100dvh] max-h-[100dvh] w-screen bg-[#1C1B1B] text-white'>
            <MessageNavbar user={user} />
            <main className='p-3 overflow-hidden'>
                <Message user={user} />
            </main>
            <MessageFooter user={user} />
        </div>
    );
};

export default MessagePageWrapper;

// // return (
//         // <div className='w-screen h-screen bg-[#1C1B1B] text-[#FFFFFF] grid grid-rows-[1fr_8fr_1fr] overflow-hidden'>
//         <div className='flex flex-col min-h-[100dvh] w-screen bg-[#1C1B1B] text-white'>
//             <div className='fixed top-0 left-0 right-0 h-[72px] bg-[#1C1B1B] border-b border-gray-700 flex items-center z-10'>
//                 <MessageNavbar user={user} />
//             </div>
//             <div
//                 className='absolute top-[72px] bottom-[72px] left-0 right-0 overflow-y-auto space-y-2'
//                 ref={containerRef}
//             >
//                 <main className='p-3 overflow-hidden'>
//                     <Message user={user} />
//                 </main>
//             </div>
//             <div className='fixed bottom-0 left-0 right-0 h-[72px] bg-[#1C1B1B] flex items-center px-4 z-10'>
//                 <MessageFooter user={user} />
//             </div>
//         </div>
//     );
