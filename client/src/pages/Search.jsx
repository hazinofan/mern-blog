import { Button, Select, TextInput } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';
import Ads from '../components/Ads';
import { useSelector } from 'react-redux';
import GoPremium from '../components/GoPremium';
import { Helmet } from 'react-helmet';

function Search() {
    const [sideBarData, setSideBarData] = useState({
        searchTerm: '',
        sort: 'desc',
        category: 'uncategorized'
    });

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showMore, setShowMore] = useState(true);
    const navigate = useNavigate();

    const location = useLocation();

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const sortFromUrl = urlParams.get('sort');
        const categoryFromUrl = urlParams.get('category');

        setSideBarData(prevState => ({
            ...prevState,
            searchTerm: searchTermFromUrl || prevState.searchTerm,
            sort: sortFromUrl || prevState.sort,
            category: categoryFromUrl || prevState.category
        }));

        const fetchPosts = async () => {
            setLoading(true);
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/post/getposts?${searchQuery}`);
            if (!res.ok) {
                setLoading(false);
                return;
            }
            const data = await res.json();
            setPosts(data.posts);
            setLoading(false);
            setShowMore(data.posts.length === 9); // Assuming 9 is the limit per fetch
        };

        fetchPosts();
    }, [location.search]);

    function handleChange(e) {
        const { id, value } = e.target;
        setSideBarData(prevState => ({
            ...prevState,
            [id]: value
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', sideBarData.searchTerm);
        urlParams.set('sort', sideBarData.sort);
        urlParams.set('category', sideBarData.category);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }

    const handleShowMore = async () => {
        const numberOfPosts = posts.length;
        const startIndex = numberOfPosts;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('startIndex', startIndex);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/post/getposts?${searchQuery}`);
        if (!res.ok) {
            return;
        }
        const data = await res.json();
        setPosts(prevPosts => [...prevPosts, ...data.posts]);
        setShowMore(data.posts.length === 9); // Assuming 9 is the limit per fetch
    };
    const { currentUser } = useSelector(state => state.user);

    return (
        <div className='flex flex-col md:flex-row'>
            <Helmet>
                <title>{`Search Results for ${sideBarData.searchTerm || 'Posts'} | POSTIFY`}</title>
                <meta name="description" content={`Browse posts related to ${sideBarData.searchTerm || 'various topics'} on POSTIFY. Discover insightful articles and valuable information.`} />
                <meta name="keywords" content="blog, search, posts, articles, POSTIFY, blogging, latest posts" />
            </Helmet>
            <div className="p-7 border-b md:border-r md:min-h-screen border-gray-300 dark:border-gray-600">
                <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
                    <div className="flex items-center gap-2">
                        <label className="whitespace-nowrap font-semibold">Search Term</label>
                        <TextInput
                            placeholder='Search...'
                            id='searchTerm'
                            type='text'
                            value={sideBarData.searchTerm}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="whitespace-nowrap font-semibold">Sort</label>
                        <Select id='sort' value={sideBarData.sort} onChange={handleChange}>
                            <option value="desc">Latest</option>
                            <option value="asc">Oldest</option>
                        </Select>
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="whitespace-nowrap font-semibold">Category</label>
                        <Select id='category' value={sideBarData.category} onChange={handleChange}>
                            <option value='uncategorized'>Select a Category</option>
                            <option value='coding'>Coding</option>
                            <option value='health'>Health & Fitness</option>
                            <option value='technology'>Technology & Gadgets</option>
                            <option value='travel'>Travel & Adventure</option>
                            <option value='fashion'>Fashion & Style</option>
                            <option value='food'>Food & Recipes</option>
                            <option value='art'>Arts & Crafts</option>
                            <option value='finance'>Finance & Investment</option>
                            <option value='education'>Education & Learning</option>
                        </Select>
                    </div>
                    <Button type='submit' outline gradientDuoTone='purpleToPink'>Apply Filters</Button>
                </form>
            </div>
            <div className="w-full">
                <div className="font-semibold sm:border-b border-gray-500 p-3 mt-5">POSTS RESULTS :</div>
                <div className="p-7 flex flex-wrap gap-4 justify-center items-center min-h-screen">
                    {
                        !loading && posts.length === 0 && <p className='text-xl text-gray-500'>No Posts Found.</p>
                    }
                    {
                        loading && <p className='text-xl text-gray-500'>Loading ...</p>
                    }
                    {
                        !loading && posts && posts.map((post) =>
                        <PostCard key={post._id} post={post} />)
                    }
                    {showMore && !loading && (
                        <button
                        onClick={handleShowMore}
                        className='text-teal-500 text-lg hover:underline p-7 w-full'
                        >
                        Show More
                        </button>
                    )}
                    {!currentUser?.isSub && !currentUser?.isAdmin && <GoPremium />}
                </div>
            </div>
            <Ads />
        </div>
    );
}

export default Search;
