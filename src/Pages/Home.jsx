import React, { useEffect } from 'react';
import { Container, Loader, PostCard } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../Store/postSlice';

function Home() {
    const dispatch = useDispatch();

    const { posts, loading, error } = useSelector((state) => state.posts);
    const status = useSelector((state) => state.auth.status);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    const msg = !status
        ? 'Login to read posts'
        : posts.length <= 0
            ? 'Start By Adding your post'
            : '';

    if (error) console.log(error);
    if (loading) return <Loader />;

    return (
        <div className='w-full py-8'>
            <Container>
                {status ? (
                    <div className='flex flex-wrap'>
                        {posts.map((post) => (
                            <div key={post.$id} className='px-4 py-2 w-ful sm:w-1/2 md:w-1/3'>
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                ) :
                    (

                        <div className="w-full py-32 mt-4 text-center">
                            <h1 className="text-2xl font-bold uppercase hover:text-gray-300">{msg}</h1>
                        </div>
                    )
                }
            </Container>
        </div>
    );
}

export default Home;
