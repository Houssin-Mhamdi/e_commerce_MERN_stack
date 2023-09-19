const mongoose = require('mongoose')


const dbConnection = () =>{
    mongoose.connect(process.env.DB_URI).then((conn)=>{
        console.log(`Connected successfully mongodb host: ${conn.connection.host}`)
    })
    
    // .catch(()=>{
    //     console.log("Failed to connect")
    //     process.exit(1)
    // })
}
module.exports = dbConnection