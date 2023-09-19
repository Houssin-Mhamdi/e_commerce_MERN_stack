const express = require("express");
const router = express.Router();

const { createSubCategory ,getAllSubCategory,getSingleSubCategory} = require("../service/subCategoryService");
const {
  createSubCategoryValidator,getSubCategoryValidator
} = require("../utlis/validators/subcategoryValidators");

router.route("/").get(getAllSubCategory).post(createSubCategoryValidator, createSubCategory);
router.route("/:id").get(getSubCategoryValidator,getSingleSubCategory)
module.exports = router;
