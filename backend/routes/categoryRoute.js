const express = require('express')
const {getAllCategory,createCategory,getSingleCategory,updateCategory,deleteCategory} = require("../service/categoryService")
const router = express.Router()

router.route('/').get(getAllCategory).post(createCategory)
router.route("/:id").get(getSingleCategory).put(updateCategory).delete(deleteCategory)

module.exports = router