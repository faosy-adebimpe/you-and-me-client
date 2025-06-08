import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Message page',
    description: 'This is where users send private messages to one another',
};

const MessageLayout = ({
    children,
}: Readonly<{ children: React.ReactNode }>) => {
    return <>{children}</>;
};

export default MessageLayout;
