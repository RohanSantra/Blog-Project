import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, PostCard, Loader } from '../components';
import { fetchUserPosts } from '../Store/postSlice';
import { FilePlus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { hideLoader, showLoader } from '../Store/loaderSlice';

export default function MyPosts() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userData, status } = useSelector((state) => state.auth);
    // const loading = useSelector((state) => state.loader.loading);
    const { loading, error } = useSelector((state) => state.posts);

    const [userPost, setUserPost] = useState([]);
    const userId = userData?.$id;


    useEffect(() => {
        if (status && userData?.$id) {
            const fetchAllUserPost = async () => {
                const resultAction = await dispatch(fetchUserPosts(userData.$id));
                if (fetchUserPosts.fulfilled.match(resultAction)) {
                    setUserPost(resultAction.payload);
                }
            };
            fetchAllUserPost();
        }
    }, [dispatch, userData?.$id, status]);

    if (loading) return <Loader />;
    if (error) console.error(error);

    return (
        <div className="py-10">
            <Container>
                {userPost.length > 0 ? (
                    <>
                        <h1 className="text-3xl font-bold text-center mb-6 uppercase">My Posts</h1>
                        <div className="flex flex-wrap">
                            {userPost.map((post) => (
                                <div key={post.$id} className="px-4 py-2 w-full sm:w-1/2 md:w-1/3">
                                    <PostCard {...post} />
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="min-h-[80vh] w-full flex items-center justify-center bg-gray-950 text-gray-100 px-4 py-12">
                        <div className="text-center w-full max-w-md">
                            <div className="mb-6 flex justify-center">
                                <FilePlus className="w-32 h-32 text-yellow-500 animate-bounce" />
                            </div>
                            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-white">
                                You haven't created any posts yet.
                            </h2>
                            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
                                <Link
                                    to="/add-post"
                                    className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition duration-200"
                                >
                                    <FilePlus className="w-5 h-5" />
                                    Add Post
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </Container>
        </div>
    );
}
