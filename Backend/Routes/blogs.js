const express = require('express');
const router = express.Router();
const fetchUser = require("../Middleware/FetchUsers");
const { body, validationResult } = require('express-validator');
const Blog = require('../Modals/Blog');
const User=require('../Modals/user');

//ROUTE 1: Fetch All the Blogs using GET "/api/blogs/fetchuserblogs" . Authentication required
router.get("/fetchuserblogs",fetchUser,async (req,res)=>{
    try {
        const blogs=await Blog.find({user:req.user.id})
        res.json(blogs);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error occured");
    }
});


//ROUTE 2: Add New Blogs using POST "/api/blogs/addblog". Login Required
router.post("/addblog",fetchUser,[
    body('title','Title must be of 3 Characters').isLength({min:3}),
    body('description','Description must be of 8 characers').isLength({min:8})
],
async(req,res)=>{
    try {
        // const {title,description,category}=req.body;
        // //If there are any errors, return Bad request and the error message
        // const errors=validationResult(req);
        // if(!errors.isEmpty()){
        //     return res.status(400).json({errors:errors.array()});
        // }
        // const blog=new Blog({
        //     title,description,category,user:req.user.id
        // });
        const {title,description,category}=req.body;
        //If there are any errors, return Bad request and the error message
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        const user_id=req.user.id;
        const name=await User.findById(user_id);
        const blog=new Blog({
            title,description,category,user:req.user.id,username:name.name
        });
        const saveBlog=await blog.save();

        res.json(saveBlog);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("some error occured");
    }
});

//ROUTE 3: Delete a Blogs using DELETE "/api/blogs/deleteblog". Login Required
router.delete("/deleteblog/:id",fetchUser,async(req,res)=>{
    try {
        //Find the Blog to be deleted adnd delete it.
        let blog=await Blog.findById(req.params.id);
        if(!blog){return res.status(400).send("Not found")};
        //Allow deletion only if thhe user owns this blog
        if(blog.user.toString()!==req.user.id){
            return res.status(401).send("Not Allowed");
        }
        blog=await Blog.findByIdAndDelete(req.params.id);
        res.json({"success":"Blog has been deleted",blog: blog});

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error occured");
    };
});

//ROUTE 4: Update a Blogs using PUT "/api/blogs/updateblog". Login Required

router.put("/updateblog/:id",fetchUser,async (req,res)=>{
    const {title,description,category}=req.body;
    try {
        //Create a NewBlog Object
        const newBlog={};
        if(title){newBlog.title=title};
        if(description){newBlog.description=description};
        if(category){newBlog.category=category};
        let blog=await Blog.findById(req.params.id);
        if(!blog){return res.status(404).send("Not found")};

        if(blog.user.toString()!==req.user.id){
            return res.status(401).send("Not allowed");
        }

        blog=await Blog.findByIdAndUpdate(req.params.id,{
            $set:newBlog},{new:true});
            res.json(blog);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error occured");
    }
});

//ROUTE 5: Get all the blogs in the database using GET "/api/blogs/fetchallblogs". Login Required.
router.get("/fetchallblogs/:key",fetchUser,async (req,res)=>{
    try {
        const blogs=await Blog.find({
            "$or":[
                {"category": {$regex: req.params.key}}
            ]
        });
        res.json(blogs);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error occured");
    }
});

//ROUTE 6: Get all the blogs in the database using GET "/api/blogs/fetchallblogs". Login Required.
router.get("/fetchallblogs",fetchUser,async (req,res)=>{
    try {
        const blog=await Blog.find();
        res.json(blog);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error occured");
    }
})

//ROUTE 7: Get the details of the user with his/her user id using GET "/api/blogs/Userdetail:_id. Login Required"
router.get("/Userdetail/:_id", fetchUser, async(req,res)=>{
    try {
        const userId=req.params._id;
        const user=await User.findById(userId).select("-password");
        res.send(user);
        // res.send(userId);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error occured");
    }
});




//ROUTE 9: Add New Blogs using POST "/api/blogs/addblog1". Login Required
router.post("/addblog1",fetchUser,[
    body('title','Title must be of 3 Characters').isLength({min:3}),
    body('description','Description must be of 8 characers').isLength({min:8})
],
async(req,res)=>{
    try {
        const {title,description,category}=req.body;
        //If there are any errors, return Bad request and the error message
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        const user_id=req.user.id;
        const name=await User.findById(user_id);
        const blog=new Blog({
            title,description,category,user:req.user.id,username:name.name
        });
        res.send(blog);
        // console.log(req.body.id);
        // const name=await User.find({});
        // const username=name.name;
        // console.log(name);
        // res.send(name);
        // const saveBlog=await blog.save();

        // res.json(saveBlog);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("some error occured");
    }
});

module.exports=router;