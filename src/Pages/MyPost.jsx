import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, PostCard, Loader } from '../components/index';
import service from '../Appwrite/config';
import { useNavigate } from 'react-router-dom';
import { hideLoader, showLoader } from '../Store/loaderSlice';
import { Query } from 'appwrite';

export default function MyPosts() {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const loading = useSelector((state) => state.loader.loading)
    const userData = useSelector((state) => state.auth.userData);
    const userId = userData?.$id;

    useEffect(() => {
        dispatch(showLoader())
        if (userId) {
            service.getPosts([Query.equal("userId", userId)])
                .then((res) => {
                    if (res?.documents) {
                        setPosts(res.documents);
                    }
                })
                .catch((err) => {
                    console.error("Failed to fetch user's posts:", err);
                    navigate('*');
                })
                .finally(() => dispatch(hideLoader()));
        } else {
            navigate('*');
        }

    }, [userId]);

    return (
        <>
            {loading && <Loader />}
            <div className="py-10">
                <Container>
                    <h1 className="text-3xl font-bold text-center mb-6 uppercase">My Posts</h1>
                    {posts.length > 0 ? (
                        <div className="flex flex-wrap">
                            {posts.map((post) => (
                                <div key={post.$id} className="p-2 w-1/2 md:w-1/3">
                                    <PostCard {...post} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-400">You haven't created any posts yet.</p>
                    )}
                </Container>
            </div>
        </>
    );
}
