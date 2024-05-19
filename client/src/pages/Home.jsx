import { FaArrowRight } from "react-icons/fa6";
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CallToAction from '../components/CallToAction'
import PostCard from '../components/PostCard'
import { useSelector } from "react-redux";
import meeting from '../image/meeting.jpg'

function Home() {
  const [posts, setPosts] = useState([])
  const { currentUser } = useSelector(state=>state.user)

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
      {currentUser && !currentUser.isAdmin && !currentUser?.isSub && (
      <div className=" p-3 bg-amber-100 dark:bg-slate-700">
        <CallToAction />
      </div>
      )
      }
      {currentUser?.isSub && (
        <div className="relative font-[sans-serif] before:absolute before:w-full before:h-full before:inset-0 before:bg-black before:opacity-75 before:z-10">
        <img src="https://img.freepik.com/free-vector/woman-work-office-sitting-desk-with-computer_107791-2522.jpg?t=st=1716062436~exp=1716066036~hmac=ae136404026c02b570b8792a0b5e0ed2f4837d3084524a4c80c7c9e907330969&w=1800" alt="Banner Image" className="absolute inset-0 w-full h-full object-cover" />
        <div className="min-h-[300px] relative z-20 h-full max-w-6xl mx-auto flex flex-col justify-center items-center text-center text-white p-6">
          <h2 className="sm:text-4xl text-2xl font-bold mb-6">YOU ARE A POSTIFY MEMBER</h2>
          <p className="text-lg text-center text-gray-200">
            Welcome to the Postify family! As a valued member, you now have full access to our website, where you can create engaging posts,
            share your insights, and connect with other members. Explore the exclusive features in the members-only SuperSpace, where you'll
            discover a host of cool tools and resources designed to enhance your experience. Start sharing your voice and take advantage of
            everything Postify has to offer!
          </p>
          <Link to={'/dashboard?tab=dashsub'}
            className="mt-8 bg-transparent text-white text-base font-semibold py-2.5 px-6 border-2 border-white rounded hover:bg-white hover:text-black transition duration-300 ease-in-out">
            Members Super Space
          </Link>
        </div>
      </div>
      )}

      <div className="max-w-5xl mx-auto p-3 flex flex-col gap-8 py-7">
        {
          posts && posts.length > 0 && (
            <div className="">
              <h2 className="text-2xl font-semibold text-center mb-8 mt-14"> Recent Posts</h2>
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