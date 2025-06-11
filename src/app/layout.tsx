import React from 'react';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { Metadata } from 'next';
import InstallButton from '@/components/buttons/InstallButton';

export const metadata: Metadata = {
    title: 'You & Me',
    description: 'You & Me chat application',
    // manifest: '/manifest.webmanifest',
    // optional, for completeness:
    // manifest: '/manifest.json',
    // themeColor: '#1f1f1f',
    // icons: {
    //     icon: '/pwa-icons/icon512_maskable.png',
    //     shortcut: '/pwa-icons/icon512_maskable.png',
    //     apple: '/pwa-icons/icon512_maskable.png',
    // },
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <html lang='en'>
            <head>
                <link rel='manifest' href='/manifest.json' />
                <link rel='icon' href='/icons/icon-192x192.png' />
                <meta name='theme-color' content='#8936FF' />
            </head>
            <body>
                <Toaster />
                <InstallButton />
                {children}
            </body>
        </html>
    );
};

export default RootLayout;
