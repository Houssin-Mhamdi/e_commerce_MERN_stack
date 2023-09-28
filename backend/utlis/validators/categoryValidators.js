const { check } = require("express-validator");
const validatorMiddleware = require("../../middelwares/validatorMiddelware");
const slugify = require("slugify");


exports.getCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category id"),
  validatorMiddleware,
];

exports.createCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Category requires a name")
    .isLength({ min: 3 })
    .withMessage("Too short category name")
    .isLength({ max: 32 })
    .withMessage("Too long category name"),
  validatorMiddleware,
];

exports.UpdateCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category id"),
  check("name").custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  validatorMiddleware,
];

exports.deleteCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category id"),
  validatorMiddleware,
];
