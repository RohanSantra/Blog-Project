import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, PostCard, Loader, MessageDisplay } from '../components';
import { fetchUserPosts } from '../Store/postSlice';
import { Cpu, Star, Clock, PlusCircle, FilePlus } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MyPosts() {
    const dispatch = useDispatch();
    const { userData, status } = useSelector((state) => state.auth);
    const { loading, error } = useSelector((state) => state.posts);
    const [userPost, setUserPost] = useState([]);

    useEffect(() => {
        if (status && userData?.$id) {
            const fetchAllUserPost = async () => {
                const resultAction = await dispatch(fetchUserPosts(userData.$id));
                if (fetchUserPosts.fulfilled.match(resultAction)) {

                    // To handle scroll position
                    const sortedPosts = resultAction.payload;
                    setUserPost(sortedPosts);
                    const storedPosition = sessionStorage.getItem("my-post-scroll");
                    if (storedPosition) {
                        window.scrollTo({ top: parseInt(storedPosition), behavior: 'auto' });
                        sessionStorage.removeItem("my-post-scroll");
                    }
                }
            };
            fetchAllUserPost();
        }
    }, [dispatch, userData?.$id, status]);


    if (loading) return <Loader />;
    if (error) console.error(error);

    const latest = [...userPost].splice(-1).reverse();

    return (
        <div className="relative overflow-hidden py-8 px-4 bg-gray-950 text-gray-50">
            {/* Background Grid */}
            <div className="absolute top-0 left-0 w-48 lg:w-70 h-48 lg:h-70 
      [--color:rgba(114,114,114,0.3)]
      [background-image:radial-gradient(rgba(255,255,255,0.171)_2px,transparent_0)]
      [background-size:30px_30px]
      [mask-image:radial-gradient(circle_at_top_left,white,transparent)]
      [mask-size:100%_100%]
      [mask-repeat:no-repeat]
      pointer-events-none" />

            <div className="absolute top-0 right-0 w-48 lg:w-70 h-48 lg:h-70 
      [--color:rgba(114,114,114,0.3)]
      [background-image:radial-gradient(rgba(255,255,255,0.171)_2px,transparent_0)]
      [background-size:30px_30px]
      [mask-image:radial-gradient(circle_at_top_right,white,transparent)]
      [mask-size:100%_100%]
      [mask-repeat:no-repeat]
      pointer-events-none" />


            <Container className="relative z-10 space-y-16">
                {userPost.length > 0 ? (
                    <>
                        {/* Hero Section */}
                        <div className="relative z-10 text-center px-4 py-20">
                            <div className="inline-flex items-center gap-2 bg-yellow-500/10 px-4 py-2 rounded-full mb-4">
                                <Cpu className="w-6 h-6 text-yellow-400" />
                                <span className="font-medium">Your Dashboard</span>
                            </div>
                            <h1 className="text-4xl font-extrabold mb-4">Your Posts</h1>
                            <p className="text-lg text-gray-300">View, manage, and grow your blog presence.</p>
                        </div>

                        {latest.length > 0 && (
                            <section>
                                <div className="flex items-center gap-2 my-6">
                                    <Clock className="w-5 h-5 text-emerald-400" />
                                    <h2 className="text-3xl font-semibold">Latest Posts</h2>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                    {latest.map((post) => (
                                        <PostCard key={post.$id} {...post} />
                                    ))}
                                </div>
                            </section>
                        )}

                        <div className="mt-12 text-center">
                            <Link to={'/add-post'} className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-gray-950 rounded-full hover:bg-emerald-400 transition">
                                <PlusCircle className="w-5 h-5" />
                                Add New Post
                            </Link>
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
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-gray-950 rounded-full hover:bg-emerald-400 transition"
                                >
                                    <PlusCircle className="w-5 h-5" />
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
