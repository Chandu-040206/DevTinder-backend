const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId", ["firstName", "lastName"]);

        res.json({ message: "Data fetched Successfully", connectionRequests });
    }
    catch (err) {
        res.status(400).send("Something went wrong : " + err.message);
    }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            $or: [
                { toUserId: loggedInUser._id, status: "accepted" },
                { fromUserId: loggedInUser._id, status: "accepted" }
            ]
        })
            .populate("fromUserId", "firstName lastName")
            .populate("toUserId", "firstName lastName");

        const data = connectionRequests.map((row) => {
            if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return row.toUserId;
            }
            return row.fromUserId;
        });

        res.json({
            message: "Connections fetched successfully",
            data
        });

    } catch (err) {
        res.status(400).send("Something went wrong : " + err.message);
    }
});

userRouter.get("/feed", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit;
        skip = (page-1)*limit;

        const connectionRequests = await ConnectionRequest.find({
            $or: [
                { toUserId: loggedInUser._id },
                { fromUserId: loggedInUser._id }
            ]
        }).select("firstName lastName");

        const hideUsers = new Set();
        connectionRequests.forEach((req) => {
            hideUsers.add(req.toUserId.toString()),
                hideUsers.add(req.fromUserId.toString())
        });

        const users = await User.find({
            $and: [
                { _id: { $nin: Array.from(hideUsers) } },
                { _id: { $ne: loggedInUser._id } }
            ]
        }).select("firstName lastName").skip(skip).limit(limit);

        res.send(users);
    }
    catch (err) {
        res.status(400).send("Something went wrong : " + err.message);
    }
})

module.exports = userRouter;