export const getTime = (date: string) => {
    const formatedDate = new Date(date);
    return formatedDate.toLocaleTimeString();
};
