import { UserRegistrationType } from '@/types';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { useState } from 'react';
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
    const [isPassword, setIsPassword] = useState(true);
    const isPasswordArea = name === 'password' || name === 'confirmPassword';
    const fieldValue = watch(name);

    const changeType = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setIsPassword((prev) => !prev);
    };

    // if (name === 'confirmPassword') {
    //     const password = watch('password');
    //     const match = fieldValue === password;
    // }

    return (
        <div className="input-group">
            <div className="relative">
                <input
                    type={
                        name === 'password' || name === 'confirmPassword'
                            ? isPassword
                                ? 'password'
                                : 'text'
                            : 'text'
                    }
                    {...register(name, {
                        required: {
                            value: true,
                            message: `${name} is required`,
                        },
                    })}
                    className={classNames({
                        filled: fieldValue,
                        'pr-11': isPasswordArea,
                    })}
                />
                <label htmlFor={name}>{label}</label>
                {fieldValue && isPasswordArea && (
                    <button
                        className="absolute right-0 bg-gray-200 size-7 flex justify-center items-center rounded-full transition hover:bg-gray-300/70"
                        onClick={changeType}
                    >
                        {isPassword ? (
                            <EyeIcon className="size-4" />
                        ) : (
                            <EyeSlashIcon className="size-4" />
                        )}
                    </button>
                )}
            </div>
            <p>{errors[name]?.message}</p>
        </div>
    );
};

export default Input;
