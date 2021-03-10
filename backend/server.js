const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const productRouter = require('./routes/productRouter');
const colors = require('colors');





dotenv.config({path : './config/config.env'});
const PORT = process.env.PORT || 5000
const MODE = process.env.NODE_ENV


const app = express();

connectDB();

app.use(express.json());

app.get('/',(req,res)=> {
    res.status('Api is running....')
})

app.use('/api/products', productRouter);


app.listen(PORT , console.log(`Server running in ${MODE} on port ${PORT}`.yellow.bold));
