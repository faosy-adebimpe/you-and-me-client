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
