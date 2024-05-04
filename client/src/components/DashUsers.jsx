import { Button, Modal, Table, TableHead, TableHeadCell } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";


function DashUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState('');

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch(`/api/user/getusers`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          if (data.users.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    }

    if(currentUser.isAdmin) {
      fetchUsers(); 
    }
  }, [currentUser._id]);

  async function handleShowMore() {
    const startIndex = users.length;
    try {
      const res = await fetch(
        `/api/user/getusers?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && users.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <TableHead>
              <TableHeadCell>Profile Picture</TableHeadCell>
              <TableHeadCell>Username</TableHeadCell>
              <TableHeadCell>Email</TableHeadCell>
              <TableHeadCell>Admin</TableHeadCell>
              <TableHeadCell>Date Created</TableHeadCell>
              <TableHeadCell>Action</TableHeadCell>
            </TableHead>
            {users.map((user) => {
              return(
                <Table.Body key={user._id} className=' divide-y'>
                  <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell>
                      <img 
                        src={user.ProfilPicture} 
                        alt={user.username}
                        className='w-20 rounded-lg h-10 object-cover bg-gray-500' />
                    </Table.Cell>
                    <Table.Cell>{user.username}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>{user.isAdmin ? (<FaCheck className='  text-green-500'/>) : (<FaTimes className=' text-red-500' /> )}</Table.Cell>
                    <Table.Cell>{new Date(user.createdAt).toLocaleDateString()}</Table.Cell>
                    <Table.Cell>
                      <span onClick={() => {
                        setShowModal(true)
                        setUserIdToDelete(user._id);
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
        <p>You have no Users Yet !</p>
      )}
      <Modal show={showModal} onClose={()=>setShowModal(false)} popup size='md'>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:tex-gray-200 mb-4 mx-auto' />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400"> Are you sure You want to delete This User ? </h3>
            <div className="flex justify-center gap-4">
              <Button color='failure'>Yes i'm sure </Button>
              <Button color='gray' onClick={()=> setShowModal(false)}>Yes i'm sure </Button>
            </div>
          </div>
        </Modal.Body>   
      </Modal>
    </div>
  );
}

export default DashUsers;
