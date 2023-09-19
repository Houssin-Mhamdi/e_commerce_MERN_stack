const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
require("dotenv").config()

const ApiError = require("./utlis/apiError")
const dbConnection = require('./config/database')
const categoryRoute = require("./routes/categoryRoute")


dbConnection()
const app = express()
app.use(express.json())
app.use(cors())

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
    console.log(`mode ${process.env.NODE_ENV}`)
}





app.use('/api/v1/categories', categoryRoute)

app.all("*",(req, res, next) =>{
   //const err = new Error(`Can't find this route ${req.originalUrl}`)
    next(new ApiError(`Can't find this route ${req.originalUrl}`,400))
})

//Global error handler middleware
app.use((err,req,res,next)=>{
    
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'

res.status(err.statusCode).json({
    status : err.status,
    error : err,
    message: err.message,
    stack : err.stack
})
})


const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`Example app listening on port ${PORT}`)
})

