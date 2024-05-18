import { FaArrowRight } from "react-icons/fa6";
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CallToAction from '../components/CallToAction'
import PostCard from '../components/PostCard'

function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getposts');
      const data = await res.json();
      setPosts(data.posts)
    }
    fetchPosts()
  }, [])
  return (
    <div>
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className='text-3xl font-bold lg:text-6xl'> Welcome To POSTIFY </h1>
        <p className='text-gray-500 text-xs sm:text-sm'>
          Explore a diverse array of blogs covering a wide range of topics and categories. 
          Our platform allows you to search for and discover valuable information, as well as insights 
          into various businesses and reviews from people. Whether you're looking for in-depth articles or quick reads, 
          you'll find everything you need right here.
        </p>
      <Link to="/search" className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'>View All Posts</Link>
      </div>
      <div className=" p-3 bg-amber-100 dark:bg-slate-700">
        <CallToAction />
      </div>

      <div className="max-w-5xl mx-auto p-3 flex flex-col gap-8 py-7">
        {
          posts && posts.length > 0 && (
            <div className="">
              <h2 className="text-2xl font-semibold text-center"> Recent Posts</h2>
              <div className="flex flex-wrap gap-4">
                {posts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
            </div>
          )
        }
      <Link to="/search" className='flex items-center gap-2 text-3xl sm:text-sm text-teal-500 font-bold hover:underline'> View All Posts <FaArrowRight /> </Link>
      </div>
    </div>
  )
}

export default Home