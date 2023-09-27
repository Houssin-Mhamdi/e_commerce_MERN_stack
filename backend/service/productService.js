const Product = require("../models/productModel");
const categoryModel = require("../models/categoryModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const ApiError = require("../utlis/apiError");
// @desc Find all Product
// @route GET /api/v1/Product
// @access Public

exports.getAllProducts = asyncHandler(async (req, res) => {
  //1)filtering
  const queryStringObj = { ...req.query };
  const executedFields = ["page", "sort", "limit", "fields", "keyword"];
  executedFields.forEach((field) => delete queryStringObj[field]);
  //apply filtering using [gte ,gt , lte,lt]
  // {price: {$gte: 50}, ratingsAverage: {$gte: 4}}
  // { ratingsAverage: {gte: '4'}, price: {gte: '50' } }

  let queryStr = JSON.stringify(queryStringObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

  //2)pagination
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  // build query
  let mongooseQuery = Product.find(JSON.parse(queryStr))
    .skip(skip)
    .limit(limit)
    .populate({ path: "category", select: "name" });

  //3) sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    console.log(sortBy);
    mongooseQuery = mongooseQuery.sort(sortBy);
  } else {
    mongooseQuery = mongooseQuery.sort("-createdAt");
  }

  //4) field limiting
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    mongooseQuery = mongooseQuery.select(fields);
  } else {
    mongooseQuery = mongooseQuery.select("-__v");
  }

  // 5) Search
  if (req.query.keyword) {
    const query = {};
    const pattern = new RegExp(`\\b${req.query.keyword}`, "i");
    query.$or = [
      { title: { $regex: pattern } },
      { description: { $regex: pattern } },
    ];
    mongooseQuery = mongooseQuery.find(query);
  }

  //execute the query
  const products = await mongooseQuery;
  res.status(200).json({ result: products.length, page, data: products });
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

exports.createProduct = asyncHandler(async (req, res) => {
  req.body.slug = slugify(req.body.title);

  /**first method for checking if the category is existst */
  // const categoryfind = await categoryModel.findById(req.body.category)
  // console.log(categoryfind)
  // if(!categoryfind){
  //   throw new Error("No category found for")
  // }

  const product = await Product.create(req.body);
  res.status(201).json({ data: product });
});

// @desc update product
// @route put /api/v1/product/:id
// @access private

exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (req.body.title) {
    req.body.slug = slugify(req.body.title);
  }

  const product = await Product.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });

  if (!product) {
    //res.status(404).json({msg:`No category found for this id ${id}`})
    return next(new ApiError(`No product found for this id ${id}`, 404));
  }
  res.status(200).json({ data: product });
});

// @desc Delete all product
// @route delete /api/v1/product
// @access private

exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    //res.status(404).json({msg:`No category found for this id ${id}`})
    return next(new ApiError(`No product found for this id ${id}`, 404));
  }
  res.status(204).send({ msg: `product deleted successfully` });
});
