//importing node.js package of express
const express = require("express");
//importing node.js package of colors
const colors = require("colors");
//importing node.js package of morgan
const morgan = require("morgan");
//importing node.js package of mongoose
const mongoose = require("mongoose")
//importing node.js package of dotenv
const dotenv = require("dotenv")
//importing node.js package of mongoose
const connectToDB= require("./config/db")


//creating an instance of express
const app = express();

//.config() helps to load env variables
dotenv.config({
    path:'./config/config.env'
});

//connecting to Database
connectToDB();

//using morgan->it is a logger and middleware
//it is used during the time of development so dev
app.use(morgan("dev"))

//these are used to parse data
app.use(express.json({}));
app.use(express.json({
    extended :true
}))

//creating a variable that stores port number
const port = 3000;

//starting server
app.listen(port,()=>
{
    console.log(`server is running on port : ${port}`.white.underline.bold)
});

//here we use route /api/to do/auth + /register from route to post register request
app.use("/api/todo/auth",require("./routes/user.js"));

//here we use route /api/to do + / from router to post a to do task
app.use("/api/todo",require("./routes/todo.js"))

app.get("/",(req, res)=>{
    res.send("<!DOCTYPE html>\n" +
        "<html lang=\"en\">\n" +
        "<head>\n" +
        "    <meta charset=\"UTF-8\">\n" +
        "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
        "    <title>Adil's To-Do App</title>\n" +
        "    <style>\n" +
        "        body {\n" +
        "            font-family: Arial, sans-serif;\n" +
        "            margin: 0;\n" +
        "            padding: 0;\n" +
        "            box-sizing: border-box;\n" +
        "            background-color: #f2f2f2;\n" +
        "        }\n" +
        "        .container {\n" +
        "            max-width: 800px;\n" +
        "            margin: 20px auto;\n" +
        "            padding: 20px;\n" +
        "            border-radius: 10px;\n" +
        "            background-color: #fff;\n" +
        "            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\n" +
        "        }\n" +
        "        h1 {\n" +
        "            text-align: center;\n" +
        "            color: #1e8fff; /* Dodger Blue */\n" +
        "            margin-bottom: 20px;\n" +
        "        }\n" +
        "        p {\n" +
        "            text-align: justify;\n" +
        "            color: #333;\n" +
        "            line-height: 1.5;\n" +
        "        }\n" +
        "        ul {\n" +
        "            list-style-type: none;\n" +
        "            padding: 0;\n" +
        "        }\n" +
        "        li {\n" +
        "            color: #555;\n" +
        "            margin-bottom: 10px;\n" +
        "            display: flex;\n" +
        "            align-items: center;\n" +
        "        }\n" +
        "        li::before {\n" +
        "            content: \"\\2022\";\n" +
        "            color: #1E90FF; /* Dodger Blue */\n" +
        "            font-weight: bold;\n" +
        "            display: inline-block; \n" +
        "            width: 1em;\n" +
        "            margin-right: 10px;\n" +
        "        }\n" +
        "    </style>\n" +
        "</head>\n" +
        "<body>\n" +
        "    <div class=\"container\">\n" +
        "        <h1>Adil's To-Do App</h1>\n" +
        "        <p>Welcome to Adil's To-Do App! This application is designed to help you manage your tasks efficiently. With this app, you can:</p>\n" +
        "        <ul>\n" +
        "            <li>Create new tasks</li>\n" +
        "            <li>Read/view existing tasks</li>\n" +
        "            <li>Update/edit tasks</li>\n" +
        "            <li>Delete/remove tasks</li>\n" +
        "        </ul>\n" +
        "        <p>Adil has implemented these CRUD operations to ensure a smooth experience for users in managing their to-do lists. Whether you need to add a new task, review your current tasks, make changes to them, or delete completed tasks, this app has got you covered!</p>\n" +
        "    </div>\n" +
        "</body>\n" +
        "</html>\n");
});

