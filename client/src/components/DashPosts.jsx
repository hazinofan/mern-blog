import { Button, Modal, Table, TableHead, TableHeadCell } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from "react-icons/hi";

function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState('');

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    }

    if(currentUser.isAdmin) {
      fetchPosts(); 
    }
  }, [currentUser._id]);

  async function handleShowMore() {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(
        `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async function handleDeletePost() {
    setShowModal(false)
    try {
      const res = await fetch(`/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,{
        method: 'DELETE',
      })
      const data = await res.json()
      if (!res.ok) {
        console.log(data.message)
      } else {
        setUserPosts((prev) =>
          prev.filter((post) => post._id !== postIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
              <TableHead>
                  <TableHeadCell>Date Updated</TableHeadCell>
                  <TableHeadCell>Post Image </TableHeadCell>
                  <TableHeadCell>Post Title </TableHeadCell>
                  <TableHeadCell>Category</TableHeadCell>
                  <TableHeadCell>Delete</TableHeadCell>
                  <TableHeadCell>
                    <span>Edit</span>
                  </TableHeadCell>
              </TableHead>
              {userPosts.map((post) => {
                return(
                <Table.Body key={post._id} className=' divide-y'>
                  <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>

                  <Table.Cell>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </Table.Cell>

                  <Table.Cell>
                    <Link to={`/post/${post.slug}`} >
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className='w-20 rounded-lg h-10 object-cover bg-gray-500' />
                    </Link>
                  </Table.Cell> 

                  <Table.Cell>
                    <Link className='font-medium text-gray-900 dark:text-white' to={`/post/${post.slug}`} >
                      {post.title}
                    </Link>
                  </Table.Cell> 

                  <Table.Cell>{post.category}</Table.Cell>
                  <Table.Cell>
                      <span onClick={() => {
                        setShowModal(true)
                        setPostIdToDelete(post._id);
                      }} className='font-medium text-red-500 hover:underline cursor-pointer'>
                         Delete 
                      </span>
                  </Table.Cell>

                  <Table.Cell>
                  <Link className='text-teal-500 hover:underline' to={`/update-post/${post._id}`}>
                    <span> Edit </span>
                    </Link>
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
          <p>You have no Posts Yet !</p>
      )}
      <Modal show={showModal} onClose={()=>setShowModal(false)} popup size='md'>
            <Modal.Header />
              <Modal.Body>
                <div className="text-center">
                <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:tex-gray-200 mb-4 mx-auto' />
                <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400"> Are you sure You want to delete This Post ? </h3>
                <div className="flex justify-center gap-4">
                  <Button color='failure' onClick={handleDeletePost}>Yes i'm sure </Button>
                  <Button color='gray' onClick={()=> setShowModal(false)}>Yes i'm sure </Button>
                </div>
                </div>
              </Modal.Body>   
         </Modal>
    </div>
  );
}

export default DashPosts;
