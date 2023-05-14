const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/keeper";

const connectToMongoose = () => {
    mongoose.connect(mongoURI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            family: 4,
        })
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.log('MongoDB connection error:', err));
}
module.exports = connectToMongoose