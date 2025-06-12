import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

export default function Protected({ children, authentication = true }) {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector((state) => state.auth.status);

    useEffect(() => {
        if (authentication && authStatus !== authentication) {
            navigate('/login');
        }
        else if (!authentication && authStatus !== authentication) {
            navigate('/');
        }
        setLoader(false);
    }, [navigate, authStatus, authentication])

    return loader ? <h1 className='fixed h-scrren w-screen flex justify-center items-center text-4xl bg-gray-900 text-gray-100'>Loading...</h1> : <>{children}</>
}
