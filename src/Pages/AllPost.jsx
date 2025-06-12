import { useEffect, useId, useState } from "react";
import { Container, Loader, PostCard } from "../components/index"
import { useDispatch, useSelector } from "react-redux";
import { hideLoader, showLoader } from "../Store/loaderSlice";
import { fetchPosts } from "../Store/postSlice";


export default function AllPost() {
    const { posts, loading, error } = useSelector((state) => state.posts);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch])

    if (error) console.log(error);
    if (loading) return <Loader />

    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post) => (
                        <div className="px-4 py-2 w-ful sm:w-1/2 md:w-1/3" key={post.$id}>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}
