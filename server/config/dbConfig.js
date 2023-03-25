const mongoose = require('mongoose')
mongoose.set('strictQuery',false)
mongoose.connect(process.env.MONGO_URI)

const connection = mongoose.connection;

connection.on('Connected',()=>{
    console.log('Database Connection Successfull')
})

connection.on('error',()=>{
    console.log('Database Connection Failed')
})

module.exports = connection;