import React from 'react';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { Metadata } from 'next';
import InstallButton from '@/components/buttons/InstallButton';

import type { Viewport } from 'next';

export const viewport: Viewport = {
    themeColor: '#4169E1',
};

export const metadata: Metadata = {
    title: 'You & Me',
    description: 'You & Me chat application',
    manifest: '/manifest.json',
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <html lang='en'>
            <head>
                <link rel='apple-touch-icon' href='/icons/icon-192x192.png' />
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
