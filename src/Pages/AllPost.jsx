import { useEffect, useId, useState } from "react";
import service from "../Appwrite/config"
import { Container, Loader, PostCard } from "../components/index"
import { useDispatch, useSelector } from "react-redux";
import { hideLoader, showLoader } from "../Store/loaderSlice";
export default function AllPost() {
    const [posts, setPosts] = useState([])
    const loading = useSelector((state) => state.loader.loading)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(showLoader())
        service.getPosts()
            .then((posts) => {
                if (posts) {
                    setPosts(posts.documents)
                }
            })
            .catch((err) => {
                console.error("Failed to load posts:", err);
            })
            .finally(() => dispatch(hideLoader()))
    }, [])

    return (
        <>
            {loading && <Loader />}
            <div className="w-full py-8">
                <Container>
                    <div className="flex flex-wrap">
                        {posts.map((post) => (
                            <div className="p-2 w-1/2 md:w-1/3" key={post.$id}>
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
        </>
    )
}
