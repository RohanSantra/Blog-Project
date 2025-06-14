import React, { useEffect, useState } from 'react';
import { Container, Loader, PostCard, MessageDisplay } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../Store/postSlice';
import { Cpu, Star, Clock, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

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
      setmsg('Login to read posts');
      setShowSignup(true);
      setshowLogin(true);
    } else {
      setShowSignup(false);
      setshowLogin(false);
      setmsg(posts.length ? '' : 'Start By Adding your post');
    }
  }, [status, posts]);

  if (error) console.error(error);
  if (loading) return <Loader />;

  const featured = posts.slice(0, 3); // First 3 posts 
  const latest = [...posts].slice(-3).reverse(); // Last 3 posts

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

      {/* <svg className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 opacity-10" width="600" height="600">
        <defs>
          <pattern id="lines" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0 L0 0 L0 20" stroke="#4ade80" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="600" height="600" fill="url(#lines)" />
      </svg> */}



      <Container className="relative z-10 space-y-16">
        {!status ? (
          <MessageDisplay msg={msg} showLogin={showLogin} showSignup={showSignup} />
        ) : (
          <>
            {/* Hero Section */}
            <div className="relative z-10 text-center px-4 py-20">
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 px-4 py-2 rounded-full mb-4">
                <Cpu className="w-6 h-6 text-emerald-400" />
                <span className="font-medium">Techie & Writer's Corner</span>
              </div>
              <h1 className="text-5xl font-extrabold mb-4">Welcome to Blog</h1>
              <p className="text-xl text-gray-300">Discover featured content, explore the latest, or write your own!</p>
            </div>

            {/* Featured Posts */}
            {featured.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-6">
                  <Star className="w-6 h-6 text-yellow-400" />
                  <h2 className="text-3xl font-semibold">Featured Posts</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {featured.map((post) => (
                    <PostCard key={post.$id} {...post} featured />
                  ))}
                </div>
              </section>
            )}

            {/* Latest Posts */}
            {latest.length > 0 && (
              <section>
                <div className="flex items-center gap-2 my-6">
                  <Clock className="w-5 h-5 text-emerald-400" />
                  <h2 className="text-3xl font-semibold">Latest Posts</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {latest.map((post) => (
                    <PostCard key={post.$id} {...post} />
                  ))}
                </div>
              </section>
            )}

            {/* Add New Post CTA */}
            <div className="mt-12 text-center">
              <Link to={'/add-post'} className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-gray-950 rounded-full hover:bg-emerald-400 transition">
                <PlusCircle className="w-5 h-5" />
                Add New Post
              </Link>
            </div>
          </>
        )}
      </Container>
    </div>
  );
}

export default Home;
