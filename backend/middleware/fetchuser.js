//importing jwt web token
const jwt = require('jsonwebtoken');
const JWT_SECRET = "Abhishek@bhishek.sign.by.@bhishek"

const fetchuser = (req, res, next)=>{
    //Get the user from the jwt token and id to req object
    const token = req.header("auth-token");
    if(!token){
        res.status(401).send({error:"Somthing went wrong please login again"});
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({error:"Somthing went wrong please login again"});
    }
    
}

module.exports = fetchuser;