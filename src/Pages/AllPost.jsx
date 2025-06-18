import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Loader, PostCard } from "../components";
import { fetchPosts } from "../Store/postSlice";
import { Globe2 } from "lucide-react";

export default function AllPost() {
    const { posts, loading, error } = useSelector((state) => state.posts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPosts());

        // To handle scroll position
        const storedPosition = sessionStorage.getItem("my-post-scroll");
        if (storedPosition) {
            window.scrollTo({ top: parseInt(storedPosition), behavior: 'auto' });
            sessionStorage.removeItem("my-post-scroll");
        }
    }, [dispatch]);

    if (error) console.error(error);
    if (loading) return <Loader />;

    return (
        <div className="relative overflow-hidden py-8 px-4">
            {/* 🔹 Top-left fading grid */}
            <div className="absolute top-0 left-0 w-48 lg:w-70 h-48 lg:h-70 
    [--color:rgba(114,114,114,0.3)]
    [background-image:radial-gradient(rgba(255,255,255,0.171)_2px,transparent_0)]
    [background-size:30px_30px]
    [mask-image:radial-gradient(circle_at_top_left,white,transparent)]
    [mask-size:100%_100%]
    [mask-repeat:no-repeat]
    pointer-events-none">
            </div>

            {/* 🔹 Top-right fading grid */}
            <div className="absolute top-0 right-0 w-48 lg:w-70 h-48 lg:h-70
    [--color:rgba(114,114,114,0.3)]
    [background-image:radial-gradient(rgba(255,255,255,0.171)_2px,transparent_0)]
    [background-size:30px_30px]
    [mask-image:radial-gradient(circle_at_top_right,white,transparent)]
    [mask-size:100%_100%]
    [mask-repeat:no-repeat]
    pointer-events-none">
            </div>


            {/* Header Section */}
            <div className="relative z-10 text-center px-4 py-20">
                <div className="inline-flex items-center gap-2 bg-emerald-500/10 px-4 py-2 rounded-full mb-4">
                    <Globe2 className="w-6 h-6 text-emerald-400" />
                    <span className="font-medium">Browse All Posts</span>
                </div>
                <h1 className="text-4xl font-extrabold mb-4">All Published Posts</h1>
                <p className="text-lg text-gray-300">Dive into content created by the community.</p>
            </div>

            {/* Post Grid */}
            <Container className="relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <PostCard key={post.$id} {...post} />
                    ))}
                </div>
            </Container>
        </div>
    );
}
