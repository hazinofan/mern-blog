import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux'
import { FaHeart } from "react-icons/fa";

export default function Comment({ comment, onLike }) {
    const [user, setUser] = useState({});
    const { currentUser } = useSelector(state => state.user)

    useEffect(() => {
        if (comment && comment.userId) {
            const getUser = async () => {
                try {
                    const res = await fetch(`/api/user/${comment.userId}`);
                    const data = await res.json();
                    if (res.ok) {
                        setUser(data);
                    }
                } catch (error) {
                    console.log(error.message);
                }
            };
            getUser();
        }
    }, [comment]);
    

    return (
        <div>
    <div className="flex p-5 items-center gap-2 text-sm border-b dark:border-gray-600">
        <div className="w-10 h-10">
            <img className='rounded-full' src={user.ProfilPicture} alt={user.username} />
        </div>
        <div>
            <div className=' mb-2'>
                {user && user.username ? (
                    <span className='font-bold mr-3 text-xs truncate'>@{user.username}</span>
                ) : (
                    <span>anonymous user</span>
                )}
                {comment.createdAt && (
                    <span className='text-gray-500 text-xs'>{moment(comment.createdAt).fromNow()}</span>
                )}
            </div>
            <p className="text-gray-500 mb-2">{comment.content}</p>
            <div className="flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2">
            <button type='button' className={`text-gray-400 hover:text-red-500
            transition-colors duration-300 ease-in-out ${currentUser && comment.likes.includes(currentUser._id) && ' !text-red-600'}` } onClick={() => onLike(comment._id)}>
                <FaHeart className='text-sm'/>
                </button>
                <p className='text-gray-400'>
                    {
                        comment.numberOfLikes > 0 && comment.numberOfLikes + " " + (Comment.numberOfLikes === 1 ? 'Likes' : "Like" )
                    }
                </p>
            </div>
            </div>
        </div>
    </div>


    );
}
