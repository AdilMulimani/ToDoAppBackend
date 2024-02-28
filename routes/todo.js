//require express node.js package
const express = require("express")
//require auth for user id
const auth = require("../middleware/user_jwt")
//requiring todo model
const todo = require("../models/todo")
//creating express router
const router = express.Router()

//creating new todo post
router.post("/",auth,async (req, res, next)=>{
    //always try to use try-catch blocks with async functions because they return a promise
    try {
        const toDoObj = await todo.create({
            title : req.body.title,
            description :req.body.description,
            user :req.userId
        });

        if(!toDoObj)
        {
            return res.status(400).json({
                success:false,
                message:"Something went wrong"
            });
        }

        return res.status(201).json({
            success:true,
            todo:toDoObj,
            message:"Successfully created todo post"
        });
    }
    catch (err)
    {
        next(err)
    }
});

//fetch all to do tasks
router.get("/",auth,async (req, res, next)=>{
    try {
        //we will get all the unfinished to do task
        const toDoObj = await todo.find({user:req.userId,finished: false})

        if(!toDoObj)
        {
            return res.status(400).json({
                success:false,
                message:"Some error occurred"
            });
        }
        return res.status(200).json({
            success:true,
            count:toDoObj.length,
            todo:toDoObj,
            message:"Fetched all the unfinished task tasks"
        })
    }
    catch (err)
    {
        next(err)
    }
});

//updating a to do task
router.put("/:id",async (req, res, next)=>{
    try {
        let toDoObj = await todo.findById(req.params.id)

        if(!toDoObj)
        {
            return res.status(400).json({
                success:false,
                message:"Task doesn't exists"
            });
        }

        toDoObj = await todo.findByIdAndUpdate(req.params.id,req.body,{
            new : true,
            runValidators :true
        });

        if(!toDoObj){
            return res.status(400).json({
                success:false,
                message:"Something went wrong"
            });
        }

        return res.status(200).json({
            success:true,
            todo:toDoObj,
            message:"Updated task"
        });

    }
    catch (err)
    {
        next(err)
    }
});

//delete individual task
router.delete("/:id",async (req, res, next)=>{
    try {
        let toDoObj = await todo.findById(req.params.id)

        if(!toDoObj)
        {
            return res.status(400).json({
                success:false,
                message:"Task doesn't exists"
            });
        }

        toDoObj = await todo.findByIdAndDelete(req.params.id);


        return res.status(200).json({
            success:true,
            message:"Deleted task"
        });

    }
    catch (err)
    {
        next(err)
    }
});

router.get("/finished",auth,async (req, res, next)=>{
    try {
        //we will get all the unfinished to do task
        const toDoObj = await todo.find({user:req.userId,finished: true})

        if(!toDoObj)
        {
            return res.status(400).json({
                success:false,
                message:"Some error occurred"
            });
        }
        return res.status(200).json({
            success:true,
            count:toDoObj.length,
            todo:toDoObj,
            message:"Fetched all the finished tasks"
        })
    }
    catch (err)
    {
        next(err)
    }
});

//exporting router so that it can be uses
module.exports = router;

