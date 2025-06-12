'use client';

import { authApi } from '@/lib/api';
import { errorMessage } from '@/lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import toast from 'react-hot-toast';

const OTP_LENGTH = 6;

const ForgotPasswordPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
    const [otpError, setOtpError] = useState('');
    const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        if (email === '') {
            setError('Please enter your email address.');
            setLoading(false);
            return;
        }

        try {
            const response = await authApi.post('/forgot-password', {
                email,
            });
            const { message } = response.data;
            toast.success(message);
            setSubmitted(true);
            setShowOtpModal(true);
        } catch (error) {
            const message = errorMessage(error);
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    // OTP input handlers
    const handleOtpChange = (value: string, idx: number) => {
        if (!/^[0-9]?$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[idx] = value;
        setOtp(newOtp);

        if (value && idx < OTP_LENGTH - 1) {
            otpRefs.current[idx + 1]?.focus();
        }
        if (value && idx === OTP_LENGTH - 1 && newOtp.every((d) => d)) {
            handleOtpSubmit(newOtp.join(''));
        }
    };

    const handleOtpKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        idx: number
    ) => {
        if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
            otpRefs.current[idx - 1]?.focus();
        }
    };

    const handleOtpSubmit = async (otpValue?: string) => {
        setLoading(true);
        setOtpError('');
        try {
            // Replace with your OTP verification API
            const response = await authApi.post('/verify-otp', {
                email,
                otp: otpValue || otp.join(''),
            });
            toast.success(
                response.data.message || 'OTP verified! Redirecting...'
            );
            setShowOtpModal(false);
            // Redirect to reset password or next step
            router.push(
                `/auth/reset-password?email=${encodeURIComponent(email)}`
            );

            // window.location.href =
            //     '/auth/reset-password?email=' + encodeURIComponent(email);
        } catch (error) {
            setOtpError(errorMessage(error));
            setOtp(Array(OTP_LENGTH).fill(''));
            otpRefs.current[0]?.focus();
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4'>
            <div className='w-full max-w-md bg-white rounded-xl shadow-lg p-8'>
                <h1 className='text-2xl font-bold text-gray-800 mb-2 text-center'>
                    Forgot your password?
                </h1>
                <p className='text-gray-500 mb-6 text-center'>
                    Enter your email address and we’ll send you a link to reset
                    your password.
                </p>
                {submitted ? (
                    <div className='text-center'>
                        <svg
                            className='mx-auto mb-4 w-12 h-12 text-green-500'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                            viewBox='0 0 24 24'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M5 13l4 4L19 7'
                            />
                        </svg>
                        <p className='text-green-600'>
                            An OTP has been sent to{' '}
                            <span className='font-semibold'>{email}</span>.
                            <br />
                            Please check your email to reset your password.
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className='space-y-5'>
                        <div>
                            <label
                                htmlFor='email'
                                className='block text-sm font-medium text-gray-700 mb-1'
                            >
                                Email address
                            </label>
                            <input
                                id='email'
                                type='email'
                                autoComplete='email'
                                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition'
                                placeholder='you@example.com'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                            {loading ? 'Sending...' : 'Send reset link'}
                        </button>
                    </form>
                )}
                <div className='mt-6 text-center'>
                    <Link
                        href='/auth/login'
                        className='text-indigo-600 hover:underline text-sm'
                    >
                        Back to login
                    </Link>
                </div>
            </div>

            {/* OTP Modal */}
            {showOtpModal && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40'>
                    <div className='bg-white rounded-xl shadow-xl p-8 w-full max-w-sm relative'>
                        <button
                            className='absolute top-3 right-3 text-gray-400 hover:text-gray-600'
                            onClick={() => setShowOtpModal(false)}
                            aria-label='Close'
                            type='button'
                        >
                            <svg
                                width='24'
                                height='24'
                                fill='none'
                                stroke='currentColor'
                                strokeWidth='2'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M6 18L18 6M6 6l12 12'
                                />
                            </svg>
                        </button>
                        <h2 className='text-xl font-semibold text-gray-800 mb-2 text-center'>
                            Enter OTP
                        </h2>
                        <p className='text-gray-500 mb-4 text-center'>
                            Enter the 6-digit code sent to{' '}
                            <span className='font-semibold'>{email}</span>
                        </p>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleOtpSubmit();
                            }}
                        >
                            <div className='flex justify-center gap-2 mb-4'>
                                {Array.from({ length: OTP_LENGTH }).map(
                                    (_, idx) => (
                                        <input
                                            key={idx}
                                            ref={(el) => {
                                                otpRefs.current[idx] = el;
                                            }}
                                            type='text'
                                            inputMode='numeric'
                                            maxLength={1}
                                            className='w-12 h-12 text-center text-xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition font-mono'
                                            value={otp[idx]}
                                            onChange={(e) =>
                                                handleOtpChange(
                                                    e.target.value,
                                                    idx
                                                )
                                            }
                                            onKeyDown={(e) =>
                                                handleOtpKeyDown(e, idx)
                                            }
                                            disabled={loading}
                                            autoFocus={idx === 0}
                                        />
                                    )
                                )}
                            </div>
                            {otpError && (
                                <div className='text-red-500 text-sm text-center mb-2'>
                                    {otpError}
                                </div>
                            )}
                            <button
                                type='submit'
                                className='w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition disabled:opacity-60'
                                disabled={loading || otp.some((d) => !d)}
                            >
                                {loading ? 'Verifying...' : 'Verify OTP'}
                            </button>
                            <div className='text-center mt-2'>
                                <button
                                    type='button'
                                    className='text-indigo-600 hover:underline text-xs'
                                    disabled={loading}
                                    onClick={handleSubmit}
                                >
                                    Resend OTP
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ForgotPasswordPage;
