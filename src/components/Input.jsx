import React, { forwardRef, useId } from 'react'


// Using forward ref to get reference and handle state in another component
const Input = forwardRef(function Input({
    label,
    type = 'text',
    className = '',
    ...props
}, ref) {
    const id = useId()

    return (
        <div className='w-full'>
            {label &&
                <label className='inline-block mb-1 pl-1'
                    htmlFor={id}>
                    {label}
                </label>}
            <input type={type}
                className={`px-3 py-2 rounded-lg text-gray-50 outline-none duration-200 border focus:border-2 border-gray-100 w-full ${className}`}
                ref={ref}
                id={id}
                {...props}
            />
        </div>
    )
})

export default Input