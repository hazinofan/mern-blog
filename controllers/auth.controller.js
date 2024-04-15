import express from 'express';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../api/utils/error.js';
import User from '../api/models/user.model.js';
import jwt from 'jsonwebtoken';

// Create an Express router instance
const router = express.Router();

// Add body parser middleware to parse JSON bodies
router.use(express.json());

export const signup = async (req, res, next) => {
    const {username, email, password } = req.body ;

    if(
        !username ||
        !email ||
        !password ||
        username === '' ||
        email === '' ||
        password === ''
    ) 
    {
        next(errorHandler(400, 'All fields are required '))
    }

    const hashPassword = bcryptjs.hashSync(password, 10)

    const newUser = new User({
        username,
        email,
        password: hashPassword,
    });

    try {
        await newUser.save();
        res.json('signup successful')   
    } catch (error) {
        next(error);
    }
}

export const signin = async (req, res, next) => {
    const {email, password} = req.body;
    if(
        !email ||
        !password ||
        email === '' ||
        password === ''
    ) {
        next(errorHandler(400, 'All fields are required '))
    }

    try {
        const validUser = await User.findOne({ email });
        if(!validUser) {
            return next(errorHandler(404, 'User not found '))
        } 
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword) {
            return next(errorHandler(404, 'Invalid Password'))
        }
        const token = jwt.sign(
            { id: validUser._id }, process.env.JWT_SECRET
        );

        const {password: pass, ...rest} = validUser._doc

        res.status(200).cookie('access_token',token, {
            httpOnly: true
        }).json(rest);
        
    } catch (error) {
        next(error);
    }

}

export default router;
