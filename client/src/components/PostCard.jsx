import React from 'react'
import { Link } from 'react-router-dom'

function PostCard({ post }) {
  return (
    <div 
    className='group relative w-full h-[300px] overflow-hidden
    rounded-lg sm:w-[250px] border border-teal-500 hover:border-2 transition-all'>
    <Link to={`/post/${post.slug}`}>
        <img src={post.image} alt="Post Cover" className='h-[180px] w-full object-cover group-hover:h-[140px] transition-all duration-300 z-20' />
        <div className="p-3 flex flex-col gap-2">
            <p className='text-md font-semibold'>{post.title}</p>
            <span className='italic text-sm'>{post.category}</span>
            <Link 
            className='z-10 group-hover:bottom-0 absolute bottom-[-140px]
            left-0 right-0 border border-teal-500 text-teal-500
            hover:bg-blue-400 hover:text-black transition-all
            duration-300 text-center py-2 rounded-md !rounded-tl-none m-2' to={`/post/${post.slug}`}>
                Read Article
            </Link>
        </div>
    </Link>
</div>
  )
}

export default PostCard