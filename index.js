const bodyParser = require('body-parser');
const express = require('express');
const dbConnect = require('./config/dbConnect');
const {notFound, errorHandler} = require("./middlewares/errorhandler")
const app = express();
const dotenv = require('dotenv').config();
const PORT = process.env.port || 4000;
const authRouter = require('./routes/authRoute')
dbConnect();
const multer = require("multer");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(multer().any());
app.use('/api/user', authRouter)


app.use(notFound);
app.use(errorHandler)


app.listen(PORT, () => {
    console.log(`server is running at PORT ${PORT}`);
});