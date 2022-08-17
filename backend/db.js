const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/keeper";

const connectToMongoose = ()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("connection establised to mongoose")
    })
}
module.exports = connectToMongoose