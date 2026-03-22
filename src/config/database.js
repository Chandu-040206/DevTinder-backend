const mongoose = require("mongoose");

const connectDb = async ()=>{
    await mongoose.connect("mongodb+srv://chandrasekarramella:chandu@04022006@chandu.dfl03cu.mongodb.net/devTinder")
};

module.exports = connectDb;