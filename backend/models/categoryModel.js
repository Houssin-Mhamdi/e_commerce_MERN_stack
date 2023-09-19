const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type:String,
        required: [true, 'Category required'],
        unique: [true, 'Category most be unique'],
        minlength:[3,"Too short category name"],
        maxlength:[32, 'Too long category name']

    },

    slug : {
        type:String,
        lowercase:true,
    },
    image : {
        type:String
    }
},{
    timestamps:true,
})

const CategoryModel = mongoose.model("Category", categorySchema)

module.exports = CategoryModel
