import React from 'react';

const MessageDivider = ({
    count = 0,
    messagesDividerRef,
}: {
    count?: number;
    messagesDividerRef: React.Ref<HTMLDivElement>;
}) => {
    return (
        <div className='w-full flex items-center' ref={messagesDividerRef}>
            <div className='w-full h-0.5 bg-(--theme-color)/50 rounded-full'></div>
            <p className='text-sm w-full text-center'>
                Unread Messages (
                <span className='text-(--theme-color) text-semibold px-1'>
                    {count || '0'}
                </span>
                )
            </p>
            <div className='w-full h-0.5 bg-(--theme-color)/50 rounded-full'></div>
        </div>
    );
};

export default MessageDivider;
