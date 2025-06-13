import React, { useEffect, useState } from 'react';
import { Container, Loader, PostCard, MessageDisplay } from '../components/index';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../Store/postSlice';

function Home() {
    const dispatch = useDispatch();
    const [msg, setmsg] = useState('');
    const [showLogin, setshowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);

    const { posts, loading, error } = useSelector((state) => state.posts);
    const status = useSelector((state) => state.auth.status);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);


    useEffect(() => {
        if (!status) {
            setmsg('Login to read posts')
            setShowSignup(true);
            setshowLogin(true);
        } else {
            setShowSignup(false);
            setshowLogin(false);
            if (posts.length <= 0) {
                setmsg('Start By Adding your post');
            }
            else {
                setmsg('');
            }
        }
    }, [status, posts])


    if (error) console.log(error);
    if (loading) return <Loader />;

    return (
        <div className='w-full py-8'>
            <Container>
                {status ? (
                    <div className='flex flex-wrap'>
                        {posts.map((post) => (
                            <div key={post.$id} className='px-4 py-2 w-full sm:w-1/2 md:w-1/3'>
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                ) :
                    <MessageDisplay
                        msg={msg}
                        showLogin={showLogin}
                        showSignup={showSignup}
                    />
                }
            </Container>
        </div>
    );
}

export default Home;
