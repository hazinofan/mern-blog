import express from 'express'
import { deleteUser, test, updateUser } from '../../controllers/user.Controller.js';
import { verifyToken } from '../utils/VerifiyUser.js';



const router = express.Router();
 
router.get('/test' , test)
router.put('/update/:userId' ,verifyToken, updateUser)
router.delete('/delete/:userId', verifyToken, deleteUser)

export default router ;