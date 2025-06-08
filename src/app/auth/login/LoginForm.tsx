'use client';

import { useForm } from 'react-hook-form';
// import { ChevronRightIcon } from '@heroicons/react/16/solid';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { UserInputType, UserRegistrationType } from '@/types';
import Input from '@/components/form/Input';
import { authApi } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/userStore';

const userInputs: UserInputType[] = [
    {
        name: 'email',
        label: 'Email',
    },
    {
        name: 'password',
        label: 'Password',
    },
];

const LoginForm = () => {
    const router = useRouter();
    const form = useForm<UserRegistrationType>({ mode: 'onTouched' });
    const { register, formState, handleSubmit, watch } = form;
    const { errors } = formState;
    const { setAuthUser, connectSocket } = useUserStore();

    const onSubmit = async (formValues: UserRegistrationType) => {
        try {
            const response = await authApi.post('/login', formValues);
            const { data } = response;

            setAuthUser(data);

            // keep id in the local storage
            localStorage.setItem('_id', data._id);

            // make socket connection
            connectSocket();

            // send user to the homepage
            router.push('/');
        } catch (error) {
            console.log({ error });
        }
    };
    return (
        <div className='w-full flex justify-center'>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='flex gap-4 flex-col items-center'
            >
                {userInputs.map((userInput) => (
                    <Input
                        key={userInput.name}
                        register={register}
                        watch={watch}
                        errors={errors}
                        {...userInput}
                    />
                ))}

                <button className='w-[300px] sm:w-[360] rounded-[8px] p-5 bg-[#2F3538] text-[#FFFFFF] flex gap-[14px] justify-center items-center'>
                    <span className='text-[12.8px]'>CONTINUE</span>
                    <ChevronRightIcon className='size-5' />
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
