import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';

export default function Comment({ comment }) {
    const [user, setUser] = useState({});
    // const { currentUser } = useSelector( state )
    console.log(user);

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
            </div>
        </div>
    </div>


    );
}
