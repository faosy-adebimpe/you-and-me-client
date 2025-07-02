import { UserType } from '@/types';
import { CameraIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { useMessageStore } from '@/store/messageStore';
import TextAreaAutosize from 'react-textarea-autosize';

const MessageFooter = ({ user }: { user: UserType }) => {
    const { message, setMessage, sendingMessage, sendMessage } =
        useMessageStore();
    return (
        <div className='container h-full'>
            <form className='flex gap-3 items-end h-full'>
                <div className='flex gap-3 flex-1 items-end bg-[#2B2B2B] rounded-[16px] p-3'>
                    <TextAreaAutosize
                        maxRows={5}
                        minRows={1.2}
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
                        disabled={sendingMessage || true}
                        type='button'
                    >
                        <CameraIcon className='size-5' />
                    </button>
                </div>
                <button
                    // className='size-9 rounded-full bg-(--theme-color) flex justify-center items-center disabled:bg-(--background-color) mb-[5px]'
                    className='size-9 rounded-full bg-(--theme-color) flex justify-center items-center disabled:bg-(--background-color) mb-3'
                    disabled={sendingMessage || !message}
                    // type='submit'
                    onClick={() => sendMessage(user)}
                >
                    <PaperAirplaneIcon className='size-5' />
                </button>
            </form>
        </div>
    );
};

export default MessageFooter;
