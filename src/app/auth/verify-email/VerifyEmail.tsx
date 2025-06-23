'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/api';
import toast from 'react-hot-toast';
import { errorMessage } from '@/lib/utils';

const jwtErrors: { [key: string]: string } = {
    'Verification token not provided': 'Verification token not provided',
    'jwt expired': 'Token expired, request for new token',
    'jwt malformed': 'Invalid verification token',
};

const VerifyEmail = ({ token }: { token: string }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState('');

    const handleVerify = async () => {
        if (!token) {
            setError('Verification token not provided');
            return;
        }

        setLoading(true);
        setError('');
        try {
            const response = await authApi.post(`/verify-email?token=${token}`);
            const { message } = response.data;

            setVerified(true);
            // toast.success(message || 'Email verified! You can now log in.');
            toast.success(message || 'Email verified!');

            router.push('/auth/login');
        } catch (error: unknown) {
            let message = errorMessage(error);
            if (message in jwtErrors) {
                message = jwtErrors[message];
            }
            setError(message || 'Verification failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4'>
            <div className='w-full max-w-md bg-white rounded-xl shadow-lg p-8 flex flex-col items-center'>
                <svg
                    className='w-16 h-16 text-indigo-500 mb-4'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth={1.5}
                    viewBox='0 0 24 24'
                >
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M16.862 4.487a9 9 0 11-9.724 0'
                    />
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M9 12l2 2 4-4'
                    />
                </svg>
                <h1 className='text-2xl font-bold text-gray-800 mb-2 text-center'>
                    Verify your email
                </h1>
                <p className='text-gray-500 mb-6 text-center'>
                    Click the button below to verify your email address.
                </p>
                {error && (
                    <div className='text-red-500 text-sm mb-4'>{error}</div>
                )}

                <div className=''>
                    {verified ? (
                        <button
                            className='w-full py-2 px-4 bg-green-500 text-white font-semibold rounded-lg transition cursor-not-allowed'
                            disabled
                        >
                            Verified!
                        </button>
                    ) : (
                        <button
                            className='w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition'
                            onClick={() => handleVerify()}
                            disabled={loading || !token}
                        >
                            {loading ? 'Verifying...' : 'Verify Email'}
                        </button>
                    )}
                </div>

                {/* <Suspense
                    fallback={
                        <div className='w-full py-2 px-4 bg-gray-300 rounded-lg text-center'>
                            Loading...
                        </div>
                    }
                >
                    <TokenFetcher>
                        {(token) =>
                            verified ? (
                                <button
                                    className='w-full py-2 px-4 bg-green-500 text-white font-semibold rounded-lg transition cursor-not-allowed'
                                    disabled
                                >
                                    Verified!
                                </button>
                            ) : (
                                <button
                                    className='w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition'
                                    onClick={() => handleVerify(token)}
                                    disabled={loading || !token}
                                >
                                    {loading ? 'Verifying...' : 'Verify Email'}
                                </button>
                            )
                        }
                    </TokenFetcher>
                </Suspense> */}
            </div>
        </div>
    );
};

export default VerifyEmail;
