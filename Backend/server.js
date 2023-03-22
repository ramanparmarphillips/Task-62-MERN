const express = require('express');
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 5000;
const colors = require('colors');
const { errorHandler } = require('./Middleware/errorMiddleware')
const connectDB = require('./Config/db')

connectDB();
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use('/api/goals', require('./Routes/goalRoutes'))
app.use('/api/users', require('./Routes/userRoutes'))

app.use(errorHandler)










app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});