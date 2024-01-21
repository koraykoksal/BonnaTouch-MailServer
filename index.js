"use strict"


const express = require('express')
const app = express()
const cors = require('cors');

//? .env
require('dotenv').config()

//? async errors
require('express-async-errors')

// Accept Json
app.use(express.json())

app.use(cors({
    origin: 'http://localhost:8000'
}));


//! Route
app.all('/', (req, res) => {

    res.send({
        error: false,
        result: "Welcome to Bonna Touch Mail Server"
    })
})

//! /api ifadesinden sonra /routes/mail içerisindeki işlemi çalıştırır
app.use('/api', require('./src/routes/mail'))



//* ERROR HANDLER
app.use(require('./src/middlewares/errorHandler'))


const PORT = process.env.PORT || 8000
app.listen(PORT, () => console.log('server running'))



