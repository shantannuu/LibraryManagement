const express = require('express')
const router = express.Router();
const Issue = require('../models/issueModel')
const authMiddleware = require('../middlewares/authMiddleware');
const Book = require('../models/booksModel')


router.post("/issue-new-book", authMiddleware, async (req, res) => {
    try {

        await Book.findOneAndUpdate({ _id: req.body.book },
            { $inc: { availableCopies: -1 } });

        const newIssue = new Issue(req.body);
        await newIssue.save();
        console.log(newIssue)
        return res.send({
            success: true,
            message: "Book issued Successfully !",
            data: newIssue,
        })
    } catch (error) {
        return res.send({

            success: false,
            message: error.message,
        })
    }
})

router.post("/get-issues", authMiddleware, async (req, res) => {
    try {
        delete req.body.userIdFromToken;
        const issues = await Issue.find(req.body).populate("book").populate("user").sort({ issueDate: -1 });

        return res.send({
            success: true,
            message: "Issued fetched Successfully !",
            data: issues,
        })
    } catch (error) {
        return res.send({

            success: false,
            message: error.message,
        })
    }
})

router.post("/return-book", authMiddleware, async (req, res) => {
    try {
        await Book.findOneAndUpdate(
            {
                _id: req.body.book,
            },
            {
                $inc: { availableCopies: 1 },
            }
        );

        await Issue.findOneAndUpdate(
            {
                _id: req.body._id,
            },

            req.body
        );

        return res.send({
            success: true,
            message: "Book returned Successfully !",
        })
    } catch (error) {
        return res.send({

            success: false,
            message: error.message,
        })
    }
})

router.post("/delete-issue", authMiddleware, async (req, res) => {
    try {

        await Issue.findOneAndDelete({
            _id: req.body._id,
        }
            , req.body);

        return res.send({
            success: true,
            message: "Issued deleted Successfully !",
        })
    } catch (error) {
        return res.send({

            success: false,
            message: error.message,
        })
    }
})

router.post("/edit-issue", authMiddleware, async (req, res) => {
    try {

        await Issue.findOneAndUpdate({
            _id: req.body._id,
        }, req.body);

        return res.send({
            success: true,
            message: "Issued Updated Successfully !",
        })
    } catch (error) {
        return res.send({

            success: false,
            message: error.message,
        })
    }
})

module.exports = router;