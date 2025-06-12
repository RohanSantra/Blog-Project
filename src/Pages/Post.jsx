import React, { useEffect, useState, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import parse from "html-react-parser";
import { Edit, Trash2, Image as ImageIcon, Type, MessageSquareText } from "lucide-react";
import service from "../Appwrite/config";
import { Button, Container, Loader } from "../components";
import { hideLoader, showLoader } from "../Store/loaderSlice";
import { deleteFile, deletePost, fetchPost } from "../Store/postSlice";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, error } = useSelector((state) => state.posts);
    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = useMemo(() => {
        return post && userData && post.userId === userData.$id;
    }, [post, userData]);

    useEffect(() => {
        if (!slug) {
            navigate("/");
            return;
        }

        const fetchSinglePost = async () => {
            try {
                const resultAction = await dispatch(fetchPost(slug));
                if (fetchPost.fulfilled.match(resultAction)) {
                    setPost(resultAction.payload);
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
    }, [slug, dispatch, navigate]);


    const handleDeletePost = async () => {
        if (!post) return;

        try {
            // Step 1: Delete the post
            const resultAction = await dispatch(deletePost(post.$id));

            if (deletePost.fulfilled.match(resultAction)) {
                // Step 2: Delete the associated file separately
                await dispatch(deleteFile(post.featuredImage));
                navigate('/');
            }
        } catch (error) {
            console.error("Unexpected error:", error);

        }
    };

    if (error) console.log(error);
    if (loading) return <Loader />;

    return post && (
        <div className="py-8 px-4">
            <Container>
                {/* Image Section */}
                <div className="mb-6">
                    <h2 className="flex items-center gap-2 text-lg font-semibold text-white/80 uppercase mb-2">
                        <ImageIcon className="w-5 h-5 text-white/60" /> Image
                    </h2>
                    <div className="w-full flex justify-center relative border border-white/10 rounded-xl p-2 bg-[#1a1a1a] shadow-md">
                        <img
                            src={service.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-xl  w-full object-cover"
                        />
                        {isAuthor && (
                            <div className="absolute right-4 top-4 flex gap-2">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button
                                        bgColor="bg-green-600"
                                        className="flex items-center gap-1 text-white"
                                    >
                                        <Edit className="w-4 h-4" /> Edit
                                    </Button>
                                </Link>
                                <Button
                                    bgColor="bg-red-600"
                                    onClick={handleDeletePost}
                                    className="flex items-center gap-1 text-white"
                                >
                                    <Trash2 className="w-4 h-4" /> Delete
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Title Section */}
                <div className="w-full mb-6">
                    <h2 className="flex items-center gap-2 text-lg font-semibold text-white/80 uppercase mb-2">
                        <Type className="w-5 h-5 text-white/60" /> Title
                    </h2>
                    <h1 className="text-3xl bg-[#111] p-4 border border-white/10 rounded-md shadow-inner text-white">
                        {post.title}
                    </h1>
                </div>

                {/* Content */}
                <h2 className="flex items-center gap-2 text-lg font-semibold text-white/80 uppercase mb-2">
                    <MessageSquareText className="w-5 h-5 text-white/60" /> Message
                </h2>
                <div className="browser-css bg-[#111] text-white p-4 border border-white/10 rounded-md shadow-inner prose prose-invert max-w-none">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    )
}
