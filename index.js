//index.js file
require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bookController = require('./controller/books_Controller.js')
const cors = require('cors')

mongoose.connect(process.env.MONGO_URI, { useNewURLParser: true, useUnifiedTopology: true })

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error', err)
})

app.get('/', (req, res) => {
    res.send("Hello World")
})
app.use(express.json());
app.use('/books', bookController)
app.use(cors())

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})


