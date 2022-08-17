const express = require('express');
const router = express.Router();
const User = require('../models/User');
// express validator to check the data requesting to store in database
const { body, validationResult } = require('express-validator');
//bcryptjs to hash the passwords
const bcrypt = require('bcryptjs');
//importing jwt web token
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "Abhishek@bhishek.sign.by.@bhishek"
// creating user: POST "http://localhost:3000/api/auth"
router.post("/createuser", [
    //implementation of conditions on data requesting to add in database  
    body('name', 'Enter a valid name').isLength({ min: 2 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password length must be greater than 7').isLength({ min: 8 }),
], async (req, res) => {
    // when errors return bad request and the errors
    const errors = validationResult(req);
    let success= false;
    if (!errors.isEmpty()) {
        return res.status(400).json({success:success, errors: errors.array() });
    }
    // check user is already exist in database with this email id
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({success: success, errors: "Sorry a user with this email already exist" });
        }
        // creating secured password
        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(req.body.password, salt);
        //create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPassword,
        })
        // generating token / token assigner
        const data = {
            user:{
                id: user.id
            }
        }
        success=true;
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({success:success,authtoken:authtoken});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured");
    }
})
// login user:POST "http://localhost:3000/api/login" no Login required
router.post("/login", [
    //implementation of conditions on data requesting to validate in database  
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid password').exists(),
], async (req, res) => {
     // when errors return bad request and the errors
     let success = false;
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
         return res.status(400).json({success:success, errors: errors.array() });
     }
     //extracting email and password from request body
     const {email,password}=req.body;
     try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({success:success,errors:"Please enter correct credentials"});
        }
        const passcomp = await bcrypt.compare(password,user.password);
        if(!passcomp){
            return res.status(400).json({success:success,errors:"Please enter correct credentials"});
        }
        const data = {
            user:{
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success=true;
        res.json({success:success,authtoken:authtoken});
     } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
     }
})

// Fetching logged in user details:POST "http://localhost:3000/api/getuserdata" Login required
router.post("/getuserdata", fetchuser , async (req, res) => {
try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
     
}
})
module.exports = router;