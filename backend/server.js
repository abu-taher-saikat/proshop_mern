const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const colors = require('colors');
const {notFound, errorHandler} = require('./middleware/errorMiddleware');

const productRouter = require('./routes/productRouter');
const userRouter = require('./routes/userRouter');
const orderRouter = require('./routes/orderRouter');


const app = express();


dotenv.config({path : './backend/config/.env'});

const PORT = process.env.PORT || 5000
const MODE = process.env.NODE_ENV



connectDB();

app.use(express.json());

app.get('/',(req,res)=> {
    res.status('Api is running....')
})

app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);


// Error handler middlewares . 
app.use(notFound);
app.use(errorHandler);



app.listen(PORT , console.log(`Server running in ${MODE} on port ${PORT}`.yellow.bold));
