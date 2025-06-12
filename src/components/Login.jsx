import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../Store/authSlice'
import { Button, Input, Logo } from './index'
import { useDispatch } from 'react-redux'
import authService from '../Appwrite/auth'
import { useForm } from 'react-hook-form'


function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState('');

    const login = async (data) => {
        setError('');
        try {
            const session = await authService.login(data);
            if (session) {
                const userdata = await authService.getCurrentUser();
                if (userdata) dispatch(authLogin(userdata))
                navigate('/')
            }
        } catch (error) {
            setError(error)
        }
    }
    return (
        <div
            className='flex items-center justify-center w-full py-24'>
            <div className={`mx-auto w-full max-w-lg rounded-xl p-10 border border-white`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            // Spread syntax is important because if it is use as it is, it may overwrite when used in another input
                            // Name is also important to distingush eg: email,password
                            {...register("email", {
                                // options 
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                            })}
                        />

                        {/* Shows Error by converting to string to avoid error message aud using .message to avoid seeing appwrite*/}
                        {error && <p className="text-red-600 mt-8 text-center">{String(error.message)}</p>}

                        <Button
                            type="submit"
                            className="w-full uppercase duration-200 font-bold hover:bg-gray-300/70"
                            bgColor='bg-gray-300'
                            textColor='text-gray-800'
                        >Sign in</Button>
                    </div>
                </form>
                <p className="mt-4 text-center text-base text-gray/60">
                    Don&apos;t have any account?&nbsp;
                    <Link to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login