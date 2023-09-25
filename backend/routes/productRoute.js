const express = require("express");
const {
  getAllProducts,
  createProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../service/productService");
const {
  getProductValidator,
  createProductValidator,
  UpdateProductValidator,
  deleteProductValidator,
} = require("../utlis/validators/productValidators");

const router = express.Router();

router
  .route("/")
  .get(getAllProducts)
  .post(createProductValidator, createProduct);
router
  .route("/:id")
  .get(getProductValidator, getSingleProduct)
  .put(UpdateProductValidator, updateProduct)
  .delete(deleteProductValidator, deleteProduct);

module.exports = router;
