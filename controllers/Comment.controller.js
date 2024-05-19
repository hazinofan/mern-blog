import Comment from '../api/models/Comment.model.js'

export const createComment = async (req, res, next) => {
    try {
      const { content, postId, userId } = req.body;
  
      if (userId !== req.user.id) {
        return next(
          errorHandler(403, 'You are not allowed to create this comment')
        );
      }
  
      const newComment = new Comment({
        content,
        postId,
        userId, 
      });
      await newComment.save();
  
      res.status(200).json(newComment);
    } catch (error) {
      next(error);
    }
  }

  export const getPostComments = async (req, res, next) => {
    try {
      const comments = await Comment.find({ postId: req.params.postId }).sort({
        createdAt: -1,
      });
      res.status(200).json(comments);
    } catch (error) {
      next(error);
    }
  };

  export const likeComment = async (req, res, next) => {
    try {
      const comment = await Comment.findById(req.params.commentId);
      if (!comment) {
        return next(errorHandler(404, 'Comment not found'));
      }
      const userIndex = comment.likes.indexOf(req.user.id);
      if (userIndex === -1) {
        comment.NumberOfLikes += 1;
        comment.likes.push(req.user.id);
      } else {
        comment.NumberOfLikes -= 1;
        comment.likes.splice(userIndex, 1);
      }
      await comment.save();
      res.status(200).json(comment);
    } catch (error) {
      next(error);
    }
  };

  export const editComment = async (req, res, next) => {
    try {
      const comment = await Comment.findById(req.params.commentId);
      if (!comment) {
        return next(errorHandler(404, 'Comment not found'));
      }
      if (comment.userId !== req.user.id && !req.user.isAdmin) {
        return next(
          errorHandler(403, 'You are not allowed to edit this comment')
        );
      }
  
      const editedComment = await Comment.findByIdAndUpdate(
        req.params.commentId,
        {
          content: req.body.content,
        },
        { new: true }
      );
      res.status(200).json(editedComment);
    } catch (error) {
      next(error);
    }
  };

  export const deleteComment = async (req, res, next) => {
    try {
      const comment = await Comment.findById(req.params.commentId);
      if (!comment) {
        return next(errorHandler(404, 'Comment not found'));
      }
      if (comment.userId !== req.user.id && !req.user.isAdmin) {
        return next(
          errorHandler(403, 'You are not allowed to delete this comment')
        );
      }
      await Comment.findByIdAndDelete(req.params.commentId);
      res.status(200).json('Comment has been deleted');
    } catch (error) {
      next(error);
    }}
    
    export const getComments = async (req, res, next) => {
      if (!(req.user.isAdmin || req.user.isSub)) {
        return next(errorHandler(403, 'You are not allowed to get all comments'));
      }
    
      try {
        const startIndex = parseInt(req.query.startIndex, 10) || 0;
        const limit = parseInt(req.query.limit, 10) || 9;
        const sortDirection = req.query.sort === 'desc' ? -1 : 1;
    
        const now = new Date();
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(now.getMonth() - 1);
    
        const [comments, totalComments, lastMonthComments] = await Promise.all([
          Comment.find()
            .sort({ createdAt: sortDirection })
            .skip(startIndex)
            .limit(limit),
          Comment.countDocuments(),
          Comment.countDocuments({ createdAt: { $gte: oneMonthAgo } })
        ]);
    
        res.status(200).json({ comments, totalComments, lastMonthComments });
      } catch (error) {
        next(error);
      }
    }

    // comment.controller.js
export const getUserComments = async (req, res, next) => {
  if (!(req.user.isAdmin || req.user.isSub)) {
    return next(errorHandler(403, 'You are not allowed to get comments'));
  }

  try {
    const userId = req.query.userId; // Get userId from query
    const startIndex = parseInt(req.query.startIndex, 10) || 0;
    const limit = parseInt(req.query.limit, 10) || 9;
    const sortDirection = req.query.sort === 'desc' ? -1 : 1;

    const now = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(now.getMonth() - 1);

    const query = { userId }; // Filter by userId

    const [comments, totalComments, lastMonthComments] = await Promise.all([
      Comment.find(query)
        .sort({ createdAt: sortDirection })
        .skip(startIndex)
        .limit(limit),
      Comment.countDocuments(query), // Count total comments by user
      Comment.countDocuments({ ...query, createdAt: { $gte: oneMonthAgo } }) // Count last month comments by user
    ]);

    res.status(200).json({ comments, totalComments, lastMonthComments });
  } catch (error) {
    next(error);
  }
};
