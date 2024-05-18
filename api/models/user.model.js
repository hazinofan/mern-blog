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
        default : "https://styles.redditmedia.com/t5_2qh4a/styles/communityIcon_7kecd4uf4a3c1.png",
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