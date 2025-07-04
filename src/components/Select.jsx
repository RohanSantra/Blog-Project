import React, { useId } from 'react'

function Select({
    options,
    label,
    className,
    ...props
}, ref) {

    const id = useId();

    return (
        <div className='w-full'>
            {/* Conditional rendering of label is there */}
            {label &&
                <label htmlFor={id}>
                    {label}
                </label>
            }
            <select id={id}
                {...props}
                ref={ref}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            >
                {options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                ))}

            </select>
        </div>
    )
}

// Another way of using forward ref
export default React.forwardRef(Select)