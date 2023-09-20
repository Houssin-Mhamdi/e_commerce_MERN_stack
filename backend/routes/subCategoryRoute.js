const express = require("express");

const {
  createSubCategory,
  getAllSubCategory,
  getSingleSubCategory,
  deleteSubCategory,
  updateSubCategory,
} = require("../service/subCategoryService");
const {
  createSubCategoryValidator,
  getSubCategoryValidator,
  UpdateSubCategoryValidator,
  deleteSubCategoryValidator,
} = require("../utlis/validators/subcategoryValidators");

const router = express.Router({mergeParams: true});


router
  .route("/")
  .get(getAllSubCategory)
  .post(createSubCategoryValidator, createSubCategory);
router
  .route("/:id")
  .get(getSubCategoryValidator, getSingleSubCategory)
  .put(UpdateSubCategoryValidator, updateSubCategory)
  .delete(deleteSubCategoryValidator, deleteSubCategory);
module.exports = router;
