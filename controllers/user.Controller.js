import User from "../api/models/user.model.js"
import { errorHandler } from "../api/utils/error.js"
import bcryptjs from 'bcryptjs'

export const test = (req,res) => {
    res.json({ message : 'API is working! '})
}


export const updateUser = async (req, res, next ) => {
    if(req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'You are not allowed  to update this User'))
    }
    if(req.body.password){
    if(req.body.password.length < 6) {
        return next(errorHandler(   400, 'Password must be at least 6 Characters Long'))
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
}
    if(req.body.username){
    if(req.body.username.length < 7 || req.body.username.length > 20 ) {
        return next(errorHandler(400, 'Username must be between 7 and 20 characters'))
    }
    if(req.body.username.includes(' ')){
        return next(errorHandler(400, 'Username Cannot contain spaces'))
        }
    if(req.body.username !== req.body.username.toLowerCase()){
            return next(errorHandler(400, 'Username must be lowercase'))
        }
    if(!req.body.username.match(/^[a-zA-Z0-9]+$/)){
            return next(errorHandler(400, 'Username Can only contain numbers and letters'))
        }
        try {
            const updateUser = await User.findByIdAndUpdate(req.params.userId, {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    ProfilePicture: req.body.ProfilePicture,
                    password: req.body.password
                }
            }, { new: true });
            const {password,...rest} = updateUser._doc;
            res.json(200).json(rest)
        } catch (error) {
            next(error);
        }
        
        
    }
}