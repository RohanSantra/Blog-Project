import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../Appwrite/config";
import { Button, Container, Loader } from "../components";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { hideLoader, showLoader } from "../Store/loaderSlice";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const loading = useSelector((state) => state.loader.loading);
    const dispatch = useDispatch();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            dispatch(showLoader())
            service.getPost(slug)
                .then((post) => {
                    if (post) setPost(post);
                    else navigate("/");
                })
                .catch((error) =>{ 
                    console.log("Something went Wrong : ", error)
                    navigate("*")
                })
                .finally(() => dispatch(hideLoader()))
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        dispatch(showLoader());
        service.deletePost(post.$id)
            .then((status) => {
                if (status) {
                    service.deleteFile(post.featuredImage);
                    navigate("/");
                }
            })
            .catch((error) => {
                console.log('Something went wrong:', error);
            })
            .finally(() => dispatch(hideLoader()));;
    };

    return post && (
        <div className="py-8">
            {loading && <Loader />}
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={service.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3 cursor-pointer">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost} className="cursor-pointer">
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    )
}