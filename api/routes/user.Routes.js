import express from 'express'
import { test, updateUser } from '../../controllers/user.Controller.js';
import { verifyToken } from '../utils/VerifiyUser.js';



const router = express.Router();
 
router.get('/test' , test)
router.put('/update/:userId' ,verifyToken, updateUser)

export default router ;