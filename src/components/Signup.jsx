import { useState } from 'react'
import authService from '../Appwrite/auth'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { login as authLogin } from '../Store/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Input, Logo } from './index'

function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState('');

    const createUserAccount = async (data) => {
        setError('');
        try {
            const session = await authService.createAccount(data)
            if (session) {
                const userdata = await authService.getCurrentUser();
                if (userdata) dispatch(authLogin(userdata))
                navigate('/');
            }
        }
        catch (error) {
            setError(error)
        }
    }
    return (
        <div className="flex items-center justify-center py-16">
            <div className={`mx-auto w-full max-w-lg rounded-xl p-10 border`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <form onSubmit={handleSubmit(createUserAccount)}>
                    <div className='space-y-5 mt-4'>
                        <Input
                            label="Full Name: "
                            placeholder="Enter your full name"
                            {...register("name", {
                                required: true,
                            })}
                        />
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
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
                        {/* Shows Error by converting to string to avoid error message and using .message to avoid seeing appwrite*/}
                        {error && <p className="text-red-600 mt-8 text-center">{String(error.message)}</p>}

                        <Button type="submit"
                            className="w-full uppercase duration-200 font-bold hover:bg-gray-300/70"
                            bgColor='bg-gray-300'
                            textColor='text-gray-800' >
                            Create Account
                        </Button>
                    </div>
                </form>
                <p className="mt-4 text-center text-base">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
            </div>

        </div>
    )
}

export default Signup