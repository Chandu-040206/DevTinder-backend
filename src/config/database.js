const mongoose = require("mongoose");

const connectDb = async ()=>{
    await mongoose.connect("mongodb+srv://chandrasekarramella:chandu123@chandu.dfl03cu.mongodb.net/devTinder")
};

module.exports = connectDb;