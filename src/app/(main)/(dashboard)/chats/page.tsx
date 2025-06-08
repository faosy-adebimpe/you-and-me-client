export const metadata: Metadata = {
    title: 'User chats',
    description: 'all users user has chatted with',
};

import { Metadata } from 'next';
import Chats from './Chats';

const chatsPage = () => {
    return <Chats />;
};

export default chatsPage;
