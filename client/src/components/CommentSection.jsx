import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Alert, Button, TextInput, Textarea } from 'flowbite-react'

function CommentSection({postId}) {
    const[comment, setComment] = useState('')
    const[commentError, setCommentError] = useState('')
    const {currentUser} = useSelector(state => state.user)

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (comment.length > 200) {
          return;
        }
        try {
          const res = await fetch('/api/comment/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              content: comment,
              postId,
              userId: currentUser._id,
            }),
          });
          const data = await res.json();
          if (res.ok) {
            setComment('');
            setCommentError(null);
            setComments([data, ...comments]);
          }
        } catch (error) {
          setCommentError(error.message);
        }
      };
  return (
    <div className='max-w-2xll mx-auto w-full p-3'>
        {currentUser ? 
        (
            <div className='flex items-center gap-1 text-gray-500 text-sm my-5'>
                <p> Signed in as : </p>
                <Link to={'/Dashboard?tab=profile'} className='text-xs text-cyan-600 hover:underline'>
                    @{currentUser.username}
                </Link>
            </div>
        ) : (
            <div className='text-sm text-teal-500 my-5 flex gap-1'>
                You Must be logged in to be able to comment 
                <Link to={'/SignIn'} className=' text-blue-500 ml-2'>
                    Sign In 
                </Link>
            </div>
        )}
        { currentUser && (
            <form className='border border-teal-500 rounded-md p-3' onSubmit={handleSubmit}>
                <Textarea
                placeholder='Add a comment'
                rows='3'
                maxLength='200' 
                onChange={(e) => setComment(e.target.value)}/>
                <div className="flex justify-between items-center mt-5">
                    <p className=' text-gray-500 text-xs'> {200 - comment.length} characters remaining  </p>
                    <Button outline gradientDuoTone='purpleToBlue' type='submit'> Submit </Button>
                </div> 
                {commentError && (
                    <Alert color="failure" className=' mt-3' > { commentError} </Alert>
                )}
            </form>
        )}
    </div>
  )
}

export default CommentSection