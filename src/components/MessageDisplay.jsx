import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, LogIn, UserPlus, FilePlus, Lock } from 'lucide-react';

export default function MessageDisplay({ msg = "", showLogin = false, showSignup = false }) {
    return (
        <div className="min-h-[80vh] w-full flex items-center justify-center bg-gray-950 text-gray-100 px-4 py-12">
            <div className="text-center w-full max-w-md">
                {/* Icon */}
                <div className="mb-6 flex justify-center">

                    {showLogin && showSignup ?
                        (<AlertTriangle className="w-32 h-32 text-yellow-500 animate-bounce" />) :
                        ((<FilePlus className="w-32 h-32 text-yellow-500 animate-bounce" />))}
                </div>

                {/* Message */}
                <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-white">{msg}</h2>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
                    {showLogin && (
                        <Link
                            to="/login"
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition duration-200"
                        >
                            <LogIn className="w-5 h-5" />
                            Login
                        </Link>
                    )}
                    {showSignup && (
                        <Link
                            to="/signup"
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 text-white border border-gray-600 rounded-full hover:bg-gray-700 transition duration-200"
                        >
                            <UserPlus className="w-5 h-5" />
                            Sign Up
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
