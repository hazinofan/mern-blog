import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux'
import { FaHeart } from "react-icons/fa";
import { Button, Textarea } from 'flowbite-react';

export default function Comment({ comment, onLike, onEdit }) {
    const [user, setUser] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(comment.content)
    const { currentUser } = useSelector(state => state.user)

    useEffect(() => {
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
      }, [comment]);
    
    function handleEdit() {
        setIsEditing(true)
        setEditedContent(comment.content)
    }

    const handleSave = async () => {
        try {
          const res = await fetch(`/api/comment/editComment/${comment._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              content: editedContent,
            }),
          });
          if (res.ok) {
            setIsEditing(false);
            onEdit(comment, editedContent);
          }
        } catch (error) {
          console.log(error.message);
        }
      };

    return (
        <div>
    <div className="flex p-5 items-center gap-4 text-sm border-b dark:border-gray-600">
        <div className="w-10 h-10">
            <img className='rounded-full' src={user.ProfilPicture} alt={user.username} />
        </div>
        <div className=' w-full'>
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
            

            { isEditing ? (
                <>
                <Textarea
                className='mb-2'
                rows='2'
                value={editedContent}
                maxLength='200' 
                onChange={(e) => setEditedContent(e.target.value)}/>
                <div className="flex justify-end gap-2 text-sm">
                <Button
                className=''
                type='button'
                gradientDuoTone='purpleToBlue'
                outline
                onClick={handleSave}
                >
                    Save
                </Button>
                <Button
                className=''
                type='button'
                gradientDuoTone='purpleToBlue'
                onClick={()=>setIsEditing(false)}
                >
                    Cancel
                </Button>
                </div>
            </>
            ) : (
                <>
            <p className='text-gray-500 pb-2'>{comment.content}</p>
            <div className="flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2">
            <button type='button' className={`text-gray-400 hover:text-red-500
            transition-colors duration-300 ease-in-out ${currentUser && comment.likes.includes(currentUser._id) && ' !text-red-600'}` } onClick={() => onLike(comment._id)}>
                <FaHeart className='text-sm'/>
                </button>
                <p className='text-gray-400'>
                    {
                        comment.numberOfLikes > 0 && comment.numberOfLikes + " " + (Comment.numberOfLikes === 1 ? 'Likes' : "Likes" )
                    }
                </p>
                { currentUser && ( currentUser._id === comment.userId || currentUser.isAdmin ) && (
                    <button type='button' className=' text-gray-400 hover:text-blue-500' onClick={handleEdit}> Edit </button>
                )}
            </div>
            </>
            )}
            </div>
        </div>
    </div>


    );
}
