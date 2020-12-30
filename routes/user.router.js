const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const UserService = require("../serviceimpl/userservice");

//Get All users
router.get("/getusers", async (req, res) => {
    const users = await User.find();
    if (users) {
        return res.json({ "data": users, "statusCode": 200, "message": "OK" })
    } else {
        return res.json({ "data": [], "statusCode": 400, "message": "Bad Request" })
    }
});

//Get userById
router.get("/getuser/:id", async (req, res) => {
    const user = await User.findOne({ id: req.params.id });
    if (user) {
        return res.json({ "data": user, "statusCode": 200, "message": "OK" })
    } else {
        return res.json({ "data": {}, "statusCode": 400, "message": "Bad Request" })
    }
});

//Save User
router.post("/saveuser", async (req, res) => {
    const isUserExists = await User.findOne({ id: req.body.id });
    if (isUserExists) {
        return res.json({ "data": req.body, "statusCode": "400", "message": "User Already Exists" });
    } else {
        const user = await UserService.saveUser(req.body);
        return res.json({ "data": user, "statusCode": "200", "message": "User Saved" });
    }
});

//Udate User
router.patch("/updateuser/:id", async (req, res) => {
    const filter = { id: req.params.id };
    const update = req.body;
    const user = await User.findOneAndUpdate(filter, update);
    if (user) {
        return res.json({ "data": user, "statusCode": "200", "message": "Updated" });
    } else {
        return res.json({ "data": user, "statusCode": "400", "message": "User Not Found" });
    }
});

//Delete user by Id
router.delete("/deleteuser/:id", async (req, res) => {
    const user = await User.findOneAndDelete({ id: req.params.id });
    if (!user) {
        return res.json({ "data": user, "statusCode": 400, "message": "Bad Request" });
    } else {
        return res.json({ "data": user, "statusCode": 200, "message": "deleted" });
    }
});

module.exports = router
