import { useEffect, useState } from "react"
import { Container, Loader, PostForm } from "../components/index"
import service from "../Appwrite/config"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { hideLoader, showLoader } from "../Store/loaderSlice"
export default function EditPost() {
    const [post, setPost] = useState(null)
    const { slug } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.loader.loading)

    useEffect(() => {
        dispatch(showLoader())
        if (slug) {
            service.getPost(slug)
                .then((post) => {
                    if (post) {
                        setPost(post);
                    }

                })
                .catch((error) => {
                    console.log("Something went wrong : ", error)
                    navigate('*');
                })
                .finally(() => dispatch(hideLoader()))
        } else {
            navigate('/')
        }
    }, [slug, navigate])

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
