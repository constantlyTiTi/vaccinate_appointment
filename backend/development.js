require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection
db.on('error',(error) => console.error(error))
db.once('open',()=> console.log('Connect to database'))
app.use(express.json())

const appRouter = require('./routes/app-router')
app.use('/api/app',appRouter )

app.listen(5001,()=> console.log('Server Started'))
