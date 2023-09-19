const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {type:String,required:true,minlength:3,maxlength:100},
    email : {type:String,required:true,minlength:3,maxlength:200,unique:true},
    password : {type:String,required:true,minlength:6,maxlength:2400}
})

const User = mongoose.model("User",userSchema)
exports.User = User;
