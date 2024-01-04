const express=require('express');
const User=require('../Modals/user');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchUser = require('../Middleware/fetchUsers');
// const fetchUser=require("../Middleware/FetchUsers")

const router=express.Router();
const JWT_SECRET = "360ViewsIsAWonderfulSite#12";


//ROUTE 1: Create a user using: POSt "/api/auth/CreateUser" . Doesn't  require Auth
router.post('/CreateUser',[
    body('email').isEmail(),
    body('name').isLength({ min: 3 }),
    body('password').isLength({ min: 8 }),
  ],
  async (req,res)=>{
    let success=false;
    //If there are any errors, return Bad request and the error message.
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success,errors:errors.array()});
    }

    //Check whether the user with the same email exist

    try {

        let user= await User.findOne({email:req.body.email})
        if(user){
            return res.status(400).json({success,error:"Sorry! a user with this email alreay exist"})
        }
        const salt=await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password,salt);
        user=await User.create({
            name:req.body.name,
            email:req.body.email,
            password:secPass
        });

        const data={
            user:{
                id:user.id
            }
        }
        const authToken=jwt.sign(data,JWT_SECRET);
        success=true;
        res.json({success,authToken});
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error occured");
        
    }
});


//ROUTE 2: Authenicate a user using: POST "/api/auth/login" . Login Required
router.post("/login",[
    body('email',"Enter a valid email").isEmail(),
    body('password',"Password cannot be blank").exists()
],async (req,res)=>{

    let success=false;
    //If there are ant errors, return Bad request and the error message
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {email, password}=req.body;
    try {
        let user=await User.findOne({email});
        if(!user){
            return res.status(400).json({success,error:"Please try to login with correct credentials"});
        }
        const passwordCompare=await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            return res.status(400).json({success,error:"Please try to login with correct credentials"});
        }

        const data ={
            user:{
                id:user.id
            }
        };
        const authToken =jwt.sign(data,JWT_SECRET);
        success=true;
        res.json({success,authToken});
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server Error");
    }
});

//ROUTE 3: Get logged in user details by using: POST "/api/auth/getuser" . Login Required

router.post("/getUser",fetchUser,async (req,res)=>{
    try {
        const userId=req.user.id;
        const user=await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})


module.exports=router;