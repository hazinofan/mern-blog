import { RiUserLocationLine } from "react-icons/ri";
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { HiArrowNarrowUp, HiDocumentText } from "react-icons/hi";
import { LiaCommentSolid } from 'react-icons/lia';
import { Button, Table } from 'flowbite-react';
import { Link } from 'react-router-dom';
import PostsCommentsChart from './PostsCommentChart';
import PostCommentsChart from './PostCommentsChart'

function DashSubscriber() {
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
                        <span className='dark:text-red-300 text-gray-900 flex items-center'>
                            Your Total Comments Appear Here
                        </span>
                    </div>
                </div>

                <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
                    <div className="flex justify-between">
                        <div>
                            <h3 className="text-gray-500 text-md uppercase">Total Posts</h3>
                            <p className="text-2xl">{totalPosts}</p>
                        </div>
                        <HiDocumentText className='bg-teal-500 text-white rounded-full text-5xl p-3 shadow-lg' />
                    </div>
                    <div className="flex gap-2 text-sm">
                    <div className="flex gap-2 text-sm">
                        <span className='dark:text-red-300 text-gray-900 flex items-center'>
                            Your Total Comments Appear Here
                        </span>
                    </div>
                    </div>
                </div>
            </div>
            <div className="flex-wrap flex gap-4 justify-center mt-8">
            <div className="responsive-container flex flex-wrap gap-3 shadow-md p-2 rounded-md dark:bg-gray-800">
                    <h1 className="text-center p-2 text-lg font-semibold"> Your Monthly Posts </h1>
                    <PostsCommentsChart totalPosts={totalPosts} totalComments={totalComments} />
                </div>
            <div className="responsive-container flex flex-wrap gap-3 shadow-md p-2 rounded-md dark:bg-gray-800">
                    <h1 className="text-center p-2 text-lg font-semibold"> Your Total Posts / Comments</h1>
                    <PostCommentsChart totalPosts={totalPosts} totalComments={totalComments} />
            </div>
            </div>
        
            <div className="grid gap-6 mb-8 md:grid-cols-1 xl:grid-cols-3 mt-7 mx-auto w-full max-w-7xl pr-6 pl-3">
            <div
                className="flex items-center p-4 bg-white rounded-lg shadow-sm ring ring-red-200 ring-opacity-50 dark:bg-gray-800 dark:ring-gray-50 dark:ring-opacity-0"
            >
                <div
                className="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500"
                >
                <HiDocumentText className=' text-xl' />
                </div>
                <div>
                <p
                    className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400"
                >
                    Last Month Posts
                </p>
                <p
                    className="text-lg font-semibold text-gray-700 dark:text-gray-200"
                >
                    <span className='text-green-500 flex items-center'>
                    <HiArrowNarrowUp />
                    {lastMonthPosts}
                    </span>
                </p>
                </div>
            </div>
            <div
                className="flex items-center p-4 bg-white rounded-lg shadow-sm ring ring-red-200 ring-opacity-50 dark:bg-gray-800 dark:ring-gray-50 dark:ring-opacity-0"
            >
                <div
                className="p-3 mr-4 text-green-500 bg-green-100 rounded-full dark:text-green-100 dark:bg-green-500"
                >
                <LiaCommentSolid className=" text-xl" />
                </div>
                <div>
                <p
                    className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400"
                >
                    Last Month Comments
                </p>
                <p
                    className="text-lg font-semibold text-gray-700 dark:text-gray-200"
                >
                    <span className='text-green-500 flex items-center'>
                    <HiArrowNarrowUp />
                    {lastMonthComments}
                    </span>
                </p>
                </div>
            </div>
            <div
                className="flex items-center p-4 bg-white rounded-lg shadow-sm ring ring-red-200 ring-opacity-50 dark:bg-gray-800 dark:ring-gray-50 dark:ring-opacity-0"
            >
                <div
                className="p-3 mr-4 text-teal-500 bg-teal-100 rounded-full dark:text-teal-100 dark:bg-teal-500"
                >
                <RiUserLocationLine className=" text-xl"/>
                </div>
                <div>
                <p
                    className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400"
                >
                    Subscription Status
                </p>
                <p
                    className="text-lg font-semibold text-green-700 dark:text-green-500" 
                >
                    Activated
                </p>
                </div>
            </div>
            </div>


            
            <div className="flex-wrap flex gap-4 justify-center mt-8">

            <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800" style={{ width: '520px' }}>
                    <div className="flex justify-between p-3 text-sm font-semibold">
                        <h1 className="text-center p-2">Recent Comments</h1>
                        <Link to={"/dashboard?tab=subcomments"}>
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
                        <Link to={"/dashboard?tab=subposts"}>
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
