import { Button, Modal, Table, TableHead, TableHeadCell } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { HiOutlineExclamationCircle } from "react-icons/hi";


function DashSubComments() {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState('');

  useEffect(() => {
    async function fetchComments() {
        try {
            const userId = currentUser._id;
            const res = await fetch(`/api/comment/getuserComments?userId=${userId}`);
            const data = await res.json();
            if (res.ok) {
                setComments(data.comments);
                if (data.comments.length < 9) {
                    setShowMore(false);
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    if(currentUser.isSub) {
        fetchComments(); 
    }
}, [currentUser._id, currentUser.isSub]);


  async function handleShowMore() {
    const startIndex = comments.length;
    try {
      const res = await fetch(
        `/api/comment/getuserComments?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setComments((prev) => [...prev, ...data.comments]);
        if (data.comments.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleDeleteComment = async () => {
    try {
        const res = await fetch(`/api/comment/deleteComment/${commentIdToDelete}`, {
            method: 'DELETE',
        });
        const data = await res.json();
        if (res.ok) {
            setComments((prev) => prev.filter((comment) => comment._id !== commentIdToDelete));
            setShowModal(false);
        } else {
            console.log(data.message);
        }
    } catch (error) {
        console.log(error.message);
    }
  };

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.isSub && comments.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <TableHead>
              <TableHeadCell>Comment Content</TableHeadCell>
              <TableHeadCell>Number of Likes</TableHeadCell>
              <TableHeadCell>Date Updated</TableHeadCell>
              <TableHeadCell>Action</TableHeadCell>
            </TableHead>
            {comments.map((comment) => {
              return(
                <Table.Body key={comment._id} className=' divide-y'>
                  <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell>
                      {comment.content}
                    </Table.Cell>
                    <Table.Cell>{comment.NumberOfLikes}</Table.Cell>
                    <Table.Cell>{new Date(comment.updatedAt).toLocaleDateString()}</Table.Cell>
                    <Table.Cell>
                      <span onClick={() => {
                        setShowModal(true)
                        setCommentIdToDelete(comment._id);
                      }} className='font-medium text-red-500 hover:underline cursor-pointer'>
                        Delete 
                      </span>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              )
            })}
          </Table>
          { showMore && (
            <button onClick={handleShowMore} className='w-full text-teal-500 self-center text-sm py-7'> show more </button>
          )}
        </>
      ) : (
        <p>You have no Comments Yet !</p>
      )}
      <Modal show={showModal} onClose={()=>setShowModal(false)} popup size='md'>
            <Modal.Header />
              <Modal.Body>
                <div className="text-center">
                <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:tex-gray-200 mb-4 mx-auto' />
                <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400"> Are you sure You want to delete This Post ? </h3>
                <div className="flex justify-center gap-4">
                  <Button color='failure' onClick={handleDeleteComment}>Yes i'm sure </Button>
                  <Button color='gray' onClick={()=> setShowModal(false)}>No , Cancel </Button>
                </div>
                </div>
              </Modal.Body>   
         </Modal>
    </div>
  );
}

export default DashSubComments;
