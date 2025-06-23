import React from 'react';
import VerifyEmail from './VerifyEmail';

const VerifyEmailPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ token: string }>;
}) => {
    const { token } = await searchParams;
    return <VerifyEmail token={token} />;
};

export default VerifyEmailPage;
