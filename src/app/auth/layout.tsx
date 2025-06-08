import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Authentication page',
    description: 'Register an account or log in to your account',
};

const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return <>{children}</>;
};

export default AuthLayout;
