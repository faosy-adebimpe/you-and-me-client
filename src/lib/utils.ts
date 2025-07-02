import { MessageType } from '@/types';
import axios from 'axios';

export const errorMessage = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        const { message } = error.response?.data;
        return message;
    } else if (error instanceof Error) {
        const message = error.message;
        return message;
    } else {
        return error;
    }
};

export const filterMessages = (messages: MessageType[], id: string) => {
    const userMessages = messages.filter((message) => message.senderId === id);
    return userMessages;
};

// resolve reject - request - response - res
export const sleep = (time: number = 1) =>
    new Promise((resolve) => setTimeout(resolve, time * 1000));

export const joinNames = (...args: (string | undefined)[]): string => {
    return args.join(' ');
};
