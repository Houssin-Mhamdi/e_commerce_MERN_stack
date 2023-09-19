const { check } = require("express-validator");
const validatorMiddleware = require("../../middelwares/validatorMiddelware");

exports.getSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Subcategory id"),
  validatorMiddleware,
];

exports.createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("SubCategory requires a name")
    .isLength({ min: 2 })
    .withMessage("Too short Subcategory name")
    .isLength({ max: 32 })
    .withMessage("Too long Subcategory name"),
    check("category").notEmpty().withMessage("subCategory must be belong to category").isMongoId().withMessage("Invalid Category category format"),
  validatorMiddleware,
];

// exports.UpdateSubCategoryValidator = [
//   check("id").isMongoId().withMessage("Invalid Subcategory id"),
//   validatorMiddleware,
// ];

// exports.deleteSubCategoryValidator = [
//   check("id").isMongoId().withMessage("Invalid Subcategory id"),
//   validatorMiddleware,
// ];
