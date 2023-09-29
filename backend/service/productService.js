const Product = require("../models/productModel");
const factory = require("../service/handlersFactory");

// @desc Find all Product
// @route GET /api/v1/Product
// @access Public

exports.getAllProducts = factory.getAll(Product,"Product")

// @desc Find Product by id
// @route GET /api/v1/Product/:id
// @access Public

exports.getSingleProduct = factory.getOne(Product)
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
