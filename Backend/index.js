const express = require('express');
const connectToDb = require('./ConnectToDb/connectToDb');
const { userRouter } = require('./Routes/userRouter');
const ledgeRouter = require('./Routes/ledgeRouter');
const app = express();
require('dotenv').config();

app.use(express.json());
app.use('/user', userRouter)
app.use('/ledge', ledgeRouter);
app.listen(process.env.PORT, async () => {
    try {
        await connectToDb();
        console.log("Connected to Database")
        console.log(`Server is running at ${process.env.PORT}`)
    }
    catch (error) {
        console.log(error)
    }
   
})