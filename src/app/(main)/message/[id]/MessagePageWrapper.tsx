'use client';

import Message from './Message';
import MessageNavbar from '@/components/navs/MessageNavbar';
import MessageFooter from '@/components/footers/MessageFooter';
import { useMessageStore } from '@/store/messageStore';

const MessagePageWrapper = ({ id }: { id: string }) => {
    const { getSelectedUser } = useMessageStore();
    const user = getSelectedUser(id);
    if (!user) {
        return;
    }
    return (
        <div className='w-screen h-screen bg-[#1C1B1B] text-[#FFFFFF] grid grid-rows-[1fr_8fr_1fr] overflow-hidden'>
            <MessageNavbar user={user} />
            <main className='p-3 overflow-hidden'>
                <Message user={user} />
            </main>
            <MessageFooter user={user} />
        </div>
    );
};

export default MessagePageWrapper;
