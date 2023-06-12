const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")

const authMiddleware = asyncHandler(async(req,res,next) =>{
    let token;
    if(req?.headers?.authorization?.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1];
        try{
          if(token){
            const decoded= jwt.verify(token,process.env.JWT_SECRET);
            //console.log(decoded)
            const user = await User.findById(decoded?.id);
            req.user = user   
            next();
          }
        } catch (error){
            throw new Error("Not authorised token expired, please login again");
        }
    } else {
        throw new Error("there is no token attached to header")
    }
})

module.exports= {authMiddleware}