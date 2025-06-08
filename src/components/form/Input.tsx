import { UserRegistrationType } from '@/types';
import classNames from 'classnames';
import { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';

const Input = ({
    register,
    watch,
    errors,
    name,
    label,
}: {
    register: UseFormRegister<UserRegistrationType>;
    watch: UseFormWatch<UserRegistrationType>;
    errors: FieldErrors<UserRegistrationType>;
    name: 'email' | 'password' | 'confirmPassword' | 'username';
    label: string;
}) => {
    const fieldValue = watch(name);

    // if (name === 'confirmPassword') {
    //     const password = watch('password');
    //     const match = fieldValue === password;
    // }

    return (
        <div className='input-group'>
            <div>
                <input
                    type='text'
                    {...register(name, {
                        required: {
                            value: true,
                            message: `${name} is required`,
                        },
                    })}
                    className={classNames({ filled: fieldValue })}
                />
                <label htmlFor={name}>{label}</label>
            </div>
            <p>{errors[name]?.message}</p>
        </div>
    );
};

export default Input;
