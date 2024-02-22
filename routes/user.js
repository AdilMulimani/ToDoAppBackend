//importing the express node.js package
const express = require("express");
//importing bcryptjs node.js package
const bcryptjs = require("bcryptjs");
//importing our jsonwebtoken middleware
const user_jwt = require("../middleware/user_jwt");
//Routers in Express are used to handle different routes in your application.
//You can think of routers as a mini-application that can handle specific sets of routes independently.
const router = express.Router();
const jwt = require("jsonwebtoken");
//getting the user model here
const user_model = require("../models/User.js");



//posting a request at end point /register
//authentication and authorization
router.post('/register', async (req, res, next) => {
    //to store user details we need to get it from client,
    //so we need to pass the parameters to server
    //we can take parameters using req.body or req.query

    console.log(req.body);
    const { username, email, password } = req.body;

    //checking of user is already registered through email
    //we get exception in async
    try {
//till the user data is fetched we wait
        let user_exist = await user_model.findOne({ email: email });
        //if users email already registered
        if(user_exist) {
            //we send a response that registration was unsuccessful and user already exists
            return res.status(400).json({
                success: false,
                msg: 'User already exists'
            });
        }
        //creating a new instance of user to register user.
        let user = new user_model();

        user.username = username;
        user.email = email;

        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt);

        let size = 200;
        user.avatar = "https://gravatar.com/avatar/?s="+size+'&d=robohash';


        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        }


        jwt.sign(payload, process.env.jwtUserSecret, {
            expiresIn: 360000
        }, (err, token) => {
            if(err) throw err;

            res.status(200).json({
                success: true,
                token: token
            });
        });



    } catch(err) {
        console.log(err);
        res.status(402).json({
            success: false,
            message: 'Something error occurred'
        })
    }
});

//route for login
router.post("/login",async (req, res)=>{

    //getting email and password
    const email = req.body.email
    const password = req.body.password

    try {
        //finding the user with email
        let user = await user_model.findOne({email: email});

        if(!user)
        {
            res.status(400).json({
                success:false,
                msg:"You have not registered"
            });
        }
        else if(user)
        {
            //returns true if user is password matches
            const isMatch = await bcryptjs.compare(password,user.password);

            //if password doesnt match
            if(!isMatch)
            {
                res.status(400).json({
                    success:false,
                    msg:"Wrong password entered"
                });
            }//if password matches
            else if (isMatch)
            {
                const payLoad = {
                    user: {
                        id: user.id
                    }
                }

                jwt.sign(payLoad, process.env.JWTUSERSECRETTOKEN, {
                    expiresIn: 360000
                }, (err, token) => {
                    if (err) throw err;
                    else res.status(200).json({
                        success: true,
                        msg:"User Logged in",
                        token: token,
                        user:user
                    });
                });
            }

        }
    }
    catch (err)
    {
        console.log(err)
        res.status(500).json({
            success:false,
            msg:"Server error"
        })
    }

})

module.exports = router;