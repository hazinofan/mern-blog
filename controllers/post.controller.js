import Post from "../api/models/postModel.js";
import { errorHandler } from "../api/utils/error.js"

export const create = async (req, res, next) => {
  if (!(req.user.isAdmin || req.user.isSub)) { 
      return next(errorHandler(403, 'You are not allowed to create a post'));
  } 

  if (!req.body.title || !req.body.content) {
      return next(errorHandler(400, 'Please provide all required fields'));
  }

  const slug = req.body.title
      .split(' ')
      .join('-')
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, '');

  const newPost = new Post({
      ...req.body,
      slug,
      userId: req.user.id,
  });

  try {
      const savedPost = await newPost.save();
      res.status(201).json(savedPost);
  } catch (error) {
      next(error);
  }
  }


// including the search API 
export const getposts = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;
    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: 'i' } },
          { content: { $regex: req.query.searchTerm, $options: 'i' } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await Post.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
    });
  } catch (error) {
    next(error);
  }
}

export const deletepost = async (req, res, next) => {
  if (!(req.user.isAdmin || req.user.isSub || req.user.id === req.params.userId)) {
    return next(errorHandler(403, 'You are not allowed to delete this post'));
  }
  try {
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json('The post has been deleted');
  } catch (error) {
    next(error);
  }
};


export const updatepost = async (req, res, next) => {
  if (!(req.user.isAdmin || req.user.isSub || req.user.id === req.params.userId)) {
    return next(errorHandler(403, 'You are not allowed to update this post'));
  }
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          category: req.body.category,
          image: req.body.image,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};


export const getUserposts = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;

    // Construct the query object
    const query = {
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: 'i' } },
          { content: { $regex: req.query.searchTerm, $options: 'i' } },
        ],
      }),
    };

    // Fetch posts based on the query
    const posts = await Post.find(query)
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    // Count total posts based on the query
    const totalPosts = await Post.countDocuments({
      ...(req.query.userId && { userId: req.query.userId }),
    });

    // Calculate the date one month ago
    const now = new Date();
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());

    // Count last month posts based on the query
    const lastMonthPosts = await Post.countDocuments({
      ...(req.query.userId && { userId: req.query.userId }),
      createdAt: { $gte: oneMonthAgo },
    });

    // Send response with posts and counts
    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
    });
  } catch (error) {
    next(error);
  }
};

// getPostsByMonth controller in post.controller.js
export const getPostsByMonth = async (req, res, next) => {
  try {
    const userId = req.user.id; // Get user ID from the request
    const posts = await Post.aggregate([
      { $match: { userId } }, // Filter by logged-in user's ID
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts by month:', error);
    next(error);
  }
};
