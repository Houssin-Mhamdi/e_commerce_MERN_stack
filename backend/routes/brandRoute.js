const express = require("express");
const {
  getAllBrands,
  getSingleBrand,
  createBrand,
  updateBrand,
  deleteBrand,
} = require("../service/brandService");
const {
  getBrandValidator,
  createBrandValidator,
  UpdateBrandValidator,
  deleteBrandValidator,
} = require("../utlis/validators/brandValidators");
const router = express.Router();

router
  .route("/")
  .get(getAllBrands)
  .post(createBrandValidator, createBrand);
router
  .route("/:id")
  .get(getBrandValidator, getSingleBrand)
  .put(UpdateBrandValidator, updateBrand)
  .delete(deleteBrandValidator, deleteBrand);

module.exports = router;
