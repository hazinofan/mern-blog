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


export const google = async (req,res,next) => {
    const {email, name, googlePhotoUrl} = req.body
    try {
        console.log(email)
        console.log('Connecting to MongoDB:', process.env.MONGO);

        const user = await User.findOne({ email });
        console.log('User:', user);
        if(user){
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
            const {password, ...rest} = user._doc ;
            res.status(200).cookie('access_token', token, {
                httpOnly: true,
            }).json(rest)
        } else {
            const generatePassword = Math.random().toString(36).slice(-8)
            const hanshedPassword = bcryptjs.hashSync(generatePassword, 10)
            const newUser = new User({
                username: name.toLowerCase().split('').join('') +
                Math.random().toString(36).slice(-4),
                email,
                password : hanshedPassword,
                profilPicture : googlePhotoUrl,
            })
            await newUser.save()
            const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET);
            const {password, ...rest} = newUser._doc ;
            res.status(200).cookie('access_token', token, {
                httpOnly: true,
            }).json(rest)
        }
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export default router;
