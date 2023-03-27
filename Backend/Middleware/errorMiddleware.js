// Description: Error handling middleware, used to handle errors in the backend and send a response to the frontend
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500
  
    res.status(statusCode)
  
    res.json({
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    })
  }
  
module.exports = {
  errorHandler,
}