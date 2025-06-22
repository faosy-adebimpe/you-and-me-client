'use client';
import { sanitizeObject } from '@/lib/utils';
import { useUserStore } from '@/store/userStore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

interface FormType {
    firstName: string;
    lastName: string;
    middleName?: string;
    image?: string;
    gender: string;
    dob: string;
}

const genders = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
];

const GetStartedPage = () => {
    const router = useRouter();
    const { updateProfile, updatingProfile } = useUserStore();
    const [profilePic, setProfilePic] = useState<string | null>(null);
    const [form, setForm] = useState<FormType>({
        firstName: '',
        middleName: '',
        lastName: '',
        image: '',
        gender: '',
        dob: '',
    });
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const result = event.target?.result as string;
                setProfilePic(result);

                if (!result) return;
                setForm({ ...form, image: result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // validations
        const validated = validateFields();
        if (!validated) return;

        // remove empty values
        const formData = sanitizeObject(form);

        // update proifle
        updateProfile(formData);

        // go to chats
        router.push('/chats');
    };

    const validateFields = () => {
        // validate fields
        const fields = structuredClone(form);
        delete fields.middleName;
        delete fields.image;

        const filled = Object.values(fields).every((item) => item !== '');
        return filled;
    };

    return (
        <div className='flex items-center justify-center min-h-screen bg-[var(--background-color)]'>
            <form
                className='relative bg-white/10 border border-white/20 shadow-2xl rounded-3xl px-8 py-10 w-full max-w-xl space-y-8 backdrop-blur-lg'
                style={{
                    boxShadow: '0 8px 32px 0 rgba(65, 105, 225, 0.25)',
                }}
                onSubmit={handleSubmit}
            >
                <h2 className='text-4xl font-extrabold text-white drop-shadow mb-2 text-center tracking-tight'>
                    Get Started
                </h2>
                <p className='text-gray-400 text-lg mb-6 text-center'>
                    Complete your profile to continue
                </p>
                <div className='flex flex-col items-center'>
                    <div
                        className='relative w-32 h-32 rounded-full bg-gradient-to-tr from-white/10 to-white/5 border-4 border-white/20 shadow-lg flex items-center justify-center cursor-pointer group transition-all duration-300 hover:scale-105'
                        onClick={() => fileInputRef.current?.click()}
                    >
                        {profilePic ? (
                            <Image
                                src={profilePic}
                                alt='Profile'
                                className='w-full h-full object-cover rounded-full'
                                width={126}
                                height={126}
                            />
                        ) : (
                            <span className='text-white text-5xl font-bold opacity-40'>
                                +
                            </span>
                        )}
                        <input
                            ref={fileInputRef}
                            type='file'
                            accept='image/*'
                            className='hidden'
                            onChange={handleImageChange}
                        />
                        <div className='absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity'>
                            <span className='text-white text-sm font-semibold'>
                                Change
                            </span>
                        </div>
                        {/* Camera icon at the bottom right, visually centered and overlapping */}
                        <div className='absolute -bottom-2 -right-2 bg-[var(--theme-color)] p-2 rounded-full shadow-lg flex items-center justify-center border-2 border-white'>
                            {/* Modern camera icon SVG */}
                            <svg
                                width='22'
                                height='22'
                                viewBox='0 0 24 24'
                                fill='none'
                            >
                                <path
                                    d='M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-8a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm7-2h-2.17l-.59-1.17A2 2 0 0 0 14.83 4h-5.66a2 2 0 0 0-1.41.83L7.17 7H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Zm0 11H5V9h2.38l1.24-2.07A1 1 0 0 1 9.83 6h4.34a1 1 0 0 1 .83.43L16.62 9H19v9Z'
                                    fill='white'
                                />
                            </svg>
                        </div>
                    </div>
                </div>
                {/* Improved grid for better alignment and spacing */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6'>
                    <div>
                        <label className='block text-gray-300 font-semibold mb-2'>
                            First Name
                        </label>
                        <input
                            type='text'
                            name='firstName'
                            value={form.firstName}
                            onChange={handleChange}
                            required
                            className='w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--theme-color)] transition'
                            placeholder='First Name'
                        />
                    </div>
                    <div>
                        <label className='block text-gray-300 font-semibold mb-2'>
                            Middle Name
                        </label>
                        <input
                            type='text'
                            name='middleName'
                            value={form.middleName}
                            onChange={handleChange}
                            className='w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--theme-color)] transition'
                            placeholder='Middle Name (optional)'
                        />
                    </div>
                    <div>
                        <label className='block text-gray-300 font-semibold mb-2'>
                            Last Name
                        </label>
                        <input
                            type='text'
                            name='lastName'
                            value={form.lastName}
                            onChange={handleChange}
                            required
                            className='w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--theme-color)] transition'
                            placeholder='Last Name'
                        />
                    </div>
                    <div>
                        <label className='block text-gray-300 font-semibold mb-2'>
                            Gender
                        </label>
                        <select
                            name='gender'
                            value={form.gender}
                            onChange={handleChange}
                            required
                            className='w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-[var(--theme-color)] transition'
                            style={{
                                color: form.gender ? 'white' : 'gray', // white text when selected, gray placeholder
                                backgroundColor: 'rgba(255,255,255,0.05)',
                            }}
                        >
                            <option value='' style={{ color: '#888' }}>
                                Select Gender
                            </option>
                            {genders.map((g) => (
                                <option
                                    key={g.value}
                                    value={g.value}
                                    style={{ color: '#222' }}
                                >
                                    {g.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='md:col-span-2'>
                        <label className='block text-gray-300 font-semibold mb-2'>
                            Date of Birth
                        </label>
                        <input
                            type='date'
                            name='dob'
                            value={form.dob}
                            onChange={handleChange}
                            required
                            className='w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[var(--theme-color)] transition'
                        />
                    </div>
                </div>
                {/* Next button at the bottom */}
                <div className='pt-4'>
                    <button
                        type='submit'
                        className='w-full py-3 rounded-xl bg-[var(--theme-color)] text-white font-bold text-lg shadow-lg hover:opacity-90 transition'
                        disabled={updatingProfile}
                    >
                        {updatingProfile ? 'Updating profile...' : 'Next'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default GetStartedPage;
