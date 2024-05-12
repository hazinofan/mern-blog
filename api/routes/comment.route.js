import express from 'express'
import { createComment, getPostComments, likeComment } from '../../controllers/Comment.controller.js'
import { verifyToken } from '../utils/VerifiyUser.js';

const router = express.Router()


router.post('/create', verifyToken , createComment);
router.get('/getpostcomments/:postId', getPostComments);
router.put('/likeComment/:commentId', verifyToken, likeComment)

export default router 