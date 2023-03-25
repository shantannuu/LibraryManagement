const express = require('express')
const router = express.Router();
const Book = require('../models/booksModel')
const authMiddleware = require('../middlewares/authMiddleware');

router.post("/add-book", authMiddleware ,async (req, res) => {
    try {
        req.body.title = (req.body.title).toLowerCase()
        req.body.description = (req.body.description).toLowerCase()
        req.body.category = (req.body.category).toLowerCase()
        const newBook = new Book(req.body);
        await newBook.save();
        
        return res.send({
            success: true,
            message: "Book added Successfully !"
        })
    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
        })
    }
})

router.put("/update-book/:id", authMiddleware ,async (req, res) => {
    try {
        await Book.findByIdAndUpdate(req.params.id,req.body);
        return res.send({
            success: true,
            message: "Book Updated Successfully !"
        })
    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
        })
    }
})

router.delete("/delete-book/:id", authMiddleware ,async (req, res) => {
    try {
        
        await Book.findByIdAndDelete(req.params.id);
        return res.send({
            success: true,
            message: "Book Deleted Successfully !"
        })
    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
        })
    }
})

router.get("/get-all-books", authMiddleware ,async (req, res) => {
    try {
        
        const books = await Book.find().sort({createdAt:-1});
        return res.send({
            success: true,
            data:books,
        })
    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
        })
    }
})

router.get("/get-book-by-id/:id", authMiddleware ,async (req, res) => {
    try {
        
        const book = await Book.findById(req.params.id);
        return res.send({
            success: true,
            data : book
        })
    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
        })
    }
})

router.get("/search-book/:key", authMiddleware ,async (req, res) => {
    try {
        const book = await Book.find({
            "$or" : [
                {title : {$regex : req.params.key }},
                {description : {$regex : req.params.key }},
                {category : {$regex : req.params.key }},
                {author : {$regex : req.params.key }}
            ]
        });
        return res.send({
            success: true,
            data : book
        })
    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
        })
    }
})

module.exports = router;