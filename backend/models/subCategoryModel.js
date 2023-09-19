const mongoose = require('mongoose')

const subCategorySchema = new mongoose.Schema({
    name: {
        type:String,
        trim:true,
        unique:[true,"SubCategory must be unique"],
        minlength:[2,"Too short subCategory name"],
        maxlength:[30 , "Too long subCategory name"],
    },
    slug: {
        type: String,
        lowercase: true,
    },
    category:{
        type:mongoose.Schema.ObjectId,
        ref:"Category",
        required:[true,"SubCategory must be belongs to parent category"],

    }
},{timestamps: true})

const SubCategory = mongoose.model("SubCategory", subCategorySchema)
module.exports = SubCategory
