// Description: This is the main file of the backend. It is the entry point of the application.

//Dependencies
const { errorHandler } = require('./Middleware/errorMiddleware')
const dotenv = require('dotenv').config()
const colors = require('colors');
const connectDB = require('./Config/db')
const express = require('express');

//Express server
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/goals', require('./Routes/goalRoutes'))
app.use('/api/users', require('./Routes/userRoutes'))
app.use(errorHandler)

connectDB();

//Port listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`.yellow.underline.bold);
});