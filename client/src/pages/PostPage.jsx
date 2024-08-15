import { Button, Spinner } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import CommentSection from '../components/CommentSection';
import PostCard from '../components/PostCard';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';

function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);
  const { currentUser } = useSelector(state => state.user);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setError(false);
          setLoading(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?limit=3`);
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        } else {
          console.error("Failed to fetch posts:", data.message);
        }
      } catch (error) {
        console.error("Error fetching posts:", error.message);
      }
    };
    fetchRecentPosts();
  }, []);

  if (loading) return (
    <div className='flex justify-center items-center min-h-screen'>
      <Spinner size='xl'></Spinner>
    </div>
  );

  return (
    <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
      <Helmet>
        <title>{post ? post.title : "Post"} | POSTIFY</title>
        <meta name="description" content={post ? post.excerpt : "Read the latest posts on POSTIFY"} />
        <meta name="keywords" content="blog, blog post, blog post examples, POSTIFY, how to write a blog post, blog post example" />
      </Helmet>
      
      <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
        {post && post.title}
      </h1>
      <Link
        to={`/search?category=${post && post.category}`}
        className='self-center mt-5'
      >
        <Button color='gray' pill size='xs'>
          {post && post.category}
        </Button>
      </Link>
      <img src={post && post.image} alt={post && post.title} className='mt-10 p-3 max-h-[600px] w-full object-cover'/>
      <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className='italic'>{post && (post.content.length / 1000).toFixed(0)} mins read</span>
      </div>
      <div className='p-3 max-w-2xl mx-auto w-full post-content' dangerouslySetInnerHTML={{__html: post && post.content}}></div>
      <div className='max-w-4xl mx-auto w-full'>
        {currentUser && !currentUser.isAdmin && !currentUser?.isSub && (
          <div className=" p-3 bg-amber-100 dark:bg-slate-700">
            <CallToAction />
          </div>
        )}
        {currentUser?.isSub && (
          <div className=" border-t-2 items-center w-10/12 grid-cols-2 mx-auto overflow-x-hidden lg:grid md:py-14 lg:py-24 xl:py-14 lg:mt-3 xl:mt-5" data-aos="fade-right" data-aos-duration="800">
            <div className="pr-2 md:mb-14 py-14 md:py-0">
              <h1 className="text-3xl font-semibold text-blue-900 xl:text-5xl lg:text-3xl"><span className="block w-full">Get More Traffic</span> for growing your business!</h1>
              <p className="py-4 text-lg text-gray-500 2xl:py-8 md:py-6 2xl:pr-5">
                Post Posts and Start showing your products to World
              </p>
            </div>
            <div className="pb-10 overflow-hidden md:p-10 lg:p-0 sm:pb-0">
              <img id="heroImg1" className="transition-all duration-300 ease-in-out hover:scale-105 lg:w-full sm:mx-auto sm:w-4/6 sm:pb-12 lg:pb-0" src="https://bootstrapmade.com/demo/templates/FlexStart/assets/img/hero-img.png" alt="Awesome hero page image" width="500" height="488"/>
            </div>
          </div>
        )}
        <CommentSection postId={post._id} />
        <div className="flex flex-col items-center mb-5">
          <h1 className='text-xl mt-5 font-semibold'>Recent Articles</h1>
          <div className="flex flex-row gap-4 mt-5 justify-center son">
            {recentPosts && recentPosts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default PostPage;
