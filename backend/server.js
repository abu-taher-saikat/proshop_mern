const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');
const colors = require('colors');
const morgan = require('morgan');
const {notFound, errorHandler} = require('./middleware/errorMiddleware');

const productRouter = require('./routes/productRouter');
const userRouter = require('./routes/userRouter');
const orderRouter = require('./routes/orderRouter');
const uploadRoutes = require('./routes/uploadRoutes');


const app = express();

app.use(morgan('dev'));

// if(process.env.NODE_ENV === 'development'){
//     app.use(morgan('dev'))
// }


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
app.use('/api/upload', uploadRoutes);


app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID)
})

// const __dirname = path.resolve(); // it's for module import type. 
app.use('/uploads', express.static(path.join(__dirname , '/images')))

// Error handler middlewares . 
app.use(notFound);
app.use(errorHandler);



app.listen(PORT , console.log(`Server running in ${MODE} on port ${PORT}`.yellow.bold));
