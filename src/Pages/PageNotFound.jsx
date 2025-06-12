import React from 'react';
import { Link } from 'react-router-dom';
import { Ghost } from 'lucide-react';

export default function PageNotFound() {
    return (
        <div className="h-screen w-full flex items-center justify-center bg-gray-950 text-gray-100 px-4">
            <div className="text-center max-w-md">
                <div className="mb-6 flex justify-center">
                    <Ghost className="w-20 h-20 text-gray-400 animate-bounce" />
                </div>
                <h1 className="text-5xl font-bold mb-4 text-white">404</h1>
                <p className="text-lg text-gray-400 mb-6">
                    Oops! The page you're looking for doesn't exist.
                </p>
                <div className="flex justify-center gap-4">
                    <Link
                        to="/"
                        className="px-6 py-2 bg-white text-gray-950 font-semibold rounded-full hover:bg-gray-100 transition duration-200"
                    >
                        Go to Home
                    </Link>
                    <Link
                        to="/all-posts"
                        className="px-6 py-2 bg-gray-800 text-white border border-gray-600 rounded-full hover:bg-gray-700 transition duration-200"
                    >
                        View All Posts
                    </Link>
                </div>
            </div>
        </div>
    );
}
