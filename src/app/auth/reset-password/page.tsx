'use client';

import React, { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { authApi } from '@/lib/api';
import { errorMessage } from '@/lib/utils';
import toast from 'react-hot-toast';
import Link from 'next/link';

const ResetPasswordPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const email = searchParams.get('email') || '';

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!password || !confirmPassword) {
            setError('Please fill in all fields.');
            return;
        }
        // if (password.length < 8) {
        //     setError('Password must be at least 8 characters.');
        //     return;
        // }
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setLoading(true);
        try {
            await authApi.post('/reset-password', {
                email,
                password,
            });
            toast.success('Password reset successful! Please login.');
            router.push('/auth/login');
        } catch (err) {
            setError(errorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4'>
            <div className='w-full max-w-md bg-white rounded-xl shadow-lg p-8'>
                <h1 className='text-2xl font-bold text-gray-800 mb-2 text-center'>
                    Reset your password
                </h1>
                <p className='text-gray-500 mb-6 text-center'>
                    Set a new password for{' '}
                    <span className='font-semibold'>{email}</span>
                </p>
                <form onSubmit={handleSubmit} className='space-y-5'>
                    <div>
                        <label
                            htmlFor='password'
                            className='block text-sm font-medium text-gray-700 mb-1'
                        >
                            New Password
                        </label>
                        <input
                            id='password'
                            type='password'
                            autoComplete='new-password'
                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition'
                            placeholder='Enter new password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor='confirmPassword'
                            className='block text-sm font-medium text-gray-700 mb-1'
                        >
                            Confirm Password
                        </label>
                        <input
                            id='confirmPassword'
                            type='password'
                            autoComplete='new-password'
                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition'
                            placeholder='Confirm new password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            disabled={loading}
                            required
                        />
                    </div>
                    {error && (
                        <div className='text-red-500 text-sm'>{error}</div>
                    )}
                    <button
                        type='submit'
                        className='w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition disabled:opacity-60'
                        disabled={loading}
                    >
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>
                <div className='mt-6 text-center'>
                    <Link
                        href='/auth/login'
                        className='text-indigo-600 hover:underline text-sm'
                    >
                        Back to login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
