import { useEffect, useState } from "react"
import { Container, Loader, PostForm } from "../components/index"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchPost } from "../Store/postSlice"


export default function EditPost() {
    const [post, setPost] = useState(null)
    const { slug } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.posts)
    useEffect(() => {
        if (!slug) return

        const fetchSinglePost = async () => {
            try {
                const resultAction = await dispatch(fetchPost(slug));
                if (fetchPost.fulfilled.match(resultAction)) {
                    setPost(resultAction.payload)
                } else {
                    console.error("Failed to fetch post:", resultAction.payload);
                    navigate("*");
                }
            } catch (error) {
                console.error("Unexpected error:", error);
                navigate("*");
            }
        }

        fetchSinglePost();
    }, [slug, navigate])

    if (error) console.log(error);
    if (loading) return <Loader />;

    return !!post && (
        <>
            {loading && <Loader />}
            <div className="py-8">
                <Container>
                    <PostForm post={post} />
                </Container>
            </div>
        </>
    )
}
