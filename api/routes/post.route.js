import express from 'express'
import { verifyToken } from '../utils/VerifiyUser.js'
import { create, deletepost, getUserposts, getposts, updatepost } from '../../controllers/post.controller.js'

const router = express.Router()

router.post('/create', verifyToken, create)
router.get('/getposts', getposts)
router.delete('/deletepost/:postId/:userId', verifyToken, deletepost)
router.put('/updatepost/:postId/:userId', verifyToken, updatepost)
router.get('/getuserposts', verifyToken, getUserposts); 

export default router 