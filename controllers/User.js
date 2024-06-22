import User from "../models/model.User.js"
import bcryptjs from "bcryptjs";
import generateTokenAndsetCookies from "../utils/generateToken.js";


export const Signup=async(req , res)=>{
const{fullname,   username,password,gender,profilePic}=req.body;
const hashpassword= bcryptjs.hashSync(password,10);
const boyProfile=`https://avatar.iran.liara.run/public/boy?username=${username}`
const girlProfile=`https://avatar.iran.liara.run/public/girl?username=${username}`

const newUser= new User({
      fullname, 
      username,
      password:hashpassword,
      gender,
      profilePic:gender=== "male"? boyProfile:girlProfile
    });

try{
    if(newUser){
        generateTokenAndsetCookies(newUser._id,res);
    await newUser.save();
    res.status(201).json("User Created Successfully");
    }
    else{
        res.status(400).json("Invaliduser data");

    }
}catch(error){
    return res.status(500).json({ error: "Something went wrong", errorMessage: error.message });

}
 

}



export const login =async(req , res)=>{
    const {username ,password}=req.body;
    try{
        const user=await User.findOne({username});
        if(!user){
            return res.status(400).json({ error: "User does not exist" });
        }
        console.log("User exists");

        const ValidPassword= await bcryptjs.compareSync(password,user.password);
        if(ValidPassword){
            generateTokenAndsetCookies(user._id,res);
            return res.status(200).json({
               _id:user._id,
               fullname:user.fullname,
               profilePic:user.profilePic,
            });
        }else{
            return res.status(400).json({ error: "Password does not match" });

        }
    }catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ error: "Something went wrong", errorMessage: error.message });
    }
}


export const logout=async(req,res)=>{

    try {
       res.cookie("jwt","",{maxAge:0}) 
       res.status(200).json({message:"Logged out Successfully"})
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({error:"Internal Server Error"})
    }
}