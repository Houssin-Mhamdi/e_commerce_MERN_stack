const categoryModel = require("../models/categoryModel");
const factory = require("../service/handlersFactory");

// @desc Find all category
// @route GET /api/v1/category
// @access Public

exports.getAllCategory = factory.getAll(categoryModel)

// @desc Find category by id
// @route GET /api/v1/category/:id
// @access Public

exports.getSingleCategory = factory.getOne(categoryModel)

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
