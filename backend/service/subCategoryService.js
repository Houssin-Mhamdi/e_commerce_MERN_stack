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

  let filterdObject = {};
  if (req.params.categoryId)
    filterdObject = { category: req.params.categoryId };

  const subCategory = await subcategory.find(filterdObject).skip(skip).limit(limit);
  // .populate({ path: "category", select: "name" });
  res
    .status(200)
    .json({ result: subCategory.length, page, subcategories: subCategory });
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

exports.updateSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;

  const subCategory = await subcategory.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name), category },
    { new: true }
  );

  if (!subCategory) {
    //res.status(404).json({msg:`No category found for this id ${id}`})
    return next(new ApiError(`No subcategory found for this id ${id}`, 404));
  }
  res.status(200).json({ data: subCategory });
});

// @desc Delete subcategory
// @route delete /api/v1/subcategory
// @access private

exports.deleteSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const subCategory = await subcategory.findByIdAndDelete(id);

  if (!subCategory) {
    //res.status(404).json({msg:`No category found for this id ${id}`})
    return next(new ApiError(`No category found for this id ${id}`, 404));
  }
  res.status(204).send({ msg: `subCategory deleted successfully` });
});
