const express = require('express');
const connectMongoDB = require('./connect')
const urlRouter = require('./Routes/url')


const app = express();
const PORT = 8000;

connectMongoDB('mongodb://localhost:27017/short-url').then(()=>console.log("MongoDb Connected"))

app.use(express.urlencoded({ extended: true }));

app.use("/url",urlRouter);


app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})


