import mongoose from "mongoose";    

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
        default : "https://parimatchnews.com/wp-content/uploads/2021/01/Screenshot_1-634x640.png",
    },
}, {timestamps: true}
);


const User = mongoose.model('User', userSchema);

export default User ;