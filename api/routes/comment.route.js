import express from 'express'
<<<<<<< HEAD
import { createComment, deleteComment, editComment, getPostComments, getcomments, likeComment } from '../../controllers/Comment.controller.js'
=======
import { createComment, deleteComment, editComment, getPostComments, likeComment } from '../../controllers/Comment.controller.js'
>>>>>>> 747f43977d568aa99013973260b0511904630643
import { verifyToken } from '../utils/VerifiyUser.js';

const router = express.Router()


router.post('/create', verifyToken , createComment);
router.get('/getpostcomments/:postId', getPostComments);
router.put('/likeComment/:commentId', verifyToken, likeComment)
router.put('/editComment/:commentId', verifyToken, editComment)
router.delete('/deleteComment/:commentId', verifyToken, deleteComment)
<<<<<<< HEAD
router.get('/getComments', verifyToken, getcomments)
=======
>>>>>>> 747f43977d568aa99013973260b0511904630643

export default router 