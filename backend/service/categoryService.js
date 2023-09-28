const categoryModel = require("../models/categoryModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const ApiError = require("../utlis/apiError");
const ApiFeatures = require("../utlis/apiFeatures");
const factory = require("../service/handlersFactory");

// @desc Find all category
// @route GET /api/v1/category
// @access Public

exports.getAllCategory = asyncHandler(async (req, res) => {
  const countDocuments = await categoryModel.countDocuments();
  const apiFeatures = new ApiFeatures(categoryModel.find(), req.query)
    .paginate(countDocuments)
    .filter()
    .search()
    .limitFields()
    .sort();
  // build query
  //execute the query
  // const products = await apiFeatures.mongooseQuery;
  const { mongooseQuery, paginationResult } = apiFeatures;

  const category = await mongooseQuery;
  res
    .status(200)
    .json({ result: category.length, paginationResult, categories: category });
});

// @desc Find category by id
// @route GET /api/v1/category/:id
// @access Public

exports.getSingleCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await categoryModel.findById(id);
  if (!category) {
    //res.status(404).json({msg:`No category found for this id ${id}`})
    return next(new ApiError(`No category found for this id ${id}`, 404));
  }
  res.status(200).json({ data: category });
});

// @desc Create a new category
// @route POST /api/v1/category
// @access Private

exports.createCategory = factory.createOne(categoryModel);

// @desc update category
// @route put /api/v1/category/:id
// @access private

exports.updateCategory = factory.updateOne(categoryModel);

// @desc Delete all category
// @route delete /api/v1/category
// @access private

exports.deleteCategory = factory.deleteOne(categoryModel);
