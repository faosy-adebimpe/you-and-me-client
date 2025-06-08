'use client';

const Error = ({ error }: { error: Error }) => {
    return <div>An error occured: {error.message}</div>;
};

export default Error;
