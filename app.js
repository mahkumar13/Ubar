const dotenv = require('dotenv')
dotenv.config()
const express = require('express');
const cors = require('cors');
const app = express();

const connectToDB = require('./Database/db')
const userRoutes = require("./routes/user.routs")
const captainRoutes = require("./routes/captain.routes");
const cookieParser = require('cookie-parser')
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
connectToDB();
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use('/users', userRoutes)
app.use("/captain", captainRoutes);


module.exports = app;