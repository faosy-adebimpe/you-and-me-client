import React, { useState } from 'react';
import { messageApi } from '@/lib/api';
import { UserType } from '@/types';
import { CameraIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { useMessageStore } from '@/store/messageStore';

const MessageFooter = ({ user }: { user: UserType }) => {
    const { addNewMessage } = useMessageStore();
    const [message, setMessage] = useState('');
    const [sending, setSending] = useState(false);

    const sendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!message) {
            return;
        }
        setSending(true);
        try {
            const response = await messageApi.post(`/send/${user._id}`, {
                text: message,
            });
            const { data } = response;

            // add message
            addNewMessage(data);
            setMessage('');
        } catch (error) {
            console.log({ error });
        } finally {
            setSending(false);
        }
    };
    return (
        <div className='container'>
            <form className='relative flex items-center' onSubmit={sendMessage}>
                <input
                    className='w-full h-[56px] bg-[#2B2B2B] rounded-full border-none outline-none px-5 pr-28'
                    type='text'
                    name='message'
                    id='message'
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                />

                <div className='flex gap-3 items-center absolute right-3'>
                    {/* [#007EF4] */}
                    <button
                        className='size-9 rounded-full bg-(--theme-color) flex justify-center items-center disabled:bg-(--background-color)'
                        disabled={sending || true}
                        type='button'
                    >
                        <CameraIcon className='size-5' />
                    </button>
                    <button
                        className='size-9 rounded-full bg-(--theme-color) flex justify-center items-center disabled:bg-(--background-color)'
                        disabled={sending || !message}
                        type='submit'
                    >
                        <PaperAirplaneIcon className='size-5' />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MessageFooter;
