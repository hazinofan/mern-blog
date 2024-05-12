import express from 'express'
import { createComment, editComment, getPostComments, likeComment } from '../../controllers/Comment.controller.js'
import { verifyToken } from '../utils/VerifiyUser.js';

const router = express.Router()


router.post('/create', verifyToken , createComment);
router.get('/getpostcomments/:postId', getPostComments);
router.put('/likeComment/:commentId', verifyToken, likeComment)
router.put('/editComment/:commentId', verifyToken, editComment)

export default router 