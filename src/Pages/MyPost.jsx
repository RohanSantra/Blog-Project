import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, PostCard, Loader } from '../components/index';
import service from '../Appwrite/config';
import { useNavigate } from 'react-router-dom';
import { Query } from 'appwrite';
import { fetchUserPosts } from '../Store/postSlice';

export default function MyPosts() {
    const dispatch = useDispatch()
    const { userPost, loading, error } = useSelector((state) => state.posts);
    const userData = useSelector((state) => state.auth.userData);
    const userId = userData?.$id;


    useEffect(() => {
        if (userId) {
            dispatch(fetchUserPosts(userId));
        }
    }, [dispatch, userId]);

    if (error) console.log(error);
    if (loading) return <Loader />

    return (
        <div className="py-10">
            <Container>
                <h1 className="text-3xl font-bold text-center mb-6 uppercase">My Posts</h1>
                {userPost.length > 0 ? (
                    <div className="flex flex-wrap">
                        {userPost.map((post) => (
                            <div key={post.$id} className="px-4 py-2 w-ful sm:w-1/2 md:w-1/3">
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-400">You haven't created any posts yet.</p>
                )}
            </Container>
        </div>
    );
}
