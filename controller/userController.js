const User = require("../models/userModel");
const asyncHandler = require('express-async-handler')
const gt = require("../config/jwt")
const v = require("../validator/validator")

const createUser = asyncHandler( async(req, res) => {
    const email = req.body.email;

    const findUser = await User.findOne({ email });
    if(!findUser){
        // create a new user
        const newUser = await User.create(req.body);
        res.json(newUser);
    } 
})

const loginUser = asyncHandler(async(req,res) =>{
    const {email,password} = req.body;
    
    // user exist or not
    
    const findUser= await User.findOne({email});
    if(findUser && (await findUser.isPasswordMatched(password))){
    res.json({
        _id: findUser?._id,
        firstName: findUser?.firstName,
        lastName: findUser?.lastName,
        email: findUser?.email,
        mobile: findUser?.mobile,
        token: gt.generateToken(findUser?._id),
    })
    } else {
        throw new Error ("Invalid credentials")
    }
});

//update a user

const updateUser = asyncHandler(async(req,res)=>{
    //console.log(req.user)
    const{_id} = req.user;
    try{
const updateUser= await User.findByIdAndUpdate(_id,{
    firstName: req?.body.firstName,
    lastName: req?.body.lastName,
    email: req?.body.email,
    mobile: req?.body.mobile
},{
    new : true
});
res.json(updateUser)
    } catch(error){
        throw new Error(error)
    }
})

// get all users

const getallUser = asyncHandler(async(req,res) =>{
    try{
        const getUsers = await User.find();
        res.json(getUsers);
    } catch(error){
        throw new Error(error)
    }
})

// get a user

const getaUser = asyncHandler(async(req,res) =>{
    const{id} = req.params;
   try{
const getaUser = await User.findById(id);
res.json({
    getaUser
})

   } catch (error){
    throw new Error(error)
   }
})

const deleteaUser = asyncHandler(async(req,res) =>{
    const{id} = req.params;
   try{
const deleteaUser = await User.findByIdAndDelete(id);
res.json({
    deleteaUser
})

   } catch (error){
    throw new Error(error)
   }
})



module.exports= {createUser, loginUser, updateUser ,getallUser, getaUser, deleteaUser}