const Product = require("../models/productModel");
const categoryModel = require("../models/categoryModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const ApiError = require("../utlis/apiError");
// @desc Find all Product
// @route GET /api/v1/Product
// @access Public

exports.getAllProducts = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const products = await Product.find({})
    .skip(skip)
    .limit(limit)
    .populate({ path: "category", select: "name" });
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
  if(req.body.title){
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
