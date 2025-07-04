'use client';

import InstallButton from '@/components/buttons/InstallButton';
import MarkerIcon from '@/components/icons/MarkerIcon';
import ChatLoader from '@/components/loaders/ChatLoader';
import SilentLoader from '@/components/loaders/SilentLoader';
import { joinNames } from '@/lib/utils';
import { useUserStore } from '@/store/userStore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const SettingsPage = () => {
    const router = useRouter();
    const {
        authUser,
        uploadingProfilePicture,
        requestingVerificationEmail,
        requestVerificationEmail,
        uploadProfilePicture: upload,
        loggingOut,
        logout,
    } = useUserStore();
    const [selectedImage, setsSelectedImage] = useState<string | null>(null);
    const [changingPicture, setChangingPicture] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [interactedWith, setInteractedWith] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const changeProfilePicture = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setChangingPicture(true);
        const files = event.target.files;
        if (files && files[0]) {
            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                // Here you can handle the uploaded image, e.g., send it to your server
                const image = reader.result as string;
                setsSelectedImage(image);
                setChangingPicture(false);
                setInteractedWith(true);
            };
            reader.readAsDataURL(file);
        }
    };
    const uploadProfilePicture = () => {
        if (!selectedImage) return;
        upload(selectedImage);
    };

    // email request
    const handleEmailRequest = () => {
        requestVerificationEmail();
    };

    // logout
    const handleLogout = async () => {
        const result = await logout();
        if (result) {
            router.push('/auth/login');
        }
    };

    if (!authUser) {
        return <ChatLoader />;
    }
    return (
        <div className='px-3 w-full h-full overflow-y-scroll relative'>
            <InstallButton />

            <h1 className='text-2xl font-bold text-center p-4'>
                Account Settings
            </h1>
            <div className='flex flex-col items-center mt-8'>
                <div className='relative'>
                    {uploadingProfilePicture && (
                        <div className='absolute bg-black/50 w-full h-full rounded-full flex justify-center items-center'>
                            <SilentLoader />
                        </div>
                    )}
                    {mounted ? (
                        <Image
                            src={
                                (selectedImage &&
                                    typeof selectedImage === 'string' &&
                                    selectedImage) ||
                                (authUser?.image &&
                                    typeof authUser.image === 'string' &&
                                    authUser.image) ||
                                '/default-avatar.png'
                            }
                            alt='Profile picture'
                            width={96}
                            height={96}
                            className='w-24 h-24 rounded-full object-cover border-4 border-gray-200'
                            unoptimized // Add this if you want to allow any remote image without domain config
                        />
                    ) : (
                        <Image
                            src={authUser?.image || '/default-avatar.png'}
                            alt='Profile picture'
                            width={96}
                            height={96}
                            className='w-24 h-24 rounded-full object-cover border-4 border-gray-200'
                            unoptimized // Add this if you want to allow any remote image without domain config
                        />
                    )}
                    {!uploadingProfilePicture && (
                        <label
                            htmlFor='avatar-upload'
                            className='absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 cursor-pointer hover:bg-blue-700 transition flex justify-center items-center'
                        >
                            <span className='text-[12px]'>
                                <MarkerIcon />
                            </span>
                            <input
                                id='avatar-upload'
                                type='file'
                                accept='image/*'
                                className='hidden'
                                onChange={changeProfilePicture}
                            />
                        </label>
                    )}
                </div>
                <p className='mt-2 text-sm text-gray-500'>
                    {uploadingProfilePicture
                        ? 'Changing profile picture...'
                        : 'Change profile picture'}
                </p>
            </div>

            <div className=''>
                <div className='mt-8 w-full max-w-md mx-auto space-y-6 '>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                            Full Name
                        </label>
                        <input
                            type='text'
                            value={joinNames(
                                authUser.firstName,
                                authUser.lastName
                            )}
                            disabled
                            className='w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700 cursor-not-allowed'
                            readOnly
                        />
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                            Username
                        </label>
                        <input
                            type='text'
                            value={authUser?.username}
                            disabled
                            className='w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700 cursor-not-allowed'
                            readOnly
                        />
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                            Email
                        </label>
                        <input
                            type='email'
                            value={authUser?.email}
                            disabled
                            className='w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700 cursor-not-allowed'
                            readOnly
                        />
                    </div>
                    <button
                        type='button'
                        className='w-full mt-4 py-2 px-4 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition'
                        disabled={uploadingProfilePicture || !interactedWith}
                        onClick={uploadProfilePicture}
                    >
                        {uploadingProfilePicture
                            ? 'Changing picture...'
                            : 'Update profile'}
                    </button>
                    <div className='flex gap-6'>
                        {!authUser?.verified && (
                            <button
                                type='button'
                                className='w-full mt-4 py-2 px-4 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 transition'
                                disabled={requestingVerificationEmail}
                                onClick={handleEmailRequest}
                            >
                                {requestingVerificationEmail
                                    ? 'Requesting Email...'
                                    : 'Make Request'}
                            </button>
                        )}
                        <button
                            type='button'
                            className='w-full mt-4 py-2 px-4 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700 transition'
                            disabled={loggingOut}
                            onClick={handleLogout}
                        >
                            {changingPicture ? 'Logging out...' : 'Logout'}
                        </button>
                    </div>
                </div>
            </div>
            {/* Add your settings components here */}
        </div>
    );
};

export default SettingsPage;
