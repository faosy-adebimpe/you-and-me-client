import axios from 'axios';

export const getTime = (date: string) => {
    const formatedDate = new Date(date);
    return formatedDate.toLocaleTimeString();
};

export const errorMessage = (error: unknown): string => {
    if (axios.isAxiosError(error)) {
        // If the error is an Axios error, return the response data or message
        return error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
        // If it's a standard Error object, return its message
        return error.message;
    }
    // Fallback for any other type of error
    return `An unknown error occurred: ${error}`;
};
