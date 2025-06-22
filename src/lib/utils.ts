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

export const sanitizeObject = <T = object>(data: T) => {
    const newData = structuredClone(data);
    for (const key in newData) {
        if (newData[key] === '') {
            delete newData[key];
        }
    }
    return newData;
};

export const objectToArray = (data: object) => {
    const objectArray = Object.entries(data).map(([key, value]) => ({
        name: key,
        value,
    }));

    // const objectArrayWithName = Object.entries(data).map(([key, value]) => ({
    //     [key]: value,
    // }));

    return objectArray;
    // return [objectArray, objectArrayWithName];
};

export const filterObject = (data: object) => {
    const objectArray = objectToArray(data);
    const filtered = objectArray.filter((item) => Boolean(item.value));

    // convert back to single array
    const parsedObject = parseObject(filtered);

    return parsedObject;
};

export const parseObject = (
    data: {
        name: string;
        value: string;
    }[]
) => {
    const newObject: { [key: string]: string } = {};

    data.forEach((item) => {
        const { name, value } = item;
        newObject[name] = value;
    });

    return newObject;
};
