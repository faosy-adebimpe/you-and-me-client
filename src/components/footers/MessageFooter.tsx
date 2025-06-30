import React, { useState } from 'react';
import { messageApi } from '@/lib/api';
import { UserType } from '@/types';
import { CameraIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { useMessageStore } from '@/store/messageStore';
import TextAreaAutosize from 'react-textarea-autosize';

const MessageFooter = ({ user }: { user: UserType }) => {
    const { addNewMessage } = useMessageStore();
    const [message, setMessage] = useState('');
    const [sending, setSending] = useState(false);

    const sendMessage = async () => {
        if (!message) {
            return;
        }
        setMessage('');
        setSending(true);
        try {
            const response = await messageApi.post(`/send/${user._id}`, {
                text: message,
            });
            const { data } = response;

            // add message
            addNewMessage(data);
        } catch (error) {
            console.log({ error });
        } finally {
            setSending(false);
        }
    };
    return (
        <div className='container h-full'>
            {/* <form className='flex gap-5 items-end h-full'> */}
            <form className='flex gap-3 items-end h-full'>
                {/* <div className='h-full flex gap-3 items-end flex-1 bg-[#2B2B2B] rounded-[26px] px-3 overflow-hidden py-2'> */}
                <div className='flex gap-3 flex-1 items-end bg-[#2B2B2B] rounded-[16px] p-3 overflow-hidden'>
                    <textarea
                        // maxRows={5}
                        // minRows={1.2}
                        name='message'
                        id='message'
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                        placeholder='Type a message...'
                        className='w-full h-full border-none outline-none resize-none max-h-32 overflow-y-auto'
                    />
                    {/* [#007EF4] */}
                    <button
                        className='size-9 rounded-full bg-(--theme-color) flex justify-center items-center disabled:bg-(--background-color)'
                        disabled={sending || true}
                        type='button'
                    >
                        <CameraIcon className='size-5' />
                    </button>
                </div>
                <button
                    // className='size-9 rounded-full bg-(--theme-color) flex justify-center items-center disabled:bg-(--background-color) mb-[5px]'
                    className='size-9 rounded-full bg-(--theme-color) flex justify-center items-center disabled:bg-(--background-color) mb-3'
                    disabled={sending || !message}
                    // type='submit'
                    onClick={sendMessage}
                >
                    <PaperAirplaneIcon className='size-5' />
                </button>
            </form>
        </div>
    );
};

export default MessageFooter;
