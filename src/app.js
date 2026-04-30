const express = require("express");
const app = express();
const connectDb = require("./config/database");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const cors = require("cors");
require("dotenv").config();
const http = require('http');
const initiateServer = require("./utils/socket");
const chatRouter = require("./routes/chat");

app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}))
app.use(express.json());
app.use(cookieParser());

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);
app.use("/",chatRouter);

const server = http.createServer(app);
initiateServer(server);

connectDb()
    .then(() => {
        console.log("Database connected successfully")
        server.listen(process.env.PORT, () => {
            console.log("Server is listening on port 7777")
        });
    })
    .catch((err) => {
        console.log("Database not connected")
    });



