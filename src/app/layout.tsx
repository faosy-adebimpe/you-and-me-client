import React from 'react';
import './globals.css';
import { Toaster } from 'react-hot-toast';

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <html lang='en'>
            <body>
                <Toaster />
                {children}
            </body>
        </html>
    );
};

export default RootLayout;
