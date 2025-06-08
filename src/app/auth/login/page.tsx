import Link from 'next/link';
import LoginForm from './LoginForm';
import classNames from 'classnames';

const LoginPage = () => {
    return (
        <div
            className={classNames(
                "h-screen bg-[url('/images/log-bg-img.png')] bg-cover bg-center"
            )}
        >
            <main className='p-3'>
                <div className='mx-auto flex gap-8 flex-col items-center mt-10 sm:mt-3 bg-white p-5 rounded-xl w-xs sm:w-sm'>
                    <h2 className='text-xl font-semibold'>
                        Log In to your Account
                    </h2>
                    <LoginForm />
                    <div className='flex gap-2 items-center text-[12.8px]'>
                        <p>New User?</p>
                        <Link
                            href='/auth/register'
                            className='underline underline-offset-2'
                        >
                            GET STARTED
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LoginPage;
