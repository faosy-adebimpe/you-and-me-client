import ConnectSocket from '@/components/auth/ConnectSocket';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'You & Me',
    description: 'A chat application for ...',
};

const MainLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <>
            <ConnectSocket />
            {children}
        </>
    );
};

export default MainLayout;
