import React, { useEffect, useState } from 'react'
import service from '../Appwrite/config'
import { Container, Loader, PostCard } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoader, showLoader } from '../Store/loaderSlice'

function Home() {
    const [posts, setPosts] = useState([])
    const [msg, setMsg] = useState('');
    const status = useSelector((state) => state.auth.status);
    const loading = useSelector((state) => state.loader.loading);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(showLoader())
        service.getPosts()
            .then((posts) => {
                if (posts) {
                    setPosts(posts.documents)
                }
                // TO display msg
                if (status) {
                    if (posts.length <= 0) {
                        setMsg('Start By Adding your post');
                    } else {
                        setMsg('');
                    }
                } else {
                    setMsg('Login to read posts');
                }
            })
            .catch((error) => {
                console.log("Something went wrong :", error);
            })
            .finally(() => dispatch(hideLoader()))
    }, [])


    return (
        <>
            {loading && <Loader />}
            {status ? (
                <div className='w-full py-8'>
                    <Container>
                        <div className='flex flex-wrap'>
                            {posts.map((post) => (
                                <div key={post.$id} className='p-2 w-1/2 md:w-1/3'>
                                    <PostCard {...post} />
                                </div>
                            ))}
                        </div>
                    </Container>
                </div>
            ) : (
                <>
                    {loading && <Loader />}
                    <div className="w-full py-32 mt-4 text-center">
                        <Container>
                            <div className="flex flex-wrap">
                                <div className="p-2 w-full uppercase">
                                    <h1 className="text-2xl font-bold hover:text-gray-300">{msg}</h1>
                                </div>
                            </div>
                        </Container>
                    </div>
                </>
            )}
        </>
    );

}

export default Home