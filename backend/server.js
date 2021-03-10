import dotenv from 'dotenv';
import express from 'express'
import products from './data/products.js';
import connectDB from './config/db.js';
import colors from 'colors';


dotenv.config({path : './config/config.env'});
const PORT = process.env.PORT || 5000
const MODE = process.env.NODE_ENV


const app = express();

connectDB();

app.use(express.json());

app.get('/',(req,res)=> {
    res.status('Api is running....')
})


app.get('/api/products',(req,res)=>{
    res.json(products);
})


app.get('/api/products/:id',(req,res)=>{
    const product = products.find(p => p._id === req.params.id)
    res.json(product);
})

app.listen(PORT , console.log(`Server running in ${MODE} on port ${PORT}`.yellow.bold));
