import mongoose from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema({
    username :{
        type : String,
        required : true ,
        unique: true,
    },
    email :{
        type : String,
        required : true,
    },
    password :{
        type : String,
        required : true,
    },
    ProfilPicture :{
        type : String,
        default : "https://isobarscience-1bfd8.kxcdn.com/wp-content/uploads/2020/09/default-profile-picture1.jpg",
    },
}, {timestamps: true}
);


const User = mongoose.model('User', userSchema);

export default User ;