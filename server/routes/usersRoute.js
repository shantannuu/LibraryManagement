const express = require('express')
const router = express.Router();
const User = require('../models/usersModel')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/authMiddleware');

router.post("/register", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.send({
                success: false,
                message: "User already exists",
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        req.body.password = hashedPassword;

        const newUser = new User(req.body);
        await newUser.save();
        return res.send({
            success: true,
            message: "User Created Successfully !",
        });
    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
        })
    }
})

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.send({
                success: false,
                message: "User not exists !",
            })
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password)

        if (!validPassword) {
            return res.send({
                success: false,
                message: "Invalid Password",
            })
        }

        const token = jwt.sign({ userId: user._id }, process.env.jwt_token, { expiresIn: "1d" })

        return res.send({
            success: true,
            message: "Login Successfully !",
            data: token,
        })
    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
        })
    }
})

router.get("/get-Logged-in-user", authMiddleware, async (req, res) => {
    try {

        const user = await User.findById(req.body.userIdFromToken);
        if (!user) {

            return res.send({

                success: false,
                message: "User does not exists !",
            });
        }

        return res.send({
            success: true,
            message: "user details fetched Successfully !",
            data: user,
        })
    } catch (error) {
        console.log("hello")
        return res.send({

            success: false,
            message: error.message,
        })
    }
})

router.get("/get-all-users/:role", authMiddleware, async (req, res) => {
    try {

        const users = await User.find({ role: req.params.role }).sort({
            createdAt : -1 ,
        });
        return res.send({
            success: true,
            message: "Users Fetched Successfully",
            data: users,
        })
    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
        })
    }
})

router.get("/get-user-by-id/:id", authMiddleware, async (req, res) => {
    try {

        const user = await User.findById(req.params.id);
        if (!user) {
            return res.send({
                success: false,
                message: "User not exists !",
            })
        }
        return res.send({
            success: true,
            message: "User Fetched Successfully",
            data: user,
        })
    } catch (error) {
        return res.send({
            success: false,
            message: "User Does not exist",
        })
    }
})

module.exports = router;
