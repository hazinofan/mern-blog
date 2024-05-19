import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { HiArrowNarrowUp, HiDocumentText } from "react-icons/hi";
import { LiaCommentSolid } from 'react-icons/lia';
import { Button, Table } from 'flowbite-react';
import { Link } from 'react-router-dom';

function DashSubscriber() {
    const [users, setUsers] = useState([]);
    const [comments, setComments] = useState([]);
    const [posts, setPosts] = useState([]);
    const [totalPosts, setTotalPosts] = useState(0);
    const [totalComments, setTotalComments] = useState(0);
    const [lastMonthComments, setLastMonthComments] = useState(0);
    const [lastMonthPosts, setLastMonthPosts] = useState(0);
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const userId = currentUser._id; // Get the currently authenticated user's ID
        
                const res = await fetch(`/api/post/getuserposts?userId=${userId}&limit=5`);
                const data = await res.json();
                
                if (res.ok) {
                    setPosts(data.posts);
                    setTotalPosts(data.totalPosts);
                    setLastMonthPosts(data.lastMonthPosts);
                } else {
                    console.error(data.message); // Log error message if request fails
                }
            } catch (error) {
                console.error(error.message); // Log any other errors
            }
        };
        
        const fetchComments = async () => {
            try {
                const userId = currentUser._id; // Ensure userId is defined
                const res = await fetch(`/api/comment/getuserComments?userId=${userId}&limit=5`);
                const data = await res.json();
                if (res.ok) {
                    setComments(data.comments);
                    setTotalComments(data.totalComments);
                    setLastMonthComments(data.lastMonthComments);
                }
            } catch (error) {
                console.log(error.message);
            }
        };

        if (currentUser.isSub) {
            fetchComments();
            fetchPosts();
        }
    }, [currentUser]);

    return (
        <div className='p-3 md:mx-auto'>
            <div className="flex-wrap flex gap-4 justify-center">

                <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
                    <div className="flex justify-between">
                        <div>
                            <h3 className="text-gray-500 text-md uppercase">Total Comments</h3>
                            <p className="text-2xl">{totalComments}</p>
                        </div>
                        <LiaCommentSolid className='bg-teal-500 text-white rounded-full text-5xl p-3 shadow-lg' />
                    </div>
                    <div className="flex gap-2 text-sm">
                        <span className='text-green-500 flex items-center'>
                            <HiArrowNarrowUp />
                            {lastMonthComments}
                        </span>
                        <div className="text-gray-500">Last Month</div>
                    </div>
                </div>

                <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
                    <div className="flex justify-between">
                        <div>
                            <h3 className="text-gray-500 text-md uppercase">Total Posts</h3>
                            <p className="text-2xl">{totalPosts}</p> {/* Display the total posts */}
                        </div>
                        <HiDocumentText className='bg-teal-500 text-white rounded-full text-5xl p-3 shadow-lg' />
                    </div>
                    <div className="flex gap-2 text-sm">
                        <span className='text-green-500 flex items-center'>
                            <HiArrowNarrowUp />
                            {lastMonthPosts}
                        </span>
                        <div className="text-gray-500">Last Month</div>
                    </div>
                </div>
            </div>
            
            <div className="flex-wrap flex gap-4 justify-center mt-8">

                <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
                    <div className="flex justify-between p-3 text-sm font-semibold">
                        <h1 className="text-center p-2">Recent Comments</h1>
                        <Link to={"/dashboard?tab=comments"}>
                            <Button gradientDuoTone='purpleToPink' outline>
                                See All
                            </Button>
                        </Link>
                    </div>
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell>Comment Content</Table.HeadCell>
                            <Table.HeadCell>Likes</Table.HeadCell>
                        </Table.Head>
                        {comments.map((comment) => (
                            <Table.Body key={comment._id} className='divide-y'>
                                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                    <Table.Cell>
                                        <p className='line-clamp-2'>{comment.content}</p>
                                    </Table.Cell>
                                    <Table.Cell>
                                        {comment.NumberOfLikes}
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        ))}
                    </Table>
                </div>

                <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
                    <div className="flex justify-between p-3 text-sm font-semibold">
                        <h1 className="text-center p-2">Recent Posts</h1>
                        <Link to={"/dashboard?tab=posts"}>
                            <Button gradientDuoTone='purpleToPink' outline>
                                See All
                            </Button>
                        </Link>
                    </div>
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell>Post Image</Table.HeadCell>
                            <Table.HeadCell>Post Title</Table.HeadCell>
                            <Table.HeadCell>Category</Table.HeadCell>
                        </Table.Head>
                        {posts.map((post) => (
                            <Table.Body key={post._id} className='divide-y'>
                                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                    <Table.Cell>
                                        <img
                                            src={post.image}
                                            alt="post"
                                            className='w-60 h-20 rounded-md bg-gray-500 object-cover'
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <p>{post.title}</p>
                                    </Table.Cell>
                                    <Table.Cell>
                                        {post.category}
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        ))}
                    </Table>
                </div>
            </div>
        </div>
    );
}

export default DashSubscriber;
