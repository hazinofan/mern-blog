import mongoose from "mongoose";  

const profilePictures = [
    "http://localhost:5173/images/pp1.jpg",
    "http://localhost:5173/images/pp2.jpg",
    "http://localhost:5173/images/pp3.jpg",
    "http://localhost:5173/images/pp4.jpg",
    "http://localhost:5173/images/pp5.jpg",
];


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
    ProfilPicture: {
        type: String,
        default: function() {
            return profilePictures[Math.floor(Math.random() * profilePictures.length)];
        },
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isSub: {
        type: Boolean,
        default: false,
    }
}, {timestamps: true}
);


const User = mongoose.model('User', userSchema);

export default User ;