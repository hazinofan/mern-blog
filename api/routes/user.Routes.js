import express from 'express'
import { deleteUser, test, updateUser, signout, getUsers } from '../../controllers/user.Controller.js';
import { verifyToken } from '../utils/VerifiyUser.js';



const router = express.Router();
 
router.get('/test' , test)
router.put('/update/:userId' ,verifyToken, updateUser)
router.delete('/delete/:userId', verifyToken, deleteUser)
router.post('/signout', signout)
router.get('/getusers',verifyToken, getUsers)

export default router ;