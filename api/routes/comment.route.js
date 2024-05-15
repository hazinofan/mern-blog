import express from 'express'
import { createComment, deleteComment, editComment, getPostComments, getcomments, likeComment } from '../../controllers/Comment.controller.js'
import { verifyToken } from '../utils/VerifiyUser.js';

const router = express.Router()


router.post('/create', verifyToken , createComment);
router.get('/getpostcomments/:postId', getPostComments);
router.put('/likeComment/:commentId', verifyToken, likeComment)
router.put('/editComment/:commentId', verifyToken, editComment)
router.delete('/deleteComment/:commentId', verifyToken, deleteComment)
router.get('/getComments', verifyToken, getcomments)

export default router 