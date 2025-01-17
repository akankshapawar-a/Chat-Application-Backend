import mongoose from "mongoose";

const userShchema=new mongoose.Schema({
    fullname:{type:String , required:true },
    username:{type:String , required:true ,unique:true},
    password:{type:String , required:true, minlength:6},
    gender:{type:String,required:true, enum:["male","female"], },
    profilePic:{
        type:String,
        default:"",
    }

});

const User=mongoose.model("User",userShchema);

export default User;

