const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URI)

const connection = mongoose.connection;

connection.on('connected', () => {
    console.log('Database Connection Successfull')
})

connection.on('error', (err) => {
    console.log('Database Connection Failed')
})

module.exports = connection;