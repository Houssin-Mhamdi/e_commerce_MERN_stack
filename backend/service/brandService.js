const Brand = require("../models/brandModel");
const factory = require("../service/handlersFactory");
// @desc Find all brand
// @route GET /api/v1/brands
// @access Public

exports.getAllBrands = factory.getAll(Brand)
// @desc Find brand by id
// @route GET /api/v1/brands/:id
// @access Public

exports.getSingleBrand = factory.getOne(Brand)

// @desc Create a new brand
// @route POST /api/v1/brands
// @access Private

exports.createBrand = factory.createOne(Brand);

// @desc update brand
// @route put /api/v1/brands/:id
// @access private

exports.updateBrand = factory.updateOne(Brand);
// @desc Delete all brand
// @route delete /api/v1/brands
// @access private

exports.deleteBrand = factory.deleteOne(Brand);

