const Brand = require("../models/brandModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const ApiError = require("../utlis/apiError");
const ApiFeatures = require("../utlis/apiFeatures");
const factory = require("../service/handlersFactory");
// @desc Find all brand
// @route GET /api/v1/brands
// @access Public

exports.getAllBrands = asyncHandler(async (req, res) => {

  const countDocuments = await Brand.countDocuments();
  const apiFeatures = new ApiFeatures(Brand.find(), req.query)
    .paginate(countDocuments)
    .filter()
    .search()
    .limitFields()
    .sort();
  // build query
  //execute the query
  // const products = await apiFeatures.mongooseQuery;
  const { mongooseQuery,paginationResult } = apiFeatures;
  
  const brand = await mongooseQuery
  res.status(200).json({ result: brand.length, paginationResult, brand: brand });
});

// @desc Find brand by id
// @route GET /api/v1/brands/:id
// @access Public

exports.getSingleBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await Brand.findById(id);
  if (!brand) {
    //res.status(404).json({msg:`No category found for this id ${id}`})
    return next(new ApiError(`No brand found for this id ${id}`, 404));
  }
  res.status(200).json({ data: brand });
});

// @desc Create a new brand
// @route POST /api/v1/brands
// @access Private

exports.createBrand = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const category = await Brand.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});

// @desc update brand
// @route put /api/v1/brands/:id
// @access private

exports.updateBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const brand = await Brand.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );

  if (!brand) {
    //res.status(404).json({msg:`No category found for this id ${id}`})
    return next(new ApiError(`No brand found for this id ${id}`, 404));
  }
  res.status(200).json({ data: brand });
});

// @desc Delete all brand
// @route delete /api/v1/brands
// @access private

exports.deleteBrand = factory.deleteOne(Brand) 

// exports.deleteBrand = asyncHandler(async (req, res, next) => {
//   const { id } = req.params;

//   const brand = await Brand.findByIdAndDelete(id);

//   if (!brand) {
//     //res.status(404).json({msg:`No category found for this id ${id}`})
//     return next(new ApiError(`No brand found for this id ${id}`, 404));
//   }
//   res.status(204).send({ msg: `brand deleted successfully` });
// });
