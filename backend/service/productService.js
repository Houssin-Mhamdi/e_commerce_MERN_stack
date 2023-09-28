const Product = require("../models/productModel");
const categoryModel = require("../models/categoryModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const ApiError = require("../utlis/apiError");
const ApiFeatures = require("../utlis/apiFeatures");
const factory = require("../service/handlersFactory");

// @desc Find all Product
// @route GET /api/v1/Product
// @access Public

exports.getAllProducts = asyncHandler(async (req, res) => {
  //1)filtering
  // const queryStringObj = { ...req.query };
  // const executedFields = ["page", "sort", "limit", "fields", "keyword"];
  // executedFields.forEach((field) => delete queryStringObj[field]);
  //apply filtering using [gte ,gt , lte,lt]
  // {price: {$gte: 50}, ratingsAverage: {$gte: 4}}
  // { ratingsAverage: {gte: '4'}, price: {gte: '50' } }

  // let queryStr = JSON.stringify(queryStringObj);
  // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

  //2)pagination
  // const page = req.query.page * 1 || 1;
  // const limit = req.query.limit * 1 || 5;
  // const skip = (page - 1) * limit;
  const countDocuments = await Product.countDocuments();
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .paginate(countDocuments)
    .filter()
    .search("Product")
    .limitFields()
    .sort();
  // build query
  //execute the query
  // const products = await apiFeatures.mongooseQuery;
  const { mongooseQuery, paginationResult } = apiFeatures;

  const products = await mongooseQuery;
  res
    .status(200)
    .json({ result: products.length, paginationResult, data: products });

  //3) sorting
  // if (req.query.sort) {
  //   const sortBy = req.query.sort.split(",").join(" ");
  //   console.log(sortBy);
  //   mongooseQuery = mongooseQuery.sort(sortBy);
  // } else {
  //   mongooseQuery = mongooseQuery.sort("-createdAt");
  // }

  // //4) field limiting
  // if (req.query.fields) {
  //   const fields = req.query.fields.split(",").join(" ");
  //   mongooseQuery = mongooseQuery.select(fields);
  // } else {
  //   mongooseQuery = mongooseQuery.select("-__v");
  // }

  // // 5) Search
  // if (req.query.keyword) {
  //   const query = {};
  //   const pattern = new RegExp(`\\b${req.query.keyword}`, "i");
  //   query.$or = [
  //     { title: { $regex: pattern } },
  //     { description: { $regex: pattern } },
  //   ];
  //   console.log(pattern)
  //   console.log(query)
  //   mongooseQuery = mongooseQuery.find(query);
  // }
});

// @desc Find Product by id
// @route GET /api/v1/Product/:id
// @access Public

exports.getSingleProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id).populate({
    path: "category",
    select: "name",
  });
  if (!product) {
    //res.status(404).json({msg:`No category found for this id ${id}`})
    return next(new ApiError(`No product found for this id ${id}`, 404));
  }
  res.status(200).json({ data: product });
});

// @desc Create a new product
// @route POST /api/v1/product
// @access Private

exports.createProduct = factory.createOne(Product);

// @desc update product
// @route put /api/v1/product/:id
// @access private

exports.updateProduct = factory.updateOne(Product);
// @desc Delete all product
// @route delete /api/v1/product
// @access private

exports.deleteProduct = factory.deleteOne(Product);
