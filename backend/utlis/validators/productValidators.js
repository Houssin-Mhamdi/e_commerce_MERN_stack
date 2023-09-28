const { check } = require("express-validator");
const validatorMiddleware = require("../../middelwares/validatorMiddelware");
const categoryModel = require("../../models/categoryModel");
const SubCategory = require("../../models/subCategoryModel");
const slugify = require("slugify");

exports.getProductValidator = [
  check("id").isMongoId().withMessage("Invalid category id"),
  validatorMiddleware,
];

exports.createProductValidator = [
  check("title")
    .isLength({ min: 3 })
    .withMessage("Product must be at least 3 chars")
    .notEmpty()
    .withMessage("Product requires")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("description")
    .notEmpty()
    .withMessage("Product Description is required")
    .isLength({ max: 2000 })
    .withMessage("Too long description"),
  check("quantity")
    .notEmpty()
    .withMessage("Product quantity is required")
    .isNumeric()
    .withMessage("Product quantity is must be a number"),
  check("sold")
    .optional()
    .isNumeric()
    .withMessage("Product quantity is must be a number"),
  check("price")
    .notEmpty()
    .withMessage("Product price is required")
    .isNumeric()
    .withMessage("Product quantity is must be a number")
    .isLength({ max: 32 })
    .withMessage("Too lang price"),
  check("priceAfterDiscount")
    .optional()
    .isNumeric()
    .withMessage("Product priceAfterDiscount is must be a number")
    .toFloat()
    .custom((value, { req }) => {
      if (req.body.price <= value) {
        throw new Error("priceAfterDiscount must be lower than price");
      }
      return true;
    }),
  check("colors")
    .optional()
    .isArray()
    .withMessage("colors should be array of strings"),
  check("imageCover").notEmpty().withMessage("Product imageCover is required"),
  check("colors")
    .optional()
    .isArray()
    .withMessage("images should be array of strings"),
  check("category")
    .notEmpty()
    .withMessage("Product most belang to a category")
    .isMongoId()
    .withMessage("invalid Id Format")
    .custom((value) =>
      categoryModel.findById(value).then((category) => {
        if (!category) {
          return Promise.reject(
            new Error(`No category for this ID ${category}`)
          );
        }
      })
    ),
  check("subcategory")
    .optional()
    .isMongoId()
    .withMessage("invalid Id Format")
    .custom((subcategoryID) =>
      SubCategory.find({ _id: { $exists: true, $in: subcategoryID } }).then(
        (result) => {
          if (result.length < 1 || result.length !== subcategoryID.length) {
            return Promise.reject(new Error(`In valid category ID `));
          }
        }
      )
    )
    .custom((sval, { req }) =>
      SubCategory.find({ category: req.body.category }).then(
        (subcategoryId) => {
          let subcategoryIdinDb = [];

          subcategoryId.forEach((subcategory) => {
            subcategoryIdinDb.push(subcategory._id.toString());
          });

          const checker = sval.every((v) => subcategoryIdinDb.includes(v));
          if (!checker) {
            return Promise.reject(
              new Error(`Sub category not belong to category `)
            );
          }
        }
      )
    ),
  check("brand").optional().isMongoId().withMessage("invalid Id Format"),
  check("ratingAverage")
    .optional()
    .isNumeric()
    .withMessage("Product ratingAverage is must be a number")
    .isLength({ min: 1 })
    .withMessage("Rating Must be above or equal to 1.0")
    .isLength({ max: 5 })
    .withMessage("Rating Must be below or equal to 5.0"),
  check("ratingQuantity")
    .optional()
    .isNumeric()
    .withMessage("Product ratingQuantity is must be a number"),

  validatorMiddleware,
];

exports.UpdateProductValidator = [
  check("id").isMongoId().withMessage("Invalid category id"),
  check("category").optional().custom((value) =>
    categoryModel.findById(value).then((category) => {
      if (!category) {
        return Promise.reject(new Error(`No category for this ID ${category}`));
      }
    })
  ),
  check("title")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];

exports.deleteProductValidator = [
  check("id").isMongoId().withMessage("Invalid category id"),
  validatorMiddleware,
];
