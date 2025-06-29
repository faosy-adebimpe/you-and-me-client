'use client';

import { useMessageStore } from '@/store/messageStore';
import {
    // UserGroupIcon,
    ChatBubbleOvalLeftIcon,
    Cog6ToothIcon,
} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const footerLinks = [
    { name: 'chats', href: '/chats', icon: ChatBubbleOvalLeftIcon },
    // { name: 'users', href: '/users', icon: UserGroupIcon },
    { name: 'settings', href: '/settings', icon: Cog6ToothIcon },
];

const MainFooter = () => {
    const pathname = usePathname();
    const { unreadMessages } = useMessageStore();
    return (
        // <footer className='bg-[#707070]'>
        <footer className='bg-[#1F1F1F]'>
            <div className='container'>
                <div className='flex justify-between items-center'>
                    {footerLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className='size-11 rounded-full flex justify-center items-center transition-all  hover:bg-black/30 relative'
                        >
                            {/* #007EF4 */}
                            <link.icon
                                className={classNames('size-6', {
                                    'text-[#007EF4]':
                                        link.href === pathname ||
                                        (link.href.startsWith(pathname) &&
                                            pathname !== '/'),
                                })}
                            />
                            {/* uncomment */}
                            {link.name === 'chats' &&
                                unreadMessages.length >= 1 && (
                                    <div className='size-5 rounded-full text-white bg-red-500 flex justify-center items-center absolute top-1.5 right-0'>
                                        <span
                                            className={classNames({
                                                'text-xs': !(
                                                    unreadMessages.length >= 100
                                                ),
                                                'text-[10px]':
                                                    unreadMessages.length >=
                                                    100,
                                            })}
                                        >
                                            {unreadMessages.length >= 100
                                                ? '99+'
                                                : unreadMessages.length}
                                        </span>
                                    </div>
                                )}
                        </Link>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default MainFooter;
