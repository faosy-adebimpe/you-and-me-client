'use client';

import { authApi, messageApi } from '@/lib/api';
import { errorMessage } from '@/lib/utils';
import { useUserStore } from '@/store/userStore';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

const HomePage = () => {
    const { authUser, disconnectSocket } = useUserStore();
    console.log({ authUser });
    const router = useRouter();
    const [notification, setNotification] = useState<string>('Logout');

    const handleLogout = async () => {
        setNotification('Logging out...');
        try {
            await axios.post('/api/v1/auth/logout');
            setNotification('Logged out');

            // clear id from local storage
            localStorage.removeItem('_id');

            // disconnect socket
            disconnectSocket();

            // send user to the login page
            router.push('/auth/login');
        } catch (error) {
            console.log({ error });
            setNotification('Failed to logout');
        }
    };

    const getSomeData = async () => {
        try {
            await messageApi.get('/users');
        } catch (error) {
            console.log({ error });
        }
    };

    const requestVerificationEmail = async () => {
        try {
            const response = await authApi.post('/request-verification-email');
            const { message } = response.data;
            toast.success(message || 'Verification email sent successfully!');
        } catch (error) {
            const message = errorMessage(error);
            toast.error(message || 'Failed to request verification email.');
        }
    };

    return (
        <main>
            <div className='container'>
                <h2 className=''>Home Page</h2>

                <div className='flex gap-5'>
                    <button onClick={handleLogout}>{notification}</button>

                    <button onClick={getSomeData}>Get some data</button>
                </div>

                <Link
                    href='/chats'
                    className='text-blue-500 underline underline-offset-2'
                >
                    Chats
                </Link>

                <button
                    className='block mt-5'
                    onClick={requestVerificationEmail}
                >
                    Request verification email
                </button>
            </div>
        </main>
    );
};

export default HomePage;
