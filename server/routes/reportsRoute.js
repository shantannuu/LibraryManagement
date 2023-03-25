const express = require('express')
const router = express.Router();
const Book = require('../models/booksModel')
const Issue = require('../models/issueModel')
const User = require('../models/usersModel')
const authMiddleware = require('../middlewares/authMiddleware');

router.get("/get-reports", authMiddleware ,async (req, res) => {
    try {
        
        const books = await Book.find();
        const BooksCount = books.length;
        const totalBooksCopiesCount = books.reduce((acc,book)=>{
            return acc + book.totalCopies;
        },0)
        const availableBooksCopiesCount = books.reduce((acc,book)=>{
            return acc + book.availableCopies;
        },0)
        const issuesBooksCopiesCount = totalBooksCopiesCount - availableBooksCopiesCount;
        

        const users = await User.find()
        const usersCount = users.length;
        const patronCount = users.filter((user)=> user.role === "patron").length;
        const librariansCount = users.filter(
            (user) => user.role === "librarian"
        ).length
        const adminsCount = users.filter((user)=> user.role === "admin").length
    
            
        const issues = await Issue.find();
        const issuesCount = issues.length;
        const returnedIssuesCount = issues.filter(
            (issue)=> issue.status === "Returned"
        ).length;

        const pendingIssuesCount = issuesCount - returnedIssuesCount;

        const rentCollected = issues.reduce((acc,issue)=>{
            if(issue.returnedDate){
                return acc + issue.rent;
            }else{
                return acc
            }
        },0)

        const fineCollected = issues.reduce((acc,issue)=>{
            if(issue.returnedDate){
                return acc + issue.fine;
            }else{
                return acc
            }
        },0)

        const totalCollected = rentCollected + fineCollected

        const rentPending = issues.reduce((acc,issue)=>{
            if(issue.returnedDate === null){
                return acc + issue.rent;
            }else{
                return acc
            }
        },0)

        return res.send({
            success: true,
            data : {
            books :{
                BooksCount,
                totalBooksCopiesCount,
                availableBooksCopiesCount,
                issuesBooksCopiesCount
            },
            users :{
                usersCount,
                patronCount,
                librariansCount,
                adminsCount
            },
            issues:{
                issuesCount,
                returnedIssuesCount,
                pendingIssuesCount
            },
            revenue:{
                rentCollected,
                fineCollected,
                totalCollected,
                rentPending
            },
        }
        })
    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
        })
    }
})

module.exports = router;