const subcategory = require("../models/subCategoryModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const ApiError = require("../utlis/apiError");

// @desc Create a new category
// @route POST /api/v1/subcategory
// @access Private

exports.createSubCategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body;
  const subCategory = await subcategory.create({
    name,
    slug: slugify(name),
    category,
  });
  res.status(201).json({ data: subCategory });
});

// @desc Find all subcategory
// @route GET /api/v1/subcategory
// @access Public

exports.getAllSubCategory = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const subCategory = await subcategory.find({}).skip(skip).limit(limit);
  res.status(200).json({ result: subCategory.length, page, subcategories: subCategory });
});

// @desc Find subcategory by id
// @route GET /api/v1/subcategory/:id
// @access Public

exports.getSingleSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await subcategory.findById(id);
  if (!subCategory) {
    //res.status(404).json({msg:`No category found for this id ${id}`})
    return next(new ApiError(`No category found for this id ${id}`, 404));
  }
  res.status(200).json({ data: subCategory });
});
