'use client';

import PenIconGenerateOriginally from '@/components/icons/PenIconGenerateOriginally';
import SilentLoader from '@/components/loaders/SilentLoader';
import { useUserStore } from '@/store/userStore';
import Image from 'next/image';
import React, { useState } from 'react';

const SettingsPage = () => {
    const {
        authUser,
        uploadingProfilePicture,
        uploadProfilePicture: upload,
    } = useUserStore();
    const [selectedImage, setsSelectedImage] = useState<string | null>(null);
    const [changingPicture, setChangingPicture] = useState(false);
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
            };
            reader.readAsDataURL(file);
        }
    };
    const uploadProfilePicture = () => {
        if (!selectedImage) return;
        upload(selectedImage);
    };
    return (
        <div className='w-full h-full overflow-y-scroll'>
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
                    <Image
                        src={
                            selectedImage ||
                            authUser?.image ||
                            '/default-avatar.png'
                        }
                        alt='Profile picture'
                        className='w-24 h-24 rounded-full object-cover border-4 border-gray-200'
                    />
                    {/* <img
                        src={
                            selectedImage ||
                            authUser?.image ||
                            '/default-avatar.png'
                        }
                        alt='Profile Avatar'
                        className='w-24 h-24 rounded-full object-cover border-4 border-gray-200'
                    /> */}
                    {!uploadingProfilePicture && (
                        <label
                            htmlFor='avatar-upload'
                            className='absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 cursor-pointer hover:bg-blue-700 transition flex justify-center items-center'
                        >
                            <span className='text-[12px]'>
                                <PenIconGenerateOriginally />
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
                            value='John Doe'
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
                            value='johndoe'
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
                            value='john.doe@example.com'
                            disabled
                            className='w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700 cursor-not-allowed'
                            readOnly
                        />
                    </div>
                    <button
                        type='button'
                        className='w-full mt-4 py-2 px-4 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition'
                        disabled={changingPicture}
                        onClick={uploadProfilePicture}
                    >
                        {changingPicture
                            ? 'Changing picture...'
                            : 'Update profile'}
                    </button>
                </div>
            </div>
            {/* Add your settings components here */}
        </div>
    );
};

export default SettingsPage;
