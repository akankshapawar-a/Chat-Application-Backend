import jwt from 'jsonwebtoken';

const generateTokenAndsetCookies=(userId, res)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"15d",
    });


    //name , value ,millisec lifespan 

    res.cookie("jwt",token,{
        maxAge:15 * 24 * 60 *60 * 1000,
        httpOnly:true,
        sameSite:"strict",
        secure:process.env.NODE_ENV !== "development"?true:false,
    }
    )
}

export default generateTokenAndsetCookies;