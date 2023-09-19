const express = require('express')
const {getAllCategory,createCategory,getSingleCategory,updateCategory,deleteCategory} = require("../service/categoryService")
const {getCategoryValidator,createCategoryValidator,UpdateCategoryValidator,deleteCategoryValidator} = require("../utlis/validators/categoryValidators")
const router = express.Router()

router.route('/').get(getAllCategory).post(createCategoryValidator,createCategory)
router.route("/:id")
      .get(getCategoryValidator,getSingleCategory)
      .put(UpdateCategoryValidator,updateCategory)
      .delete(deleteCategoryValidator,deleteCategory)

module.exports = router