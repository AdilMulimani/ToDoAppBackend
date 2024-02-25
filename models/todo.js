//importing mongoose node.js package
const mongoose = require("mongoose")

//creating todoSchema
const todoSchema = new mongoose.Schema({
    //each fil must have a title
    title :{
        type:String,
        required:true
    },
    //file can have a description
    description:{
        type:String
    },
    //we store user id
    user:{
        //this stores object id
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    //is it finished?
    finished:{
        type:Boolean,
        default:false
    },
    //created on which date
    createdAt :{
        type:Date,
        default:Date.now()
    }
});

//exporting model
module.exports = Todo = mongoose.model("todo",todoSchema)