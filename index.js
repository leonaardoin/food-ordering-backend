const dotenv = require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require("mongoose")
const authController = require('./controllers/authController')
const productController = require('./controllers/productController')
const uploadController = require('./controllers/uploadController')
const app = express()
const PORT = 3000

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo');
});

app.use(express.urlencoded({extended:false}));

// connect our db
// mongoose.set('strictQuery', false)
// mongoose.connect(process.env.MONGO_URL, () => console.log('DB is successfully connected'))

// routes & middlewares
// those two middlewares make req.body accessible, otherwise it would be undefined
app.use(cors())
app.use(express.json())
app.use('/images', express.static('public/images'))
app.use('/auth', authController)
app.use('/product', productController)
app.use('/upload', uploadController)

// start our server
app.listen(process.env.PORT, () => console.log('Server has been started'))

// we are going to get a cors ERROR!!, but cors() removes that's error