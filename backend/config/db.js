const mongoose = require('mongoose');

const connectDB =  async ()=>{

    try{
        const conn = await mongoose.connect("mongodb+srv://saikat:saikat1095@cluster0.htwdq.mongodb.net/proShop",{
            //must add in order to not get any error masseges:
            useUnifiedTopology:true,
            useNewUrlParser: true,
            useCreateIndex: true
        })
        console.log(`mongo database is connected!!! ${conn.connection.host} `.cyan.underline)
    }catch(error){
        console.error(`Error: ${error} `.red.underline.bold);
        process.exit(1) //passing 1 - will exit the proccess with error
    }

}

module.exports = connectDB;