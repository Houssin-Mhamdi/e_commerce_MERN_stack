const subcategory = require("../models/subCategoryModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const ApiError = require("../utlis/apiError");
const ApiFeatures = require("../utlis/apiFeatures");
const factory = require("../service/handlersFactory");

// @desc Create a new category
// @route POST /api/v1/subcategory
// @access Private

exports.setCategoryIdToBody = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};

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

exports.createdFilterdObj = (req, res, next) => {
  let filterdObject = {};
  if (req.params.categoryId)
    filterdObject = { category: req.params.categoryId };
  req.filterObj = filterdObject;
  next();
};

exports.getAllSubCategory = asyncHandler(async (req, res) => {
  const countDocuments = await subcategory.countDocuments();
  const apiFeatures = new ApiFeatures(subcategory.find(), req.query)
    .paginate(countDocuments)
    .filter()
    .search()
    .limitFields()
    .sort();
  // build query
  //execute the query
  // const products = await apiFeatures.mongooseQuery;
  const { mongooseQuery, paginationResult } = apiFeatures;

  const subCategory = await mongooseQuery;

  res.status(200).json({
    result: subCategory.length,
    paginationResult,
    subcategories: subCategory,
  });
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

// @desc update subcategory
// @route put /api/v1/subcategory/:id
// @access private

exports.updateSubCategory = factory.updateOne(subcategory);

// @desc Delete subcategory
// @route delete /api/v1/subcategory
// @access private

exports.deleteSubCategory = factory.deleteOne(subcategory);
