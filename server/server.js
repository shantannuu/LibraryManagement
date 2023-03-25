const express = require('express');
const app = express();
app.use(express.json())
require("dotenv").config();
const dbConfig = require("./config/dbConfig");


const port = process.env.PORT || 5000;

const userRoute = require("./routes/usersRoute")
const bookRoute = require("./routes/booksRoute")
const issueRoute = require("./routes/issueRoute")
const reportRoute = require("./routes/reportsRoute")

app.use("/api/users",userRoute);

app.use("/api/books",bookRoute);

app.use("/api/issues",issueRoute);

app.use("/api/reports",reportRoute);

const path = require("path");
__dirname = path.resolve();

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"/client/build")));

    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"client","build","index.html"))
    })
}

app.listen(port , () => console.log(`Server is running on ${port}`));

