import { MessageType } from '@/types';
import React from 'react';

const AwaitingMessage = ({ message }: { message: MessageType }) => {
    return (
        <div
            key={message.id}
            className='message max-w-[80%] md:max-w-[70%] flex gap-[8px] items-end ml-auto'
        >
            {/* <div className='bg-gradient-to-tl from-[#2B2B2B] p-3 to-(--theme-color) rounded-[20px_20px_0px_20px] mr-2'> */}
            <div className='bg-gradient-to-tl from-[#2B2B2B] p-3 to-(--theme-color) rounded-[20px_20px_0px_20px] mr-0'>
                {message.text && (
                    <p
                        className='text-[15px]'
                        dangerouslySetInnerHTML={{
                            __html: message.text.replace(/\n/g, '<br />'),
                        }}
                    />
                )}
                <p className='time text-[12px] mt-[8px] text-[#CCCCCC]'>
                    {'sending'}
                </p>
            </div>
        </div>
    );
};

export default AwaitingMessage;
