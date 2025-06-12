import Link from 'next/link';
import RegistratonForm from './RegistratonForm';

const RegisterPage = () => {
    return (
        <div className='bg-[url("/images/reg-bg-img.png")] bg-black/50 bg-blend-darken'>
            <main className='p-3'>
                <div className='mx-auto flex gap-8 flex-col items-center mt-10 sm:mt-3 bg-white p-5 rounded-xl w-xs sm:w-sm'>
                    <h2 className='text-xl font-semibold'>Create an Account</h2>
                    <RegistratonForm />
                    <div className='flex gap-2 items-center text-[12.8px]'>
                        {/* <p>Already a Member?</p> */}
                        <p>Already have an account?</p>
                        <Link
                            href='/auth/login'
                            className='underline underline-offset-2'
                        >
                            LOG IN
                        </Link>
                    </div>
                    <div className='text-[12.8px] text-center -mt-5'>
                        <Link
                            href='/auth/forgot-password'
                            className='underline underline-offset-2'
                        >
                            Forgot your password? Reset it here.
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default RegisterPage;
