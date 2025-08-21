'use client';

import MainNavbar from '@/components/navs/MainNavbar';
// import '../globals.css';
// import { Metadata } from 'next';
import MainFooter from '@/components/footers/MainFooter';
import { useEffect } from 'react';
import { useUserStore } from '@/store/userStore';
// import { MessageType } from '@/types';
import { useMessageStore } from '@/store/messageStore';
// export const metadata: Metadata = {
//     title: 'You & Me',
//     description: 'A chat application for ...',
// };

const DefaultLayout = ({
    children,
}: Readonly<{ children: React.ReactNode }>) => {
    const { socket } = useUserStore();
    const { getUnreadMessages, getAllMessages } = useMessageStore();
    useEffect(() => {
        // handlersqas
        const handleNewMessage = () => {
            getUnreadMessages();
            getAllMessages();
        };

        // events
        socket.on('new-message', handleNewMessage);

        // clean up the useEffect
        return () => {
            socket.off('new-message', handleNewMessage);
        };
    }, [socket, getUnreadMessages, getAllMessages]);
    return (
        // <div className='w-screen h-screen bg-[#1C1B1B] text-[#FFFFFF] grid grid-rows-[1fr_8fr_1fr] overflow-hidden'>
        <div className='w-screen h-[100dvh] bg-[#1C1B1B] text-[#FFFFFF] grid grid-rows-[1fr_8fr_1fr] overflow-hidden'>
            <MainNavbar />
            {/* <main className='p-3 overflow-hidden'>{children}</main> */}
            <main className='overflow-hidden'>{children}</main>
            <MainFooter />
        </div>
    );
};

export default DefaultLayout;
